// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:time", function (req, res) {
  let isDate = moment(req.params.time, "YYYY/MM/DD", true).isValid();
  let isUnix = /^-*\d+/.test(req.params.time);
  let date = ""
  if(isUnix || isDate) date = new Date(req.params.time);
  if(isUnix) res.send({unix: req.params.time, utc: date});
  if(isDate)res.send({unix: (date.getTime() / 1000).toFixed(0), utc: date})
  if(!isUnix && !isDate) res.send({error: "Invalid date"});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
