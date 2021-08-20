require "rails_helper"

RSpec.describe Training, type: :model do
  describe "validation check" do
    subject { training.valid? }

    let!(:user) { create(:user) }
    let(:training) { build(:training, calorie: calorie, date: date, user: user) }
    let(:calorie) { Faker::Number.number(digits: 5) }
    let(:date) { Faker::Date.between(from: "2020-1-1", to: "2021-08-25") }
    context "calorie,dateが入力されている時" do
      it "作成される" do
        expect(subject).to eq true
      end
    end

    context "calorieが入力されていない時" do
      let(:calorie) { nil }
      it "エラーする" do
        subject
        expect(training.errors.messages[:calorie]).to include "can't be blank"
      end
    end

    context "dateが入力されていない時" do
      let(:date) { nil }
      it "エラーする" do
        subject
        expect(training.errors.messages[:date]).to include "can't be blank"
      end
    end
  end
end
