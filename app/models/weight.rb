class Weight < ApplicationRecord
  belongs_to :user
  validates :year, :month, :date, :kg, presence: true
end
