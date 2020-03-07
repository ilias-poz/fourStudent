class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validate :emailValidation

  private

    def emailValidation()
      if ApplicationController.helpers.Validate(email)

      else
        errors.add(:email, "Is not valid")
      end
    end
end
