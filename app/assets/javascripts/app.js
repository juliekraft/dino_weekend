var Dinosaur = Backbone.Model.extend ({
  defaults: {
    name: "Essie",
    species: "Veloceraptor",
    gender: "genderqueer"
  },
  url: function(){
    if(this.get("id")){
      return "/dinosaurs/" + this.get("id")
    } else {
      return '/dinosaurs'
    }
  }
})

var DinosaurView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurView created!");
    this.render();
    this.listenTo( list_view.collection, "remove", function(model){
      model.destroy({
        url: "/dinosaurs/" + model.id
      });
    })
  },
  template: function(attrs){
    var listTemplate = _.template("My name is <%=name%>, and I'm a <%= gender %> <%= species %>!");
    return listTemplate(attrs);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes)).append(" " + "<button class='delete'>Delete</button> <button class='edit'>Edit</button>");
    console.log(this.model.attributes);
  },
    events: {
    "click .delete" : "delete",
    "click .edit" : "editCallback"
  },
    delete: function(){
    console.log("Remove")
    this.model.destroy()
    this.render()
  },
  editCallback: function(){
    form_view.edit(this.model)
  }
})

var DinosaurList = Backbone.Collection.extend ({
  initialize: function(){
    console.log("DinosaurList created!");
  },
  url: '/dinosaurs',
  model: Dinosaur
})

var DinosaurListView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurListView created!");

    this.collection = new DinosaurList();

    this.listenTo(this.collection, 'all', this.render);
    this.collection.fetch();
    this.views = [];
  },
  el: function(){
    return $('#dinosaur_div');
  },
  render: function(){
    var self = this;

    //removes old views
    _.each(this.views, function(view){
      view.remove();
    })

    // attach new views synced to existing models
    // why is models plural????????????
    _.each( this.collection.models, function(dinosaur){
      var dinosaur_view = new DinosaurView({
        model: dinosaur
      });

      self.$el.append(dinosaur_view.$el);
      self.views.push(dinosaur_view);
    })
  }
})

var FormView = Backbone.View.extend ({
  initialize: function(){
    console.log("FormView initialized!")
    this.$('#dinosaur_update_button').hide();
  },
  el: function(){
    return $('#dinosaur_form');
  },
  submitCallback: function(e){
    e.preventDefault();

    var array_of_dinosaur_data = this.$el.serializeArray();

    // creating an instance of dinosaur and placing it in the collection
    list_view.collection.create({
      name: array_of_dinosaur_data[0].value,
      species: array_of_dinosaur_data[1].value,
      gender: array_of_dinosaur_data[2].value
    });

    this.resetValues();
  },
  resetValues: function(){
    _.each(this.$('input'), function(input){
      $(input).val('');
    })
  },
  edit: function(model){
    this.$('#dinosaur_create_button').hide();
    this.$('#dinosaur_update_button').show();

    this.$('#dinosaur_name').val(model.get('name'));
    this.$('#dinosaur_species').val(model.get('species'));
    this.$('#dinosaur_gender').val(model.get('gender'));

    this.$('#dinosaur_update_button').on('click', function(e){
      e.preventDefault();

      model.set({
        'name': form_view.$('#dinosaur_name').val(),
        'species': form_view.$('#dinosaur_species').val(),
        'gender': form_view.$('#dinosaur_gender').val()
      })

      model.save({}, {
        url: "/dinosaurs/"+model.id
      })

      form_view.$('#dinosaur_create_button').show();
      form_view.$('#dinosaur_update_button').hide();

      $(this).off('click');
    })

  },
  events: {
    "click #dinosaur_create_button" : "submitCallback",
    "click #dinosaur_update_button" : "updateCallback"
  }
})

$(function(){
  window.form_view = new FormView();
  window.list_view = new DinosaurListView();
  console.log("Document ready!");
})

