class UsersController < ApplicationController
  def me
    render json: current_user.as_json(except: [:password_digest, :created_at, :updated_at]), status: :ok
  end
end
