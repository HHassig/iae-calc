module ApplicationHelper
  # Text shown for a stored grade; iAE Severity carries the transfusion suffix.
  def grade_display(survey, scale)
    value = survey[scale].to_s
    value += survey.suffix_t.to_s if scale == :iae_severity
    value.presence || "–"
  end

  def grade_band(survey, scale)
    IaeGrading.band(scale, survey[scale])
  end
end
