class CreateDiners < ActiveRecord::Migration[6.1]
  def change
    create_table :diners do |t|
      t.date :date
      t.references :user, null: false, foreign_key: true
      t.references :food, null: false, foreign_key: true

      t.timestamps
    end
  end
end
