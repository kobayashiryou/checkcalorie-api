FactoryBot.define do
  factory :food do
    meal { Faker::Food.dish }
    calorie { Faker::Number.number(digits: 5) }
  end
end
