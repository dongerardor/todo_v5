/// USER VIEW - just one user ///
/// js/views/user-view.js ///

var app = app || {};

(function($){
	
	'use strict';

	app.UserView = Backbone.View.extend({

		tagName : 'li',

		template: _.template($('#user-item-template').html()),

		model : {},

		events: {
			'click .destroy' : 'clear'
		},

		initialize : function(model){
			this.model = model;
			this.listenTo(app, 'closeEditUsers', this.close);
		},

		render : function(){
			this.$el.html(this.template(this.model.toJSON()));			
			return this;
		},

		close : function(){
			this.remove();
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
			this.close();
		},

	})
})(jQuery)