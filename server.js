const express = require('express');
const app = express();
const path = require('path');
var fileUpload = require("express-fileupload");
require('dotenv').config();

const index = require('./app/routers/home/homeRouter');
const admin = require('./app/routers/admin/indexRouter');

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
//   await redisClient.connect(
//     process.env.REDIS_PORT,
//     process.env.REDIS_HOST,
//     process.env.REDIS_PASS
//   );

  app.listen(process.env.SERVER_PORT, function () {
    console.log("Node app is listening at http://localhost:%s", process.env.SERVER_PORT || 5000);
  });
})();