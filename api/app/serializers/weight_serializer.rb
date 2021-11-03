class WeightSerializer < ActiveModel::Serializer
  attributes :id, :date, :kg
  has_one :user
end
