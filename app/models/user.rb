# frozen_string_literal: true

class User < ApplicationRecord
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :weights, dependent: :destroy
  has_many :breakfasts, dependent: :destroy
  has_many :lunchs, dependent: :destroy
  has_many :diners, dependent: :destroy
  has_many :snacks, dependent: :destroy
  has_many :foods, through: :breakfasts
  has_many :foods, through: :lunches
  has_many :foods, through: :diners
  has_many :foods, through: :snacks
end
