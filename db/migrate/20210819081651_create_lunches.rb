class CreateLunches < ActiveRecord::Migration[6.1]
  def change
    create_table :lunches do |t|
      t.integer :year
      t.integer :month
      t.integer :date
      t.references :user, null: false, foreign_key: true
      t.references :food, null: false, foreign_key: true

      t.timestamps
    end
  end
end
