class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :wallet_address
      t.string :preferred_currency, default: 'USD'

      t.timestamps
    end
  end
end
