require "rails_helper"

RSpec.describe Breakfast, type: :model do
  describe "validation check" do
    subject { breakfast.valid? }

    let!(:user) { create(:user) }
    let!(:food) { create(:food) }
    let(:breakfast) { build(:breakfast, date: date, user: user, food: food) }
    let(:date) { Faker::Date.between(from: "2020-1-1", to: "2021-08-25") }
    context "dateが入力されている場合" do
      it "作成される" do
        expect(subject).to eq true
      end
    end

    context "dateが入力されていない時" do
      let(:date) { nil }
      it "エラーする" do
        subject
        expect(breakfast.errors.messages[:date]).to include "can't be blank"
      end
    end
  end
end
