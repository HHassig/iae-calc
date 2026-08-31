require "csv"

class SurveysController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :grade ]
  # grade is a stateless computation over the posted answers (no session use,
  # no writes), and the form's per-form CSRF token is scoped to /surveys.
  skip_forgery_protection only: :grade

  def index
    @surveys = current_user.surveys.order(created_at: :desc)
    respond_to do |format|
      format.html
      format.csv { send_data as_csv(@surveys), filename: "iae-entries-#{Date.current}.csv" }
    end
  end

  def home
    @survey = Survey.new
  end

  def show
    @survey = current_user.surveys.find(params[:id])
  end

  def new
    redirect_to root_path
  end

  # Live grading for the calculator. Grades are computed here for display and
  # recomputed on save, so the client never decides a grade.
  def grade
    grades = IaeGrading.grade(Survey.new(survey_params).answers)
    render json: { grades: grades, bands: IaeGrading.bands(grades) }
  end

  def create
    @survey = current_user.surveys.new(survey_params)
    if @survey.save
      redirect_to survey_path(@survey), notice: "Entry saved."
    else
      flash.now[:alert] = @survey.errors.full_messages.to_sentence
      render :home, status: :unprocessable_entity
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:patient_id, :iae_description, :iae_management, *IaeGrading::QUESTIONS)
  end

  def as_csv(surveys)
    CSV.generate do |csv|
      columns = %w(id created_at patient_id iae_description iae_management eauiaic iae_severity suffix_t modified_satava class_intra eaes
        death life_threatening sig_consequences incorrect_with_consent intraoperative_course_change unanticipated_conversion aborted_incomplete
        unplanned_stoma unplanned_removal intervention post_op_care_change intensive_care re_operation blood_loss_high more_blood_units)
      csv << columns.map(&:humanize)
      surveys.each { |survey| csv << survey.attributes.values_at(*columns) }
    end
  end
end
