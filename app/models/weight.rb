class Weight < ApplicationRecord
  belongs_to :user
  validates :date, :kg, presence: true
end
