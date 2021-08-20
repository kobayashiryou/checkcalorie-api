FactoryBot.define do
  factory :weight do
    date { Faker::Date.between(from: '2020-1-1', to: '2021-08-25') }
    kg { Faker::Number.number(from: 1, to: 200) }
    user
  end
end
