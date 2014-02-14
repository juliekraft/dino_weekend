DinosWeekend::Application.routes.draw do

  root to: 'dinosaurs#index'

  resources :dinosaurs

end
