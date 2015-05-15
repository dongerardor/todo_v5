//// USERS COLLECTION ////

/// js/collections/users.js ////

var app = app || {};

(function(){
	
	var Users = Backbone.Collection.extend({

		model : app.User,

		initialize: function(){
			var fetchy = this.fetch({
				reset: true, 
       			success: function(){
       				app.trigger('usersFetched');
       			},
       			error: function(){
       				console.log('error fetching');
       			}
     		});

     		console.log(this);
		},

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Backbone.LocalStorage('todos-backbone3_users'),
	});

	// Create our global collection of **Users**.
	app.users = new Users();
})();