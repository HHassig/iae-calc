class CreateSurveys < ActiveRecord::Migration[7.0]
  def change
    create_table :surveys do |t|
      t.boolean :death
      t.boolean :life_threatening
      t.boolean :sig_consequences
      t.boolean :incorrect_with_consent
      t.boolean :intraoperative_course_change
      t.boolean :unanticipated_conversion
      t.boolean :aborted_incomplete
      t.boolean :unplanned_stoma
      t.boolean :unplanned_removal
      t.boolean :intervention
      t.boolean :post_op_care_change
      t.boolean :intensive_care
      t.boolean :re_operation
      t.boolean :blood_loss_high
      t.boolean :more_blood_units

      t.timestamps
    end
  end
end
