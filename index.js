// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  const dateToday = new Date();
  res.json({ unix: dateToday.getTime(), utc: dateToday.toUTCString() })
})

app.get("/api/:date", (req, res) => {
  const dateRequest = req.params.date;
  let dateResponse = new Date(dateRequest);
  dateResponse = dateResponse.toString() === "Invalid Date" ? new Date(Number(dateRequest)) : dateResponse;
  if (dateResponse.toString() === "Invalid Date") res.json({ error: dateResponse.toString() })
  else res.json({ unix: dateResponse.getTime(), utc: dateResponse.toUTCString() })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
