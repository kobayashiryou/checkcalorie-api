class Api::V1::TestsController < Api::V1::ApiController
  def index
    message = {
      message: "Hello World",
      status: 200,
    }
    render json: message
  end
end
