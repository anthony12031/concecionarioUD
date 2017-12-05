var express = require('express')
var router = express.Router();
var dao = require('../dao');

var email = require('../email');


router.get('/cotizacionCredito',function(req,res){
	sql = "SELECT C.idcotizacion cotizacion,TP.nombre estado, C.cedula,C.total  FROM cotizacion C, proceso P,tipoproceso TP, (SELECT MAX(P.fecha) fecha FROM proceso P,cotizacion C WHERE P.idCotizacion = C.idCotizacion GROUP BY P.idCotizacion) reciente WHERE "+
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

router.get('/id/:idProceso/:idCotizacion',function(req,res){

	var idProceso = req.params.idProceso;	
	var idCotizacion = req.params.idCotizacion;
	sql = "SELECT idempleado  FROM proceso WHERE idProceso = '"+idProceso+"' AND idCotizacion='"+idCotizacion+"'";
	dao.open(sql,[],false,res);
})

var shortid = require('shortid');

router.post('/estado',function(req,res){
	var idProceso = shortid.generate();
	var idProcesos = shortid.generate();	
	var idEmpleado = req.body.idEmpleado;
	var idCotizacion = req.body.idCotizacion;
	var idTipoProceso = 4;
	var idTipoProcesos = 5;


	sql = "INSERT INTO proceso (idProceso,idempleado,idCotizacion,idTipoProceso,fecha) VALUES (:idProceso,:idEmpleado,:idCotizacion,:idTipoProceso,sysdate)";
	//true significa autocommit
	dao.open(sql,[idProceso,idEmpleado,idCotizacion,4],true,null);

	sql = "INSERT INTO proceso (idProceso,idempleado,idCotizacion,idTipoProceso,fecha) VALUES (:idProcesos,:idEmpleado,:idCotizacion,:idTipoProcesos,sysdate)";
	//true significa autocommit
	dao.open(sql,[idProcesos,idEmpleado,idCotizacion,5],true,null);

	res.send("Cambio Realizado");
})


module.exports = router;