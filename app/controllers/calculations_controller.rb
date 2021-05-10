class CalculationsController < ApplicationController
  before_action :authenticate_user!
  def index
    @calculations = Calculation.all.order(created_at: :desc)
  end

  def create
  end
end
