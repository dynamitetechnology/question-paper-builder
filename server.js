const express = require('express');
const app = express();
const path = require('path');
var fileUpload = require("express-fileupload");
require('dotenv').config();

const index = require('./app/routers/home/homeRouter');
const admin = require('./app/routers/admin/indexRouter');
const {redisClient} = require("./app/utils/redisClient");
// const redis = require("redis");
// const redisclient = redis.createClient();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));




app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')



app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  // useTempFiles : true,
  // tempFileDir : '/tmp/'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next){
  res.locals.base_url = req.originalUrl
  // console.log('REQ SERCER:::::::::::', req.body)
  // res.locals.path = req.path
  //  console.log('REQ SERCER:::::::::::', req.originalUrl)
  next();
})

app.use('/', index);
app.use('/admin', admin);

(async function () {
  console.clear();
  // console.log('redisClient:::::::::::', redisclient)
  // await redisclient.connect();
 redisClient.connect(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    process.env.REDIS_PASS
  ).then(result=>{
    console.log('RESULT:::::::::', result)
  });

  app.listen(process.env.SERVER_PORT, function () {
    console.log("Node app is listening at http://localhost:%s", process.env.SERVER_PORT || 5000);
  });
})();

// console.log("Connecting to the Redis");
  
// redisclient.on("ready", () => {
//     console.log("Connected!");
// });
  
// redisclient.on("error", (err) => {
//     console.log("Error in the Connection", err);
// });