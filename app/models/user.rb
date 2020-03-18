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
        errors.add(:email, "is not valid. It has to be a valid UK university domain")
      end
    end
end
