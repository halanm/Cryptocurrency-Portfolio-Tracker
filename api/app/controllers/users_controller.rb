class UsersController < ApplicationController
  def me
    render json: user_info, status: :ok
  end
  def update
    if current_user.update(user_params)
      render json: user_info, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_info
    current_user.as_json(except: [:password_digest, :created_at, :updated_at])
  end

  def user_params
    params.permit(:preferred_currency)
  end
end
