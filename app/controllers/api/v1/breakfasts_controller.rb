class Api::V1::BreakfastsController < ApplicationController
  before_action :set_breakfast, only: [:show, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # GET /breakfasts
  def index
    breakfasts = Breakfast.where(user_id: current_user.id)
    render json: breakfast
  end

  # GET /breakfasts/1
  def show
    render json: @breakfast
  end

  # POST /breakfast
  def create
    breakfast = current_user.breakfasts.create!(breakfast_params)
    render json: breakfast
  end

  # PATCH/PUT /breakfasts/1
  def update
    breakfast = current_user.breakfasts.find(params[:id])
    breakfast.update!(breakfast_params)
    render json: breakfast
  end

  # DELETE /breakfasts/1
  def destroy
    breakfast = current_user.breakfasts.find(params[:id])
    breakfast.destroy!
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_breakfast
      @breakfast = Breakfast.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def breakfast_params
      params.require(:breakfast).permit(:date, :food_id)
    end
end
