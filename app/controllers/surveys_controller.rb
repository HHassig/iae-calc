class SurveysController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def index
    @surveys = Survey.where(user_id: current_user.id)
    respond_to do |format|
      format.html
      format.csv { send_data as_csv(@surveys) }
    end
  end

  def home
    @survey = Survey.new
  end

  def show
    @survey = validate_survey(params[:id])
  end

  def new
    @survey = Survey.new
  end

  def create
    @survey = update_survey(Survey.new(survey_params))
    @survey.save! ? (redirect_to survey_path(@survey), notice: "Saved.") : (render :new, status: :unprocessable_entity)
  end

  private

  def update_survey(survey)
    survey.user_id = current_user.id
    survey.patient_id = "N/A" if survey.patient_id == ""
    survey.iae_description = "Not provided." if survey.iae_description == ""
    survey.iae_management = "Not provided." if survey.iae_management == ""
    survey
  end

  def survey_params
    params.require(:survey).permit(:user, :death, :life_threatening, :sig_consequences, :incorrect_with_consent, :intraoperative_course_change, :unanticipated_conversion, :aborted_incomplete, :unplanned_stoma, :unplanned_removal, :intervention, :post_op_care_change, :intensive_care, :re_operation, :blood_loss_high, :more_blood_units, :eauiaic, :iae_severity, :suffix_t, :modified_satava, :class_intra, :eaes, :patient_id, :iae_description, :iae_management)
  end

  def as_csv(surveys)
    CSV.generate do |csv|
      columns = %w(id patient_id iae_description iae_management eauiaic iae_severity suffix_t modified_satava class_intra eaes
        death life_threatening sig_consequences incorrect_with_consent intraoperative_course_change unanticipated_conversion aborted_incomplete
        unplanned_stoma unplanned_removal intervention post_op_care_change intensive_care re_operation blood_loss_high more_blood_units)
      csv << columns.map(&:humanize)
      surveys.each { |survey| csv << survey.attributes.values_at(*columns) }
    end
  end

  def validate_survey(id)
    survey = Survey.find(id)
    survey.user_id == current_user.id ? survey : nil
  end
end
