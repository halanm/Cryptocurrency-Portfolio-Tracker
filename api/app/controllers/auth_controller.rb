class AuthController < ApplicationController
  skip_before_action :authenticate_request

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = user.generate_jwt

      refresh_token = SecureRandom.hex(32)
      $redis.setex("refresh_token:#{refresh_token}", 30.days.to_i, user.id)
      
      render json: { token: token, refresh_token: refresh_token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def signup
    user = User.new(user_params)
    if user.save
      token = user.generate_jwt

      refresh_token = SecureRandom.hex(32)
      $redis.setex("refresh_token:#{refresh_token}", 30.days.to_i, user.id)

      render json: { token: token, refresh_token: refresh_token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def refresh
    refresh_token_key = "refresh_token:#{params[:refresh_token]}"
    user_id = $redis.get(refresh_token_key)

    if user_id
      user = User.find_by(id: user_id)
      if user
        $redis.del(refresh_token_key)

        new_refresh_token = SecureRandom.hex(32)
        $redis.setex("refresh_token:#{new_refresh_token}", 30.days.to_i, user.id)

        token = user.generate_jwt

        render json: { token: token, refresh_token: new_refresh_token }, status: :ok
      else
        render json: { error: 'User not found' }, status: :unauthorized
      end
    else
      render json: { error: 'Invalid or expired refresh token' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
