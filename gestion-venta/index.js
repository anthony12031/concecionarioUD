var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/cotizacion',function(req,res){
	sql = "SELECT idcotizacion cotizacion, cedula  FROM cotizacion";
	dao.open(sql,[],false,res);
})



module.exports = router;