var url     = require('url');
var logger  = require('./logger.js');

if (process.env.AWS_ELASTICACHE_REPLICATION_GROUP_ID) {
    var AWS = require('./aws.js');
}

function getRedisURL(callback) {
  var redisUrl;
  // if REDISTOGO_URL is present, use that
  if(process.env.REDISTOGO_URL){
    logger.log("info", "redis provider = redis to go");
    redisUrl = url.parse(process.env.REDISTOGO_URL);
    callback(null, redisUrl);
  } 
  // if AWS_ELASTICACHE_REPLICATION_GROUP_ID is present, use it
  else if (process.env.AWS_ELASTICACHE_REPLICATION_GROUP_ID) {
    logger.log("info", "redis provider =  AWS elasticache");
    var writeEndpoint = null;
    AWS.refreshElasticacheAddresses(function(err, result){
      if (err) return callback(err);
      writeEndpoint = result.primaryEndpoint;
      // logger.log("debug", "writeEndpoint = ");
      // logger.log("debug", writeEndpoint);
      redisUrl = "http://" + writeEndpoint.Address + ":" + writeEndpoint.Port;
      callback(null, redisUrl);
    });
  }
  else {
    // otherwise use localhost
    logger.log("info", "redis provider = localhost");
    redisUrl = "redis://localhost:6379/";
    callback(null, redisUrl);
  }
};

module.exports = {
  "getRedisURL": getRedisURL
};