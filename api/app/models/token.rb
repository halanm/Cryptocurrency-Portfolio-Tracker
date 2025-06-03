class Token < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :symbol, presence: true, uniqueness: true
  validates :contract_address, presence: false, uniqueness: true
end
