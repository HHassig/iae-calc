require "csv"

class Survey < ApplicationRecord
  belongs_to :user
  def yes_or_no(answer)
    answer ? "Yes" : "No"
  end

  def get_eauiaic(survey)
    return "0" if !survey.death && !survey.intervention && !survey.life_threatening && !survey.sig_consequences && !survey.incorrect_with_consent && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.re_operation
    return "1" if (survey.intervention || survey.more_blood_units) && !survey.death && !survey.life_threatening && !survey.sig_consequences && !survey.incorrect_with_consent && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.re_operation
    return "2" if (survey.unanticipated_conversion || survey.sig_consequences || survey.re_operation) && !survey.death && !survey.life_threatening && !survey.incorrect_with_consent && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal
    return "3" if !survey.death && survey.life_threatening && !survey.incorrect_with_consent && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal
    return "4A" if !survey.death && !survey.incorrect_with_consent && !survey.aborted_incomplete && !survey.unplanned_stoma && survey.unplanned_removal
    return "4B" if (survey.aborted_incomplete || survey.unplanned_stoma) && !survey.death && !survey.incorrect_with_consent
    return "5A" if !survey.death && survey.incorrect_with_consent
    return "5B" if survey.death
    return "No record for EAUIAIC."
  end

  def get_iae_severity(survey)
    return "I" if !survey.death && !survey.intervention && !survey.incorrect_with_consent && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.re_operation
    return "II" if !survey.death && survey.intervention && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.re_operation
    return "III" if !survey.death && !survey.unanticipated_conversion && !survey.aborted_incomplete && survey.unplanned_removal && !survey.re_operation
    return "IV" if !survey.death && (survey.unanticipated_conversion || survey.aborted_incomplete || survey.unplanned_stoma || survey.incorrect_with_consent) && !survey.re_operation
    return "V" if !survey.death && survey.re_operation
    return "VI" if survey.death
    return "No record for iAE Severity."
  end

  def get_modified_satava(survey)
    return "I" if !survey.death && !survey.life_threatening && !survey.sig_consequences && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.re_operation && !survey.blood_loss_high
    return "II" if (survey.unanticipated_conversion || survey.unplanned_stoma || survey.unplanned_removal || survey.blood_loss_high || survey.aborted_incomplete) && !survey.death && !survey.life_threatening && !survey.sig_consequences
    return "III" if survey.death || survey.life_threatening || survey.sig_consequences || survey.re_operation
    return "No record for Modified Satava."
  end

  def get_class_intra(survey)
    return "0" if !survey.death && !survey.life_threatening && !survey.sig_consequences && !survey.incorrect_with_consent && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.intervention && !survey.re_operation && !survey.blood_loss_high
    return "I" if (survey.intraoperative_course_change || survey.blood_loss_high) && !survey.death && !survey.life_threatening && !survey.sig_consequences && !survey.unanticipated_conversion && !survey.aborted_incomplete && !survey.unplanned_stoma && !survey.unplanned_removal && !survey.intervention && !survey.re_operation
    return "II" if (survey.intervention || survey.aborted_incomplete || survey.blood_loss_high || survey.re_operation || survey.incorrect_with_consent) && !survey.death && !survey.life_threatening && !survey.sig_consequences && !survey.unanticipated_conversion && !survey.unplanned_stoma && !survey.unplanned_removal
    return "III" if (survey.life_threatening || survey.sig_consequences || survey.unplanned_stoma || survey.unanticipated_conversion || survey.unplanned_removal) && !survey.death
    return "IV" if survey.death
    return "No record for Class Intra."
  end

  def get_eaes(survey)
    return "5" if survey.death
    return "4" if survey.life_threatening || survey.sig_consequences || survey.re_operation || survey.intensive_care
    return "3" if survey.post_op_care_change || survey.intraoperative_course_change
    return "2" if survey.intervention && !survey.post_op_care_change
    return "1"
  end

  def get_suffix_t(survey)
    survey.more_blood_units ? " T" : ""
  end
end
