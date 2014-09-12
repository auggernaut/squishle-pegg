squishle_pegg = require("./lib/squishle-pegg")
options =
  feed_url: "http://squishle.meteor.com/json"
  app_id: "tR8QqYHsxTCrfuBwZKlBEVgrOcvGBQYoLkrxy0LK"
  master_key: "hUpcwPRMXqs7srkb8ayu0QKJ4G5Aw89gUGqM8GSs"

squishle_pegg.importFeeds options, (err, res) ->
  if err
    console.log "Error occurred!" + err
  if res
    console.log "Importing done successfully!" + res
  else
    console.log "Feeds imported already."
