class WeightsController < ApplicationController
  before_action :set_weight, only: [:show, :update, :destroy]

  # GET /weights
  def index
    @weights = Weight.all

    render json: @weights
  end

  # GET /weights/1
  def show
    render json: @weight
  end

  # POST /weights
  def create
    @weight = Weight.new(weight_params)

    if @weight.save
      render json: @weight, status: :created, location: @weight
    else
      render json: @weight.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /weights/1
  def update
    if @weight.update(weight_params)
      render json: @weight
    else
      render json: @weight.errors, status: :unprocessable_entity
    end
  end

  # DELETE /weights/1
  def destroy
    @weight.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_weight
      @weight = Weight.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weight_params
      params.require(:weight).permit(:year, :month, :date, :kg, :user_id)
    end
end
