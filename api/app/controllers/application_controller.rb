class ApplicationController < ActionController::API
  before_action :authenticate_request

  attr_reader :current_user

  private

  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      decoded = JWT.decode(header, ENV['SECRET_KEY_BASE'])[0]
      @current_user = User.find(decoded["user_id"])
    rescue
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
