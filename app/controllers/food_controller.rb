class FoodController < ApplicationController
  before_action :authenticate_user!
  
  def show
    @recipe = Recipe.new
  end

end
