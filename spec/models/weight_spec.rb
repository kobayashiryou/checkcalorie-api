require "rails_helper"

RSpec.describe Weight, type: :model do
  describe "validation check" do
    subject { weight.valid? }

    let(:weight) { build(:weight, year: year, month: month, date: date, kg: kg) }
    let(:year) { Faker::Date.between(from: 2020, to: 2060) }
    let(:month) { Faker::Date.between(from: 1, to: 12) }
    let(:date) { Faker::Date.between(from: 1, to: 31) }
    let(:kg) { Faker::Number.between(from: 1, to: 200) }
    context "year,month,date,kgが指定されている時" do
      it "weightは作成される" do
        expect(subject).to eq true
      end
    end

    context "yearがnilの時" do
      let(:year) { nil }
      it "エラーする" do
        subject
        expect(weight.errors.messages[:year]).to include "can't be blank"
      end
    end

    context "monthがnilの時" do
      let(:month) { nil }
      it "エラーする" do
        subject
        expect(weight.errors.messages[:month]).to include "can't be blank"
      end
    end

    context "dateがnilの時" do
      let(:date) { nil }
      it "エラーする" do
        subject
        expect(weight.errors.messages[:date]).to include "can't be blank"
      end
    end

    context "kgがnilの時" do
      let(:kg) { nil }
      it "エラーする" do
        subject
        expect(weight.errors.messages[:kg]).to include "can't be blank"
      end
    end
  end
end
