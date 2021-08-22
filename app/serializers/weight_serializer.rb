class WeightSerializer < ActiveModel::Serializer
  attributes :date, :kg
  has_one :user
end
