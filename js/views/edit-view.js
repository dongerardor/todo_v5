///// VIEW //////
// js/views/edit-views.js ///

var app = app || {};

(function ($) {
	
	'use strict';

	app.EditView = Backbone.View.extend({

		template: _.template( $('#item-edit').html() ),//

		model : {},

		events : {
			'click .btnCloseEdit' 	: 'close',
			'click #btnSaveEdit' 	: 'save',
			'click #btnCancelEdit'	: 'close'
		},

		initialize : function(cid){
			if (cid !== undefined){
				this.model = app.todos.get(cid);
			}
			this.render(this.model);
		},

		render : function(){
			this.$el.html(this.template( this.model.attributes ));
			this.$el.appendTo('#editWindow');
			$("#editWindowWrapper").addClass('show');

			this.$title = this.$('#title');
			this.$date = this.$('#editDatepicker');
			this.$selectCategories = this.$('#categories');
			return this;
		},

		// Generate the attributes for edit a Todo item.
		newAttributes: function () {
			return {
				title: this.$title.val().trim(),
				completed: false,
				date: moment($('#editDatepicker').val()).unix(),
				category: $('#editCategories').val()
			};
		},

		save : function(){

			//console.log(this.newAttributes());
			this.model.set(this.newAttributes());
			this.model.save();
			this.close();
			app.TodoRouter.navigate('edit', true);
		},

		close : function(){
			$("#editWindowWrapper").removeClass('show');
			this.remove();
		}
	})

})(jQuery);