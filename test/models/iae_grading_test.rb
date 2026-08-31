require "test_helper"

class IaeGradingTest < ActiveSupport::TestCase
  ALL_NO = IaeGrading::QUESTIONS.index_with { false }

  def grade(yes = [])
    IaeGrading.grade(ALL_NO.merge(Array(yes).index_with { true }))
  end

  def assert_grades(yes, eauiaic:, severity:, satava:, class_intra:, eaes:, suffix: "")
    g = grade(yes)
    assert_equal eauiaic, g[:eauiaic], "EAUiaiC for #{yes.inspect}"
    assert_equal severity, g[:iae_severity], "iAE Severity for #{yes.inspect}"
    assert_equal satava, g[:modified_satava], "Modified Satava for #{yes.inspect}"
    assert_equal class_intra, g[:class_intra], "ClassIntra for #{yes.inspect}"
    assert_equal eaes, g[:eaes], "EAES for #{yes.inspect}"
    assert_equal suffix, g[:suffix_t], "suffix T for #{yes.inspect}"
  end

  # -- anchors from the published classifications --------------------------

  test "all-No answers grade to the floor of every scale" do
    assert_grades [], eauiaic: "0", severity: "I", satava: "I", class_intra: "0", eaes: "1"
  end

  test "intraoperative death tops every scale (ClassIntra V per BMJ 2020)" do
    assert_grades [ :death ], eauiaic: "5B", severity: "VI", satava: "III", class_intra: "V", eaes: "5"
    assert_grades IaeGrading::QUESTIONS, eauiaic: "5B", severity: "VI", satava: "III", class_intra: "V", eaes: "5", suffix: " T"
  end

  test "single-Yes answers" do
    assert_grades [ :life_threatening ],       eauiaic: "3",  severity: "I",   satava: "III", class_intra: "IV",  eaes: "4"
    assert_grades [ :sig_consequences ],       eauiaic: "2",  severity: "I",   satava: "III", class_intra: "III", eaes: "4"
    assert_grades [ :incorrect_with_consent ], eauiaic: "5A", severity: "IV",  satava: "I",   class_intra: "II",  eaes: "1"
    assert_grades [ :intraoperative_course_change ], eauiaic: "0", severity: "I", satava: "I", class_intra: "I", eaes: "3"
    assert_grades [ :unanticipated_conversion ], eauiaic: "2", severity: "IV", satava: "II", class_intra: "III", eaes: "1"
    assert_grades [ :aborted_incomplete ],     eauiaic: "4B", severity: "IV",  satava: "II",  class_intra: "II",  eaes: "1"
    assert_grades [ :unplanned_stoma ],        eauiaic: "4B", severity: "IV",  satava: "II",  class_intra: "III", eaes: "1"
    assert_grades [ :unplanned_removal ],      eauiaic: "4A", severity: "III", satava: "II",  class_intra: "III", eaes: "1"
    assert_grades [ :intervention ],           eauiaic: "1",  severity: "II",  satava: "I",   class_intra: "II",  eaes: "2"
    assert_grades [ :post_op_care_change ],    eauiaic: "0",  severity: "I",   satava: "I",   class_intra: "0",   eaes: "3"
    assert_grades [ :intensive_care ],         eauiaic: "0",  severity: "I",   satava: "I",   class_intra: "IV",  eaes: "4"
    assert_grades [ :re_operation ],           eauiaic: "2",  severity: "V",   satava: "III", class_intra: "II",  eaes: "4"
    assert_grades [ :blood_loss_high ],        eauiaic: "0",  severity: "I",   satava: "II",  class_intra: "I",   eaes: "1"
    assert_grades [ :more_blood_units ],       eauiaic: "1",  severity: "I",   satava: "I",   class_intra: "II",  eaes: "1", suffix: " T"
  end

  test "the most severe applicable grade wins when answers overlap" do
    # regressions from the old client/server split, where tie-breaks disagreed
    assert_grades [ :unplanned_stoma, :unplanned_removal ], eauiaic: "4B", severity: "IV", satava: "II", class_intra: "III", eaes: "1"
    assert_grades [ :re_operation, :blood_loss_high ], eauiaic: "2", severity: "V", satava: "III", class_intra: "II", eaes: "4"
    assert_grades [ :intervention, :life_threatening ], eauiaic: "3", severity: "II", satava: "III", class_intra: "IV", eaes: "4"
  end

  test "nil answers are treated as No" do
    g = IaeGrading.grade({})
    assert_equal "0", g[:eauiaic]
    assert_equal "1", g[:eaes]
  end

  # -- exhaustive invariants ----------------------------------------------

  test "every one of the 32768 answer combinations yields a valid grade on every scale" do
    each_combination do |answers|
      g = IaeGrading.grade(answers)
      IaeGrading::SCALES.each do |scale, meta|
        assert_includes meta[:order], g[scale], "invalid #{scale} for #{answers.select { |_, v| v }.keys.inspect}"
      end
      assert_includes [ "", " T" ], g[:suffix_t]
    end
  end

  test "flipping any answer from No to Yes never lowers any grade" do
    sample_combinations(2000) do |answers|
      base = IaeGrading.grade(answers)
      IaeGrading::QUESTIONS.each do |question|
        next if answers[question]

        flipped = IaeGrading.grade(answers.merge(question => true))
        IaeGrading::SCALES.each do |scale, meta|
          assert meta[:order].index(flipped[scale]) >= meta[:order].index(base[scale]),
                 "#{scale} dropped from #{base[scale]} to #{flipped[scale]} when #{question} flipped to Yes on #{answers.select { |_, v| v }.keys.inspect}"
        end
      end
    end
  end

  private

  def each_combination
    (0...(1 << 15)).each do |bits|
      yield IaeGrading::QUESTIONS.each_with_index.to_h { |q, i| [ q, bits[i] == 1 ] }
    end
  end

  def sample_combinations(count)
    rng = Random.new(20260831)
    count.times do
      bits = rng.rand(1 << 15)
      yield IaeGrading::QUESTIONS.each_with_index.to_h { |q, i| [ q, bits[i] == 1 ] }
    end
  end
end
