var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/cotizacion',function(req,res){
	sql = "SELECT idcotizacion cotizacion, cedula  FROM cotizacion";
	dao.open(sql,[],false,res);
})

router.get('/cotizacion/:idcotizacion',function(req,res){
	var cotizacion = req.params.idcotizacion;
	sql = "SELECT C.idcotizacion idCotizacion, E.nombre empleado, CL.cedula cedula, TO_CHAR(C.fecha,'dd/mm/yyyy') fecha "+
	 "FROM cotizacion C, cliente CL, empleado E WHERE C.idempleado = E.idempleado AND "+
	 "CL.cedula = C.cedula   AND C.idcotizacion ="+cotizacion;
	dao.open(sql,[],false,res);
})


module.exports = router;