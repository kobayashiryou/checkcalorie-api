# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = [
  { email: "abc@example.com", password: "kobayasi" },
  { email: "def@example.com", password: "kobayasi" },
]

User.create!(users)

weights = [
  { date: "2021-8-30", kg: 62.5, user_id: 1 },
  { date: "2021-8-31", kg: 63.1, user_id: 1 },
  { date: "2021-9-1", kg: 63.5, user_id: 1 },
  { date: "2021-9-2", kg: 63.1, user_id: 1 },
  { date: "2021-9-3", kg: 63.4, user_id: 1 },
  { date: "2021-9-4", kg: 63.5, user_id: 1 },
  { date: "2021-9-5", kg: 64, user_id: 1 },
  { date: "2021-9-6", kg: 64.5, user_id: 1 },
  { date: "2021-9-7", kg: 65, user_id: 1 },
  { date: "2021-9-8", kg: 64.5, user_id: 1 },
  { date: "2021-9-9", kg: 64.5, user_id: 1 },
  { date: "2021-9-10", kg: 65.5, user_id: 1 },
  { date: "2021-9-11", kg: 64.5, user_id: 1 },
  { date: "2021-9-12", kg: 64, user_id: 1 },
  { date: "2021-9-13", kg: 63.5, user_id: 1 },
  { date: "2021-9-14", kg: 63.5, user_id: 1 },
  { date: "2021-9-15", kg: 64, user_id: 1 },
  { date: "2021-9-16", kg: 64.5, user_id: 1 },
  { date: "2021-9-17", kg: 64.5, user_id: 1 },
  { date: "2021-9-18", kg: 64, user_id: 1 },
  { date: "2021-9-19", kg: 63.5, user_id: 1 },
]

Weight.create!(weights)
