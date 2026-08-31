class FixPatientIdTypeAndRecomputeGrades < ActiveRecord::Migration[8.0]
  # patient_id was an integer column, silently casting identifiers like
  # "MRN-0012" to nil. Stored grades predate the server-side grading fix, so
  # every row is re-graded from its answers.
  def up
    change_column :surveys, :patient_id, :string
    Survey.reset_column_information
    Survey.find_each { |survey| survey.save!(validate: false) }
  end

  def down
    change_column :surveys, :patient_id, :integer
  end
end
