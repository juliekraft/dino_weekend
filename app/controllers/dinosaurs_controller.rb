class DinosaursController < ApplicationController

  def index
    @dinosaurs = Dinosaur.all

    respond_to do |format|
      format.html
      format.json {render json: @dinosaurs}
    end
    
  end

  def create
  end

  def destroy
  end

  def update
  end

  # def edit
  # end

  # def new
  # end
  
end