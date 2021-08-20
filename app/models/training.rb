class Training < ApplicationRecord
  belongs_to :user
  validates :calorie, :date, presence: true
end
