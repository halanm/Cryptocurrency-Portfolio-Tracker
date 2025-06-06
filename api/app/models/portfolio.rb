class Portfolio < ApplicationRecord
  belongs_to :user
  
  has_many :trades, dependent: :destroy
end
