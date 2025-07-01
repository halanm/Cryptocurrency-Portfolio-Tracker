require 'siwe'
require 'eth'

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

  def nonce
    nonce = SecureRandom.hex(16)
    redis_key = "siwe_nonce:#{nonce}"
    $redis.setex(redis_key, 300, "1")
    render plain: nonce
  end

  def verify
    message = params[:message]
    signature = params[:signature]
  
    return render json: { error: "Missing message or signature" }, status: 400 unless message && signature
  
    begin
      siwe_message = Siwe::Message.from_message(message)
    rescue => e
      return render json: { error: "SIWE parsing error: #{e.message}" }, status: 400
    end
  
    nonce_key = "siwe_nonce:#{siwe_message.nonce}"
    unless $redis.get(nonce_key)
      return render json: { error: "Invalid or expired nonce" }, status: 401
    end
  
    begin
      pubkey_uncompressed = Eth::Signature.personal_recover(siwe_message.prepare_message, signature)
      address_obj = Eth::Util.public_key_to_address(pubkey_uncompressed)
      recovered_address = address_obj.address
    rescue => e
      return render json: { error: "Signature recovery failed: #{e.message}" }, status: 400
    end
  
    if recovered_address.downcase == siwe_message.address.downcase
      $redis.del(nonce_key)

      user = User.find_by(wallet_address: recovered_address.downcase)
      
      if user.nil?
        user = User.new(
          wallet_address: recovered_address.downcase,
        )
        
        if user.save
          token = user.generate_jwt
          refresh_token = SecureRandom.hex(32)
          $redis.setex("refresh_token:#{refresh_token}", 30.days.to_i, user.id)
          
          render json: { token: token, refresh_token: refresh_token }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        token = user.generate_jwt
        refresh_token = SecureRandom.hex(32)
        $redis.setex("refresh_token:#{refresh_token}", 30.days.to_i, user.id)
        
        render json: { token: token, refresh_token: refresh_token }, status: :ok
      end
    else
      render json: { error: "Address verification failed" }, status: :unauthorized
    end
  end  

  private

  def user_params
    params.permit(:email, :password)
  end
end
