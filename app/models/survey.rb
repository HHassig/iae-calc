class Survey < ApplicationRecord
  belongs_to :user

  # Grades are always computed server-side from the answers; the client never
  # supplies them (see IaeGrading for the rules and their sources).
  before_save :compute_grades

  def answers
    IaeGrading::QUESTIONS.index_with { |question| self[question] }
  end

  def yes_or_no(answer)
    answer ? "Yes" : "No"
  end

  private

  def compute_grades
    assign_attributes(IaeGrading.grade(answers))
  end
end
