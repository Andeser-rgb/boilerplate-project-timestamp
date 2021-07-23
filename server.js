// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
  let isDate = Date.parse(req.params.time) != NaN;
  let isUnix = /^-*\d+/.test(req.params.time);
  if(isUnix) res.send({unix: req.params.time, utc: new Date(req.params.time).toUTCString()});
  else res.send({unix: (new Date(req.params.time).getTime() / 1000).toFixed(0), utc: new Date(req.params.time).toUTCString()})
  if(!isUnix && !isDate) res.send({error: "Invalid date"});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
