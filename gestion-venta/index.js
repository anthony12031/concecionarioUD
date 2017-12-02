var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/cotizacion',function(req,res){
	sql = "SELECT idcotizacion cotizacion, cedula,total  FROM cotizacion WHERE fecha > sysdate-30";
	dao.open(sql,[],false,res);
})

router.get('/cotizacion/:idcotizacion',function(req,res){
	var cotizacion = req.params.idcotizacion;
	console.log(cotizacion);
	sql = "SELECT C.idcotizacion idCotizacion, E.nombre empleado,C.total, CL.cedula cedula, TO_CHAR(C.fecha,'dd/mm/yyyy') fecha "+
	 "FROM cotizacion C, cliente CL, empleado E WHERE C.idempleado = E.idempleado AND "+
	 "CL.cedula = C.cedula  AND C.idcotizacion ='"+cotizacion+"'";
	dao.open(sql,[],false,res);
})

router.get('/cotizaciones/cliente/:cedula',function(req,res){
	var cedula = req.params.cedula;
	console.log(cedula);
	sql = "SELECT C.idCotizacion cotizacion,C.total,TP.nombre estado,C.fecha from tipoProceso TP,proceso P, "+
	"cotizacion C WHERE C.fecha > sysdate-30 AND P.idCotizacion = C.idCotizacion AND TP.idTipoProceso = P.idTipoProceso "+
	"AND C.cedula= "+cedula;
	dao.open(sql,[],false,res);
})

router.get('/mediosPago',function(req,res){
	sql = "SELECT idMedioPago,Detalle MedioPago FROM medioPago";
	dao.open(sql,[],false,res);
})

router.get('/bancosAliados',function(req,res){
	sql = "SELECT nombre Banco,correo, telefono,direccion FROM banco";
	dao.open(sql,[],false,res);
})


module.exports = router;