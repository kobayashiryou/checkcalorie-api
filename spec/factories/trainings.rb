FactoryBot.define do
  factory :training do
    date { Faker::Date.between(from: "2020-1-1", to: "2021-08-25") }
    menu { Faker::Subscription.status }
    calorie { Faker::Number.number(digits: 5) }
    user
  end
end
