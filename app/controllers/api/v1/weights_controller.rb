class Api::V1::WeightsController < Api::V1::ApiController
  before_action :set_weight, only: [:show, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # GET /weights
  def index
    weights = if params[:date]
                Weight.where(user_id: current_user.id, date: params[:date].in_time_zone.all_month)
              else
                Weight.where(user_id: current_user.id, date: Time.current.all_month)
              end
    render json: weights
  end

  # GET /weights/1
  def show
    render json: @weight
  end

  # POST /weights
  def create
    weight = current_user.weights.create!(weight_params)
    render json: weight
  end

  # PATCH/PUT /weights/1
  def update
    weight = current_user.weights.find(params[:id])
    weight.update!(weight_params)
    render json: weight
  end

  # DELETE /weights/1
  def destroy
    weight = current_user.weights.find(params[:id])
    weight.destroy!
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_weight
      @weight = Weight.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weight_params
      params.require(:weight).permit(:date, :kg)
    end
end
