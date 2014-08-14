var squishle_pegg = require('./lib/squishle-pegg')
  , options =
  {
    feed_url: "http://squishle.meteor.com/json",
    app_id: "zogf8qxK4ULBBRBn2EhYWwddyUczTDks9w56mNsr",
    master_key: "3ykoKuRAKk7zEBs4xejIfUqDmIxpOtaI5wyMH10R"
  };

squishle_pegg.importFeeds(options, function (err, res) {
  if (err) {
    console.log("Error ocurred!" + err);
    return;
  }
  if (res)
    console.log("Importing done successfully!" + res);
  else
    console.log("Feeds imported already.");
});
