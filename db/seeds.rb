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
  { date: "2021-8-30", kg: 62, user_id: 1 },
  { date: "2021-8-31", kg: 63, user_id: 1 },
]

Weight.create!(weights)
