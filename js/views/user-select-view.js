// USER SELECT VIEW //
// js/views/user-select-views.js   View usada para mostrar el combo de usuarios en la app 

var app = app || {};

(function($){

	'use strict';

	app.UserSelectView = Backbone.View.extend({
		
		tagName : 'select',

		initialize: function(){
			this.listenTo(app, 'usersFetched', this.render);
			this.listenTo(app, 'usersUpdated', this.render);
			if (app.users){
				this.render();
			}
		},

		render: function(){

			$('#users').html('');

			var selectBody = '<select>';
			var openTag = '<option ';
			var closeTag = '</option>';
			app.users.each(function(model){
				selectBody += openTag + 'val=' + model.get('name') + '>';
				selectBody += model.get('name');
				selectBody += closeTag;
			}, this);
			selectBody += '</select>';

			$('#users').html(selectBody);

			return this;
		}

	});

	new app.UserSelectView();

})(jQuery);