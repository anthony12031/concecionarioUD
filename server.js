var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dao = require('./dao');


app.use(bodyParser.json());
app.use(express.static('front-end'));
app.use(express.static('front-end/template/'));


var gestionCotizacion = require('./gestion-cotizacion');
app.use(gestionCotizacion);
var gestionVenta = require('./gestion-venta');
app.use(gestionVenta);


app.get('*', function (req, res) {
  res.sendFile(__dirname+'/front-end/index.html');
});


var port = process.env.PORT || 8282;

app.listen(port, function () {
  console.log('app listening on port '+port);
});