var Dinosaur = Backbone.Model.extend ({
  defaults: {
    name: "Essie",
    species: "Veloceraptor",
    gender: "genderqueer"
  },
  initialize: function(){
    console.log("Dinosaur created!");
  }
})

var DinosaurView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurView created!");
    this.render();
  },
  template: function(attrs){
    var listTemplate = _.template("My name is <%=name%>, and I'm a <%= gender %> <%= species %>!");
    return listTemplate(attrs);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes)).append(" " + "<button class='remove'>Remove</button> <button class='edit'>Edit</button>");
    console.log(this.model.attributes);
  }
})

var DinosaurList = Backbone.Collection.extend ({
  initialize: function(){
    console.log("DinosaurList created!");
  },
  url: '/dinosaurs',
  model: function(attrs){
    return new Dinosaur(attrs);
  }
})

var DinosaurListView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurListView created!");

    this.collection = new DinosaurList();

    this.listenTo(this.collection, 'add', this.render);
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
  },
  events: {
    "click .remove" : "remove"
  },
    remove: function(){
    console.log("Remove")
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
  events: {
    "click #dinosaur_create_button" : "submitCallback",
  }
})

$(function(){
  window.form_view = new FormView();
  window.list_view = new DinosaurListView();
  console.log("Document ready!");
})

