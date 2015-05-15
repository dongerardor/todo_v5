//// USERS VIEWS ////
// js/views/users-views.js///

var app = app || {};

(function(){

	'useStrict';

	app.EditUsers = Backbone.View.extend({

		template : _.template($('#user-list-template').html()),

		events : {
			'click .btnCloseUsers'	: 'close',
			'click #btnCreateUser' 	: 'createUser'
		},

		createUser : function(){
			var newUserName = $("#inputNewUser").val().trim();
			if (newUserName != ""){
				app.users.create({name: newUserName});
				$("#inputNewUser").val('');
				this.render();
			}
			//aviso al resto de la apliación que han sido actualizado los usuarios
			app.trigger('usersUpdated');
		},

		initialize : function(){
			this.listenTo(app, 'editingUsers', this.render);
		},

		render : function(){
			this.$el.html(this.template());
			this.$el.appendTo('#usersWindow');
			$("#editUsersWrapper").addClass('show');
			//
			//$('#user-ul').html('');
			app.users.each(function(model){
				var view = new app.UserView(model);
				$('#user-ul').append(view.render().el);
			}, this);
			
			

			return this;
		},

		close : function(){
			app.trigger('closeEditUsers');
			app.TodoRouter.navigate('', {trigger: true});
			$("#editUsersWrapper").removeClass('show');
			this.remove();
		}

	})

})();