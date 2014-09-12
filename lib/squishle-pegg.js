(function() {
  var http;

  http = require("http");

  exports.importFeeds = function(options, cb) {
    var parse_api;
    parse_api = require("./parse-api")(options);
    return http.get(options.feed_url, function(res) {
      var body;
      body = "";
      res.on("data", function(chunk) {
        body += chunk;
      });
      return res.on("end", function() {
        var feeds, handleFeed;
        feeds = JSON.parse(body).sets;
        handleFeed = function(index) {
          return parse_api.insertCard(feeds[index], function(err, data) {
            if (err) {
              return cb(err);
            } else {
              console.log(index);
              if (index < feeds.length - 1) {
                return handleFeed(index + 1);
              } else {
                return cb(null, data);
              }
            }
          });
        };
        return handleFeed(0);
      });
    }).on("error", function(e) {
      return cb(e);
    });
  };

}).call(this);
