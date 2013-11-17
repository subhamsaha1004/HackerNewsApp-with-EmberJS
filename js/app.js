App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource( 'index', { path: '/' } );
});

App.IndexController = Ember.ObjectController.extend({
  headerName: 'Welcome to the Hacker News App',
  appVersion:  2.1
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Item.all();
  }
});

App.Item = Ember.Object.extend();

App.Item.reopenClass({
  all: function() {
  	return $.getJSON("http://api.ihackernews.com/page?format=jsonp&callback=?").then(function(response) {
      var items = [];

      response.items.forEach( function (item) {
        items.push( App.Item.create(item) );
      });

      return items;
    });
  }
});
