class CreateDinosaurs < ActiveRecord::Migration
  def change
    create_table :dinosaurs do |t|
      t.string :name
      t.string :species
      t.string :gender

      t.timestamps
    end
  end
end
