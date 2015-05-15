/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

var wholeThing;

$(function () {
	'use strict';

	$('#datepicker').val(moment().format('YYYY-MM-DD'));

	// kick things off by creating the `App`
	wholeThing = new app.AppView();
});
