'use strict';

var Parse = require('node-parse-api').Parse;

module.exports = function(options){
	if(!options){options={};}
	return new Module(options);
};

var Module = function(options){
	this.app = new Parse(options.app_id, options.master_key);
	return this;
};

Module.prototype = {
	isCardsImported: function(cb){
		this.app.find('Card', '', function (err, res) {
		  	if(err) cb(err);
		  	else{
		  		cb(null, (res.results.length > 0) );
		  	}
		});
	},
	insertCard: function(doc, cb){
		var _self = this;
		this.app.insert('Card', {question: doc.title, squishleId: doc.guid}, function(err, data){
			if(err) cb(err);
			else{
				handleChoice(data.objectId, doc, 1);
			}
		});
		function handleChoice(cardId, doc, index){
			_self._insertChoice(cardId, doc, index, function(err, data){
				if(err) cb(err);
    			else{
					if(index < 5){
						handleChoice(cardId, doc, index+1);
					}
					else{
						handleCategory(cardId, doc, 0);
					}
				}
			});
		}
		function handleCategory(cardId, doc, index){
			var categories = doc.categories;
			if(categories.length > 0){
				_self._insertCategory(categories[index], function(err, categoryId){
					if(err) cb(err);
	    			else{
	    				_self._insertCardCategory(cardId, categoryId, function(err, data){
	    					if(err) cb(err);
	    					else{
	    						if(index < categories.length - 1){
									handleCategory(cardId, doc, index+1);
								}
								else{
									cb(null, true);
								}
	    					}
	    				});
					}
				});
			}
			else{
				cb(null, true);
			}
		}
	},
	_insertChoice: function(cardId, doc, index, cb){
		this.app.insert('Choice', {cardId: cardId, image: doc['image'+index], text: doc['caption'+index]}, function(err, data){
			if(err) cb(err);
			else{
				cb(null, data);
			}
		});
	},
	_insertCategory: function(cat, cb){
		var _self = this;
		this.app.find('Category', {iconUrl: cat._id}, function (err, res) {
		  	if(err) cb(err);
		  	else{
		  		if (res.results.length > 0){
		  			cb(null, res.results[0].objectId);		  			
		  		}
		  		else{
		  			_self.app.insert('Category', {iconUrl: cat._id, name: cat.name}, function(err, data){
						if(err) cb(err);
						else{
							cb(null, data.objectId);
						}
					});
		  		}
		  	}
		});
	},
	_insertCardCategory: function(cardId, categoryId, cb){
		this.app.insert('CardCategory', {cardId: cardId, categoryId: categoryId}, function(err, data){
			if(err) cb(err);
			else{
				cb(null, data);
			}
		});
	}
}