(function() {
  var options, squishle_pegg;

  squishle_pegg = require("./lib/squishle-pegg");

  options = {
    feed_url: "http://squishle.meteor.com/json",
    app_id: "0Scez33hVDjKMnNBxj8cGBN8sdjiRNxQmEWT3jH4",
    master_key: "F5UWvKDHlZgTEW2hAzzucvkKsfV5dPt5H9cEyADQ"
  };

  squishle_pegg.importFeeds(options, function(err, res) {
    if (err) {
      console.log("Error occurred!" + err);
    }
    if (res) {
      return console.log("Importing done successfully!" + res);
    } else {
      return console.log("Feeds imported already.");
    }
  });

}).call(this);
