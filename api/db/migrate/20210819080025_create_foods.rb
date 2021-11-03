class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :meal
      t.integer :calorie

      t.timestamps
    end
  end
end
