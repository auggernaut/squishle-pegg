/*
 * squishle-pegg
 * https://github.com/auggernaut/squishle-pegg
 *
 * Copyright (c) 2014 Andrey Dimitrov
 */

'use strict';

var http = require('http');

exports.importFeeds = function(options, cb) {
	var parse_api = require('./parse-api')(options);
	http.get(options.feed_url, function(res) {
	    var body = '';

	    res.on('data', function(chunk) {
	        body += chunk;
	    });

	    res.on('end', function() {
	        var feeds = JSON.parse(body).sets;
	        var handleFeed = function(index){
	        	parse_api.insertCard(feeds[index], function(err, data){
	        		if(err) cb(err);
	        		else{
	        			console.log(index);
	        			if(index < 2){//feeds.length-1){
	        				handleFeed(index+1);
	        			}
	        			else{
	        				cb(null, data);
	        			}
	        		}
	        	});
	        }
	        handleFeed(0);
	    });
	}).on('error', function(e) {
	    cb(e);
	});
};