# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_11_084848) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "surveys", force: :cascade do |t|
    t.boolean "death"
    t.boolean "life_threatening"
    t.boolean "sig_consequences"
    t.boolean "incorrect_with_consent"
    t.boolean "intraoperative_course_change"
    t.boolean "unanticipated_conversion"
    t.boolean "aborted_incomplete"
    t.boolean "unplanned_stoma"
    t.boolean "unplanned_removal"
    t.boolean "intervention"
    t.boolean "post_op_care_change"
    t.boolean "intensive_care"
    t.boolean "re_operation"
    t.boolean "blood_loss_high"
    t.boolean "more_blood_units"
    t.integer "patient_id"
    t.text "iae_description"
    t.text "iae_management"
    t.bigint "user_id", null: false
    t.text "eauiaic"
    t.text "iae_severity"
    t.text "suffix_t"
    t.text "modified_satava"
    t.text "class_intra"
    t.text "eaes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_surveys_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "surveys", "users"
end
