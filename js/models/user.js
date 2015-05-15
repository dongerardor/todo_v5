//// USER  ////
/// individual user: js/models/user.js ///

var app = app || {};

(function(){
	'use strict';

	app.User = Backbone.Model.extend({

		initialize : function(){
			this.attributes.cid = this.cid;
		},

		defaults: {
			name : 'usuario'
		}
	});

})();