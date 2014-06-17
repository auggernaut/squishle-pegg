/*
 * squishle-pegg
 * https://github.com/auggernaut/squishle-pegg
 *
 * Copyright (c) 2014 Andrey Dimitrov
 */

'use strict';

var http = require('http');

exports.importFeed = function(options, cb) {
	http.get(options.feed_url, function(res) {
	    var body = '';

	    res.on('data', function(chunk) {
	        body += chunk;
	    });

	    res.on('end', function() {
	        var data = JSON.parse(body)
	        cb(null, data);
	    });
	}).on('error', function(e) {
	      cb(e);
	});
};