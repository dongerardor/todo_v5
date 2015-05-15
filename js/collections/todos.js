/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Backbone.LocalStorage('todos-backbone3'),

		// Filter down the list of all todo items that are finished.
		completed: function () {
			return this.where({completed: true});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {
			return this.where({completed: false});
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			var numOrder = this.length ? this.last().get('order') + 1 : 1;
			return numOrder;
		},

		// Todos are sorted by their original insertion order.
		//comparator: 'order',
		comparatorCriteria : 'order',

		comparator : 'order',

		// Assumption: You have a model with a name. 
 		comparatorString : function(){
  			this.comparator = function (model) {
				
  				if (model.get("title")) {
  			    	var str = model.get("title");
  			    	str = str.toLowerCase();
  			    	str = str.split("");
  			    	str = _.map(str, function(letter) { 
  			    		return String.fromCharCode(-(letter.charCodeAt(0)));
  			    	});
  			    	return str;
  			  	};
  			}
  		},

		comparatorOrderDate : function(){
			
			var comparatorCriteria = this.comparatorCriteria;

			this.comparator = function(model){

				var comparatorValue = 0;
				if(this.comparatorCriteria == 'order'){
					comparatorValue = model.get('order');
				}else if (this.comparatorCriteria == 'reverseOrder'){
					comparatorValue = -model.get('order');
				}else if(this.comparatorCriteria == 'date'){
					comparatorValue = model.get('date');
				}else if(this.comparatorCriteria == 'reverseDate'){
					comparatorValue = -model.get('date');
				}
				return comparatorValue;
			}
		},

		comparatorCategories : function(){
			var comparatorCriteria = this.comparatorCriteria;

			this.comparator = function(modelA, modelB){
				var comparatorCriteria = this.comparatorCriteria;
				var getSortValue = function(category){
					var sortValue = '';
					switch (category){
						case 'urgente':
							sortValue = 3;
							break;
						case 'importante':
							sortValue = 2;
							break;
						default:
							sortValue = 1;
							break;
					}
					return (comparatorCriteria == 'catAsc' ? sortValue : -sortValue);
				}
				var modelA_sortValue = getSortValue(modelA.get('category'));
				var modelB_sortValue = getSortValue(modelB.get('category'));
				var comparatorValue = 0;
				if (modelA_sortValue > modelB_sortValue) comparatorValue = -1; // before
				if (modelB_sortValue > modelA_sortValue) comparatorValue = 1; // after
				return comparatorValue; // equal*/
			}
		}
	});

	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();