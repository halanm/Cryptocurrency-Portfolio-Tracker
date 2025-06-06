class CreateTrades < ActiveRecord::Migration[8.0]
  def change
    create_table :trades do |t|
      t.string :token_symbol
      t.decimal :amount_invested
      t.decimal :quantity
      t.string :currency
      t.string :trade_type

      t.timestamps
    end
  end
end
