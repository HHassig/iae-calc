require "test_helper"

class SurveyTest < ActiveSupport::TestCase
  setup do
    @user = User.create!(email: "surgeon@example.com", password: "password123")
  end

  test "grades are computed on save and recomputed when answers change" do
    survey = @user.surveys.create!(death: false, intervention: true)
    assert_equal "1", survey.eauiaic
    assert_equal "II", survey.iae_severity
    assert_equal "2", survey.eaes

    survey.update!(death: true)
    assert_equal "5B", survey.eauiaic
    assert_equal "VI", survey.iae_severity
    assert_equal "V", survey.class_intra
    assert_equal "5", survey.eaes
  end

  test "client-supplied grades are overwritten by the server" do
    survey = @user.surveys.new(eauiaic: "5B", eaes: "5")
    survey.save!
    assert_equal "0", survey.eauiaic
    assert_equal "1", survey.eaes
  end

  test "patient_id accepts alphanumeric identifiers" do
    survey = @user.surveys.create!(patient_id: "MRN-0012")
    assert_equal "MRN-0012", survey.reload.patient_id
  end
end
