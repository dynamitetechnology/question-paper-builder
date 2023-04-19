var express = require('express');
var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis');//(session);
var parser = require('body-parser');
var RedisClient= redis.createClient();

var app = express();

app.use(session({
    secret: 'mysecret',
    //store: new redisStore({client: RedisClient,ttl : 260}),
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
}));

RedisClient.on('error', function(err) {
    console.log('Redis error: ' + err);
});

RedisClient.on("ready",function () {
    console.log("Redis is ready");
});