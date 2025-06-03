class CreateTokens < ActiveRecord::Migration[8.0]
  def change
    create_table :tokens do |t|
      t.string :name
      t.string :symbol
      t.string :contract_address

      t.timestamps
    end
  end
end
