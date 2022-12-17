class SurveysController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def show
    @survey = Survey.find(params[:id])
    # @venues = Venue.all
  end

  def index
    @surveys = Survey.all
  end
end
