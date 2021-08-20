FactoryBot.define do
  factory :snack do
    date { Faker::Date.between(from: "2020-1-1", to: "2021-08-25") }
    user
    food
  end
end
