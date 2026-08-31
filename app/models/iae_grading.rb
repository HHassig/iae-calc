# frozen_string_literal: true

# Single source of truth for intraoperative adverse event (iAE) grading.
#
# Maps the calculator's 15 yes/no answers onto the five published grading
# systems. Rules are evaluated MOST SEVERE FIRST and the first match wins,
# so when several answers apply the event receives the highest applicable
# grade — the convention used by all five source publications.
#
# Sources:
#   EAUiaiC          Biyani et al.     Eur Urol 2020;77:601-10      (grades 0-5B)
#   iAE Severity     Kaafarani et al.  J Am Coll Surg 2014;218:1120 (classes I-VI, suffix T)
#   Modified Satava  Kazaryan et al.   ISRN Surg 2013:625093        (grades I-III)
#   ClassIntra       Dell-Kuster et al. BMJ 2020;370:m2917          (grades 0-V)
#   EAES             Francis et al.    Surg Endosc 2018;32:3822-9   (grades 1-5)
module IaeGrading
  QUESTIONS = %i[
    death life_threatening sig_consequences incorrect_with_consent
    intraoperative_course_change unanticipated_conversion aborted_incomplete
    unplanned_stoma unplanned_removal intervention post_op_care_change
    intensive_care re_operation blood_loss_high more_blood_units
  ].freeze

  # Question copy shown by the calculator (home) and entry (show) pages,
  # kept next to the rules so the form and the grading can't drift apart.
  SECTIONS = [
    { title: "Patient",
      questions: [
        { key: :death,
          prompt: "Was the iAE associated with death of the patient?" },
        { key: :life_threatening,
          prompt: "Was the iAE immediately life-threatening?" },
        { key: :sig_consequences,
          prompt: "Were there significant consequences to the patient as a result of the iAE?",
          note: "Some examples of iAEs with significant consequences includes injury to or unplanned removal of an otherwise healthy major organ (e.g. unplanned pulmonectomy, nephrectomy) and events that are exceedingly challenging to manage in a controlled manner without potential for long-term patient consequences (e.g. increased risk of postoperative multiorgan failure with major blood transfusion)." },
        { key: :incorrect_with_consent,
          prompt: "Was the incorrect site, side, or surgical approach used without consent?" }
      ] },
    { title: "Procedure",
      questions: [
        { key: :intraoperative_course_change,
          prompt: "Were there any changes in the ideal intraoperative course related to iAE?",
          note: "Changes in course include minor incidents such as unintended cauterization, equipment malfunction, unanticipated anesthesiologic challenges, or procedural delays regardless of consequence or management." },
        { key: :unanticipated_conversion,
          prompt: "Unanticipated conversion of approach or significant change to operative steps of the originally planned procedure due to iAE?" },
        { key: :aborted_incomplete,
          prompt: "Was planned procedure aborted or incomplete due to iAE?" },
        { key: :unplanned_stoma,
          prompt: "Unplanned stoma as a result of iAE?" },
        { key: :unplanned_removal,
          prompt: "Unplanned tissue or organ removal as a result of iAE?" }
      ] },
    { title: "iAE Management",
      questions: [
        { key: :intervention,
          prompt: "Was any surgical repair, medical treatment, or other intervention required?",
          note: "Standard procedural management (e.g. cauterization, use of prothombotic material, small vessel ligation) does not qualify as \"repair.\"" },
        { key: :post_op_care_change,
          prompt: "Was there a change in post-operative care due to the iAE?" },
        { key: :intensive_care,
          prompt: "Did the iAE or its management necessitate intensive care admission?" },
        { key: :re_operation,
          prompt: "Was the intraoperative injury missed, necessitating re-operation within 7 days of index procedure?" }
      ] },
    { title: "Bleeding",
      questions: [
        { key: :blood_loss_high,
          prompt: "Was blood loss appreciably over normal range for procedure?",
          note: "Per Kazaryan, et al. (2013): \"A normal range of blood loss for each particular procedure is subjective in a certain degree, but one can quantify it in regard to different procedures based both on contemporary scientific literature and values typical for own institution\"" },
        { key: :more_blood_units,
          prompt: "Were 2 or more units of blood products required to manage iAE?" }
      ] }
  ].freeze

  SCALES = {
    eauiaic:         { label: "EAUiaiC",         range: "0 – 5B",  order: %w[0 1 2 3 4A 4B 5A 5B] },
    iae_severity:    { label: "iAE Severity",    range: "I – VI",  order: %w[I II III IV V VI] },
    modified_satava: { label: "Modified Satava", range: "I – III", order: %w[I II III] },
    class_intra:     { label: "ClassIntra",      range: "0 – V",   order: %w[0 I II III IV V] },
    eaes:            { label: "EAES",            range: "1 – 5",   order: %w[1 2 3 4 5] }
  }.freeze

  module_function

  # answers: hash keyed by QUESTIONS symbols; nil is treated as "No".
  def grade(answers)
    a = QUESTIONS.index_with { |q| !!answers[q] }
    {
      eauiaic: eauiaic(a),
      iae_severity: iae_severity(a),
      suffix_t: a[:more_blood_units] ? " T" : "",
      modified_satava: modified_satava(a),
      class_intra: class_intra(a),
      eaes: eaes(a)
    }
  end

  # Relative severity band for a grade within its scale, used to color the
  # results: none < mild < moderate < high < critical.
  def band(scale, value)
    order = SCALES.fetch(scale)[:order]
    idx = order.index(value.to_s)
    return "none" if idx.nil? || idx.zero?

    ratio = idx.to_f / (order.length - 1)
    if ratio >= 1 then "critical"
    elsif ratio > 0.67 then "high"
    elsif ratio > 0.34 then "moderate"
    else "mild"
    end
  end

  def bands(grades)
    SCALES.keys.index_with { |scale| band(scale, grades[scale]) }
  end

  def eauiaic(a)
    return "5B" if a[:death]                                                    # intraoperative death
    return "5A" if a[:incorrect_with_consent]                                   # wrong site/side/approach without consent
    return "4B" if a[:aborted_incomplete] || a[:unplanned_stoma]                # aborted procedure or unplanned stoma
    return "4A" if a[:unplanned_removal]                                        # unplanned part/full organ removal
    return "3"  if a[:life_threatening]                                         # immediately life-threatening
    return "2"  if a[:unanticipated_conversion] || a[:sig_consequences] || a[:re_operation]
    return "1"  if a[:intervention] || a[:more_blood_units]

    "0"
  end

  def iae_severity(a)
    return "VI"  if a[:death]
    return "V"   if a[:re_operation]                                            # missed injury, re-operation ≤ 7 days
    return "IV"  if a[:unanticipated_conversion] || a[:aborted_incomplete] ||
                    a[:unplanned_stoma] || a[:incorrect_with_consent]           # deviation from planned procedure
    return "III" if a[:unplanned_removal]                                       # organ/tissue resection
    return "II"  if a[:intervention]                                            # injury requiring repair/treatment

    "I"
  end

  def modified_satava(a)
    return "III" if a[:death] || a[:life_threatening] || a[:sig_consequences] || a[:re_operation]
    return "II"  if a[:unanticipated_conversion] || a[:unplanned_stoma] || a[:unplanned_removal] ||
                    a[:blood_loss_high] || a[:aborted_incomplete]

    "I"
  end

  def class_intra(a)
    return "V"   if a[:death]                                                   # per BMJ 2020: intraoperative death is grade V
    return "IV"  if a[:life_threatening] || a[:intensive_care]                  # life-threatening / ICU admission
    return "III" if a[:sig_consequences] || a[:unanticipated_conversion] ||
                    a[:unplanned_stoma] || a[:unplanned_removal]                # potentially life-threatening or permanent disability
    return "II"  if a[:intervention] || a[:aborted_incomplete] || a[:more_blood_units] ||
                    a[:re_operation] || a[:incorrect_with_consent]              # additional minor treatment (incl. transfusion)
    return "I"   if a[:intraoperative_course_change] || a[:blood_loss_high]     # deviation without additional treatment

    "0"
  end

  def eaes(a)
    return "5" if a[:death]
    return "4" if a[:life_threatening] || a[:sig_consequences] || a[:re_operation] || a[:intensive_care]
    return "3" if a[:post_op_care_change] || a[:intraoperative_course_change]
    return "2" if a[:intervention]

    "1"
  end
end
