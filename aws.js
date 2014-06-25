var AWS 	= require('aws-sdk');
var logger  = require('./logger.js');

AWS.config.update({region: 'us-east-1'});

AWS.config.getCredentials(function(err) {
  if (err) logger.log("error", err.stack); // credentials not loaded
});

var elasticache = new AWS.ElastiCache();

var refreshElasticacheAddresses = function(callback){
	var params = {
	  // Marker: 'STRING_VALUE',
	  // MaxRecords: 0,
	  ReplicationGroupId: process.env.AWS_ELASTICACHE_REPLICATION_GROUP_ID
	};
	var result 			= {};
	var primaryEndpoint = {};
	var readEndpoints 	= [];

	elasticache.describeReplicationGroups(params, function(err, data) {
		if (err) {
	  		logger.log('error', err); // an error occurred
	  		logger.log('error', err.stack);
	  		callback(err);
		}
		else{
			// successful response
			// console.log("data = " + JSON.stringify(data, null, 4)); 

			var nodeGroup = data.ReplicationGroups[0].NodeGroups[0];

		  	primaryEndpoint = nodeGroup.PrimaryEndpoint

		  	var members = nodeGroup.NodeGroupMembers
		  	for (var i = 0; i < members.length; i++) {
		  		var read = {};
		  		read = members[i].ReadEndpoint;
		  		readEndpoints.push(read);
		  	};

		  	// logger.log("debug", "primary endpoint = " + JSON.stringify(primaryEndpoint, null, 4));
		  	// logger.log("debug", "read endpoints   = " + JSON.stringify(readEndpoints, null, 4));

		  	var result = {
		  		"primaryEndpoint": primaryEndpoint,
		  		"readEndpoints": readEndpoints
		  	};

		  	callback(null, result);
		} 
	});
}

exports.refreshElasticacheAddresses = refreshElasticacheAddresses;

