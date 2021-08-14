class WeightSerializer < ActiveModel::Serializer
  attributes :id, :year, :month, :date, :kg
  has_one :user
end
