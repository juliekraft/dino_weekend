class DinosaursController < ApplicationController

  def index
    @dinosaurs = Dinosaur.all

    respond_to do |format|
      format.html
      format.json {render json: @dinosaurs}
    end
    
  end

  def create
    @dinosaur = Dinosaur.create(dinosaur_params)
    render json: @dinosaur
  end

  def destroy
    @dinosaur = Dinosaur.find(params[:id])
    @dinosaur.destroy
    render json: {}
  end

  def update
     @dinosaur = Dinosaur.find(params[:id])
     @dinosaur.update_attributes(dinosaur_params)
     render json: @dinosaur
  end

  def edit
    @dinosaur = Dinosaur.find(params[:id])
  end

  def new
    @dinosaur = Dinosaur.new
  end

  private

  def dinosaur_params
    params.permit(:name, :species, :gender)
  end
  
end