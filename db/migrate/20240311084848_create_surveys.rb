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
      t.integer :patient_id
      t.text :iae_description
      t.text :iae_management
      t.references :user, null: false, foreign_key: true
      t.text :eauiaic
      t.text :iae_severity
      t.text :suffix_t
      t.text :modified_satava
      t.text :class_intra
      t.text :eaes

      t.timestamps
    end
  end
end
