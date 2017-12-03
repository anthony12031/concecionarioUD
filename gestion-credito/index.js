var express = require('express')
var router = express.Router();
var dao = require('../dao');

var email = require('../email');

router.get('/cotizacionCredito',function(req,res){
	sql = "SELECT C.idcotizacion cotizacion,TP.nombre estado, C.cedula,C.total  FROM cotizacion C, proceso P,tipoproceso TP, (SELECT MAX(P.fecha) fecha FROM proceso P,cotizacion C WHERE P.idCotizacion = C.idCotizacion) reciente WHERE "+
	"TP.idTipoProceso = P.idTipoProceso AND	 C.idCotizacion = P.idcotizacion AND P.idTipoProceso = 2 AND p.fecha = reciente.fecha"; //2 = Estudio credito
	dao.open(sql,[],false,res);
})

router.get('/cotizacionCredito/:idcotizacion',function(req,res){
	var cotizacion = req.params.idcotizacion;
	console.log(cotizacion);	
	sql = "SELECT P.idProceso Proceso, C.idcotizacion idCotizacion, CL.cedula cedula, E.nombre empleado,C.total, TO_CHAR(P.fecha,'dd/mm/yyyy') fecha_Proceso "+
	 "FROM cotizacion C, cliente CL, empleado E, proceso P, tipoproceso TP WHERE P.idempleado = E.idempleado AND "+
	 "CL.cedula = C.cedula  AND C.idcotizacion ='"+cotizacion+"' AND P.idcotizacion = C.idcotizacion AND P.idTipoProceso = TP.idTipoProceso AND TP.idTipoProceso=2";
	dao.open(sql,[],false,res);
})

router.get('/cotizacionesCredito/cliente/:cedula',function(req,res){
	var cedula = req.params.cedula;
	console.log(cedula);
	sql = "SELECT C.idcotizacion cotizacion, C.cedula,C.total  FROM cotizacion C, proceso P,(SELECT MAX(P.fecha) fecha FROM proceso P,cotizacion C WHERE P.idCotizacion = C.idCotizacion) reciente WHERE P.fecha = reciente.fecha AND C.idCotizacion = P.idcotizacion AND P.idTipoProceso = 2 AND C.cedula= "+cedula;
	dao.open(sql,[],false,res);
})


router.get('/credito/:idProceso',function(req,res){
	var proceso = req.params.idProceso;
	console.log(proceso);

	sql = "SELECT P.idProceso Proceso, TO_CHAR(P.fecha,'dd/mm/yyyy') fecha_Proceso, TP.nombre Estado "+
	 "FROM proceso P, tipoproceso TP WHERE "+
	 "P.idProceso ='"+proceso+"' AND P.idTipoProceso = TP.idTipoProceso";
	dao.open(sql,[],false,res);
})

router.put('/estado',function(req,res){
	console.log("put req");
	var idproceso = req.body.idproceso;	
	console.log(idproceso);
	sql = "UPDATE proceso SET idtipoProceso = 4, fecha = sysdate WHERE idproceso = '"+idproceso+"'";
	//true significa autocommit
	dao.open(sql,[],true,res);
})


module.exports = router;