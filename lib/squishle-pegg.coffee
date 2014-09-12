http = require("http")

exports.importFeeds = (options, cb) ->
  parse_api = require("./parse-api")(options)
  http.get(options.feed_url, (res) ->
    body = ""
    res.on "data", (chunk) ->
      body += chunk
      return

    res.on "end", ->
      feeds = JSON.parse(body).sets
      handleFeed = (index) ->
        parse_api.insertCard feeds[index], (err, data) ->
          if err
            cb err
          else
            console.log index
            if index < feeds.length - 1
              handleFeed index + 1
            else
              cb null, data
      handleFeed 0

  ).on "error", (e) ->
    cb e
