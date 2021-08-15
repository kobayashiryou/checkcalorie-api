FactoryBot.define do
  factory :weight do
    year { Faker::Date.between(from: 2020, to: 2060) }
    month { Faker::Date.between(from: 1, to: 12) }
    date { Faker::Date.between(from: 1, to: 31) }
    kg { Faker::Number.number(from: 1, to:200) }
    user
  end
end
