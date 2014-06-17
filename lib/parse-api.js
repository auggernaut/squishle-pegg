'use strict';

var Parse = require('node-parse-api').Parse;

module.exports = function(options){
	if(!options){options={};}
	return new Module(options);
};

var Module = function(options){
	this.parse_api = new Parse(options.app_id, options.master_key);
	return this;
};

Module.prototype = {
	insertCard: function(cb){

	},
	insertChoise: function(cb){

	},
	insertCategory: function(cb){
		
	}
}