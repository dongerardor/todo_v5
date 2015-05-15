/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'editUsers' : 'editUsers',
			'edit(/:id)' : 'edit',
			'*filter': 'setFilter'
		},

		editUsers : function(){
			var editWindow = new app.EditUsers();
			app.trigger('editingUsers');
		},

		edit : function(id){
			if (id){
				var editWindow = new app.EditView(id);
				app.trigger('editingItem');
			}else{
				console.log('stopEditingItem');
				app.trigger('stopEditingItem');
				this.navigate('', {trigger: true});
			}
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
