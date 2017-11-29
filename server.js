var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use('/',express.static('front-end'));


app.get('/', function (req, res) {
  res.send('server running');
});

var port = process.env.PORT || 8282;

app.listen(port, function () {
  console.log('app listening on port '+port);
});