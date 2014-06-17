var squishle_pegg = require('./lib/squishle-pegg')
  , options = 
  			{ 
  				feed_url: "http://squishle.meteor.com/json",
				app_id: "sMSeqS1EP23z0vo3TgZKd38MBiP9qzrvnv0OHMk8",
				master_key: "C8fABMIWRZ7qZeXakTmyifANFniJXpQXHoK5QOBu"
			};

squishle_pegg.importFeed(options, function(err, res){
	if(err) {
		console.log("error ocurred!"+err);
		return;
	}
	console.log("Importing done successfully!");
});