class User < ApplicationRecord
  has_many :portfolios, dependent: :destroy
  has_many :wallets, dependent: :destroy

  has_secure_password validations: false
  
  validates :password, presence: true, if: -> { email.present? && !wallet_address.present? }
  validates :wallet_address, presence: true, unless: -> { email.present? && password_digest.present? }
  validates :email, presence: true, unless: -> { wallet_address.present? }

  validates :email, uniqueness: true, allow_nil: true
  validates :wallet_address, uniqueness: true, allow_nil: true
  validates :preferred_currency, presence: true

  def generate_jwt
    payload = { user_id: id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, ENV['SECRET_KEY_BASE'])
  end
end
