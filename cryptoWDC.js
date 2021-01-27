(function () {
	// Create the connector object
    var myConnector = tableau.makeConnector();
	
	// Define the schema
    myConnector.getSchema = function (schemaCallback) {
		var cols = [{
            id: "time",
			alias: "closing_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "high",
            alias: "highest_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "low",
            alias: "lowest_price",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "open",
			alias: "opening_price",
            dataType: tableau.dataTypeEnum.float
		}, {
            id: "volumefrom",
			alias: "volume_btc",
            dataType: tableau.dataTypeEnum.float
		},
			{
            id: "volumeto",
			alias: "volume_currency",
            dataType: tableau.dataTypeEnum.float	
		}, {
            id: "close",
			alias: "closing_price",
            dataType: tableau.dataTypeEnum.float
		}];

        var tableSchema = {
            id: "cryptoFeed",
            alias: "Crypto data from API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
		$.getJSON("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&allData=true", function(resp) {
			var feat = resp.Data,
                tableData = [];
		
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "time": feat[i].time,
                    "high": feat[i].high,
                    "low": feat[i].low,
					"open": feat[i].open,
                    "volumefrom": feat[i].volumefrom,
					"volumeto": feat[i].volumeto,
					"close": feat[i].close
				});
            }
	
            table.appendRows(tableData);
            doneCallback();
        });

    };

    tableau.registerConnector(myConnector);
	

	// Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "cryptoFeed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
