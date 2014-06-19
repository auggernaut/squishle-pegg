var squishle_pegg = require('./lib/squishle-pegg')
  , options = 
  			{ 
  				feed_url: "http://squishle.meteor.com/json",
				app_id: "sMSeqS1EP23z0vo3TgZKd38MBiP9qzrvnv0OHMk8",
				master_key: "C8fABMIWRZ7qZeXakTmyifANFniJXpQXHoK5QOBu"
			};

squishle_pegg.importFeeds(options, function(err, res){
	if(err) {
		console.log("Error ocurred!"+err);
		return;
	}
	if(res) 
		console.log("Importing done successfully!");
	else
		console.log("Feeds imported already.");
});