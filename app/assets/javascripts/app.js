Dinosaur = Backbone.Model.extend ({
  defaults: {
    name: "Essie",
    species: "Veloceraptor",
    gender: "genderqueer"
  },
  initialize: function(){
    console.log("Dinosaur created!");
  }
})

DinosaurView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurView created!");
    this.render();
  },
  render: function(){
    this.$el.html(this.template()(this.model.attributes));
    console.log(this.model.attributes);
  },
  template: function(attrs){
    var listTemplate = _.template("My name is <%=this.name%>, and I'm a <%= this.gender %> <%= this.species %>!");
    return template(attrs);
  },
  el: function(){

  }
})

DinosaurList = Backbone.Collection.extend ({
  model: Dinosaur,
  initialize: function(){
    console.log("DinosaurList created!");
  }
})

DinosaurListView = Backbone.View.extend ({
  initialize: function(){
    console.log("DinosaurListView created!", this.collection);
    this.listenTo(this.collection, 'add', this.render)
  },
  el: function(){
    return $('#dinosaur_div');
  },
  render: function(){
    this.$el.html("DINO DNA");
    return this;
  }
})

$(function(){
  console.log("Document ready!");
  list = new DinosaurList();
  listView = new DinosaurListView({collection: list});

})













