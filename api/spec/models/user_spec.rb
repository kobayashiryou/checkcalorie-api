require "rails_helper"

RSpec.describe User, type: :model do
  describe "validation check" do
    subject { user.valid? }

    let(:user) { build(:user, email: email, password: password) }
    let(:email) { Faker::Internet.email }
    let(:password) { Faker::Internet.password(min_length: 6) }
    context "email,passwordが指定されている時" do
      it "userは作成される" do
        expect(subject).to eq true
      end
    end

    context "emailがnilの時" do
      let(:email) { nil }
      it "エラーする" do
        subject
        expect(user.errors.messages[:email]).to include "can't be blank"
      end
    end

    context "passwordがnilの時" do
      let(:password) { nil }
      it "エラーする" do
        subject
        expect(user.errors.messages[:password]).to include "can't be blank"
      end
    end

    context "emailがすでに存在している時" do
      let!(:users) { create(:user) }
      let(:email) { users.email }
      it "エラーする" do
        subject
        expect(user.errors.messages[:email]).to include "has already been taken"
      end
    end
  end
end
