/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#todoapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete',
			'change #orderBy' : 'sortCollection',
			///---
			'change #orderByCategories' : 'sortCollectionCategories',
			'click #orderReverseString' : 'sortString',
			'click #btnShowUsers'		: 'showUsers'

		},

		showUsers: function(){
			console.log('show users');
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');
			this.$list = $('#todo-list');

			this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'change:completed', this.filterOne);
			this.listenTo(app.todos, 'filter', this.filterAll);
			this.listenTo(app.todos, 'all', this.render);

			///--
			this.listenTo(app, 'editingItem', this.disableView);
			this.listenTo(app, 'stopEditingItem', this.enableView);
			this.listenTo(app, 'editingItem', this.disableView);
			this.listenTo(app, 'stopEditingItem', this.enableView);
			///---

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.todos.fetch({reset: true});
		},

		///---
		disableView : function(){
			this.undelegateEvents();
		},
		enableView : function(){
			this.delegateEvents();
		},
		///---

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');

				///---
				//asigno las opciones adecuadas a los selects de la interfase
				$("#orderBy").val(app.todos.comparatorCriteria);
				$('#orderByCategories').val('none');
				///---

			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo });
			this.$list.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},

		filterOne: function (todo) {
			todo.trigger('visible');
		},

		filterAll: function () {
			app.todos.each(this.filterOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function () {
			var attributes = {
				title: this.$input.val().trim(),
				order: app.todos.nextOrder(),
				date: moment($('#datepicker').val()).unix(),
				category: $('#categories').val(),
				name: $('div#users select').val()
			}
			return attributes;
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {

			if (e.which === ENTER_KEY && this.$input.val().trim()) {
				app.todos.create(this.newAttributes())
				this.$input.val('');
			}
		},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function () {
			_.invoke(app.todos.completed(), 'destroy');
			return false;
		},

		toggleAllComplete: function () {
			var completed = this.allCheckbox.checked;

			app.todos.each(function (todo) {
				todo.save({
					completed: completed
				});
			});
		},

		sortString : function(){
			/*app.todos.comparatorString();
			app.todos.sort();
			app.todos.each(function(element, index, list){
				console.log(element);
				//this.$list.append(view.render().el);
			//}, this);
			})*/
		},

		sortCollection : function(){
			/* order, reverseOrder, date, reverseDate, */
			app.todos.comparatorCriteria = $('#orderBy').val();
			app.todos.comparatorOrderDate();
			app.todos.sort();
			app.trigger('clearViews');
			//var $list = this.$list;
			//$list.html('');
			this.addAll();
			//app.todos.each(function(element, index, list){
				//console.log(list);
				//$list.append(element.render().el);

				//this.$list.append(view.render().el);
			//}, this);
			//})
			//this.addAll();
		},

		sortCollectionCategories : function(){
			console.log('sortCollectionCategories');
			if (orderByCategories == 'none') return;
			app.todos.comparatorCriteria = $('#orderByCategories').val();//catAsc or catDesc
			app.todos.comparatorCategories();
			app.todos.sort();
			app.trigger('clearViews');
			this.addAll();
		}
	});
})(jQuery);
