class CreateWeights < ActiveRecord::Migration[6.1]
  def change
    create_table :weights do |t|
      t.integer :year
      t.integer :month
      t.integer :date
      t.integer :kg
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
