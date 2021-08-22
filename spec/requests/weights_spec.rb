require "rails_helper"

RSpec.describe "Weights", type: :request do
  describe "GET api/v1/weights" do
    subject { get(api_v1_weights_path, headers: headers) }

    let!(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    before do
      create_list(:weight, 3, user: current_user)
      create_list(:weight, 2)
    end

    context "ログインユーザーがuserである時" do
      it "userのweights一覧が表示される" do
        subject
        res = JSON.parse(response.body)
        expect(res.length).to eq 3
        expect(res[0].keys).to eq ["date", "kg", "user"]
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "GET api/v1/weights/:id" do
    subject { get(api_v1_weight_path(weight_id), headers: headers) }

    let!(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:weight) { create(:weight, user: current_user) }
    let(:weight_id) { weight.id }
    context "指定されたidが存在している時" do
      it "指定されたweightが表示される" do
        subject
        expect(response).to have_http_status(:ok)
      end
    end

    context "指定されたidが存在しない時" do
      let(:weight_id) { 0 }
      it "エラーする" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "POST api/v1/weights" do
    subject { post(api_v1_weights_path, params: params, headers: headers) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) { { weight: attributes_for(:weight) } }
    context "date, kgを入力した場合" do
      it "weightは作成される" do
        expect { subject }.to change { current_user.weights.count }.by(1)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "PATCH api/v1/weight/:id" do
    subject { patch(api_v1_weight_path(weight_id), params: params, headers: headers) }

    let!(:current_user) { create(:user) }
    let!(:weight) { create(:weight, user: current_user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:params) { { weight: { kg: Faker::Number.within(range: 15..150), created_at: Time.current } } }
    let(:weight_id) { weight.id }
    context "current_userが自分の指定したweightを編集した時" do
      it "weightは編集される" do
        expect { subject }.to change { Weight.find(weight_id).kg }.from(weight.kg).to(params[:weight][:kg]) &
                              not_change { Weight.find(weight_id).id } &
                              not_change { Weight.find(weight_id).user } &
                              not_change { Weight.find(weight_id).created_at }
        expect(response).to have_http_status(:ok)
      end
    end

    context "current_userが他のweightを編集した時" do
      let(:weight) { create(:weight) }
      it "エラーする" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "DELETE api/v1/weight/:id" do
    subject { delete(api_v1_weight_path(weight_id), headers: headers) }

    let!(:current_user) { create(:user) }
    let!(:weight) { create(:weight, user: current_user) }
    let(:headers) { current_user.create_new_auth_token }
    let(:weight_id) { weight.id }
    context "current_userが指定したidする時" do
      it "weightは削除される" do
        expect { subject }.to change { current_user.weights.count }.by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context "current_userが他のweightを削除する時" do
      let(:weight) { create(:weight) }
      let(:weight_id) { weight.id }
      it "エラーする" do
        expect { subject }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end
end
