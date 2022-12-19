class SurveysController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @survey = Survey.new
  end

  def show
    @survey = Survey.find(params[:id])
  end

  def index
    @surveys = Survey.all
  end

  def new
    @survey = Survey.new
  end

  def create
    @survey = Survey.new(survey_params)
    @survey.user = current_user
    if @survey.save
      redirect_to survey_path(@survey), notice: 'Saved.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:user_id, :death, :life_threatening, :sig_consequences, :incorrect_with_consent, :intraoperative_course_change, :unanticipated_conversion, :aborted_incomplete, :unplanned_stoma, :unplanned_removal, :intervention, :post_op_care_change, :intensive_care, :re_operation, :blood_loss_high, :more_blood_units, :eauiaic, :iaeseverity, :suffixt, :modifiedsatava, :classintra, :eaes)
  end
end
