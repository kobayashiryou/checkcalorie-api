FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "#{n}_#{Faker::Internet.email}" }
    password { Faker::Internet.password(min_length: 6) }
  end
end