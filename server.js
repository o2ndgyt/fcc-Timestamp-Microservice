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

;
  
// your first API endpoint... 
app.get("/api/timestamp", function (req, res) {
  res.json({unix:Date.now(),utc:(new Date()).toUTCString()});
});

app.get("/api/timestamp/:date", function (req, res) {
    let d=new Date();
    // Unix timestamp always 13 numbers
    if (req.params.date.length==13)
    {
      d=new Date(parseInt(req.params.date))
      res.json({unix:d.getTime(),utc:d.toUTCString()});
    }
    else if (Date.parse(req.params.date))
    {
      d=new Date(req.params.date);
      res.json({unix:d.getTime(),utc:d.toUTCString()});
    }
    else
    {
      res.json({ error : "Invalid Date" });  
    }
    
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
