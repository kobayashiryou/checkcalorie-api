require "rails_helper"

RSpec.describe Food, type: :model do
  describe "validation check" do
    subject{ food.valid? }
    let(:food){ build(:food, meal: meal, calorie: calorie) }
    let(:meal){ Faker::Food.dish }
    let(:calorie){ Faker::Number.number(digits: 5) }
    context "meal,calorieが入力されている場合" do
      it "作成される" do
        expect(subject).to eq true
      end
    end
    context "mealが入力されていない時" do
      let(:meal){ nil }
      it "エラーする" do
        subject
        expect(food.errors.messages[:meal]).to include "can't be blank"
      end
    end

    context "calorieが入力されていない時" do
      let(:calorie){ nil }
      it "エラーする" do
        subject
        expect(food.errors.messages[:calorie]).to include "can't be blank"
      end
    end
  end
end
