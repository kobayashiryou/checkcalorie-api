FactoryBot.define do
  factory :weight do
    date { Faker::Date.between(from: "2020-1-1", to: "2021-08-25") }
    kg { Faker::Number.within(range: 15..150) }
    user
  end
end
