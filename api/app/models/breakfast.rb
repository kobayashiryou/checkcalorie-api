class Breakfast < ApplicationRecord
  belongs_to :user
  belongs_to :food
  validates :date, :food_id, presence: true
end
