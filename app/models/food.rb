class Food < ApplicationRecord
  has_many :users, through: :breakfasts
  has_many :users, through: :lunches
  has_many :users, through: :deners
  has_many :users, through: :snacks
end
