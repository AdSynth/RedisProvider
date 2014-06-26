RedisProvider
=============

DESCRIPTION

This module determines which provider to use for a redis connection based on environment variables.

Basic Logic:
If REDISTOGO_URL is present, use redis to go,
Else if AWS_ELASTICACHE_REPLICATION_GROUP_ID is present, use AWS elasticache,
Else use localhost

Also includes a ligthweight custom logging module that allows logging level configuration based on LOGGING_LEVEL.

----------------------
ENVIRONMENT VARIABLES

LOGGING_LEVEL
  default = 'info'
  ['debug', 'info', 'warn', 'error']
  The lowest level of logging you want to see.
  
REDISTOGO_URL
  no default
  format = regis://redistogo:authentication_string?@dory.redistogo.com:port_number/
  Presence tells the application to use redis to go as the redis provider

AWS_ELASTICACHE_REPLICATION_GROUP_ID
  no default
  Presence tells the application to use AWS elasticache as the redis provider unless REDISTOGO_URL is present.
  If neither is present, localhost is used.

AWS_ACCESS_KEY_ID
  no default
  Can be used to make a connection to AWS if code is run from non-EC2 instance
  (see http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
  
AWS_SECRET_ACCESS_KEY
  no default
  Can be used to make a connection to AWS if code is run from non-EC2 instance
  (see http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)
