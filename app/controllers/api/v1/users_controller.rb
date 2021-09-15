class Api::V1::UsersController < Api::V1::ApiController
  def index
    if current_user
      render json: { status: 200, current_user: current_user}
    else
      render json: { status: 500, message: "ユーザーが存在しません"}
    end
  end
end