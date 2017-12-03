var express = require('express')
var router = express.Router();
var dao = require('../dao');
var shortid = require('shortid');

var email = require('../email');

router.get('/cotizacion',function(req,res){
	sql = "SELECT idcotizacion cotizacion, cedula,total  FROM cotizacion WHERE fecha > sysdate-30";
	dao.open(sql,[],false,res);
})

router.post('/email',function(req,res){
	console.log('enviar email');
	var datos = req.body;
	console.log(datos);
	email(datos);
	res.send("solicitud enviada");
})

router.post('/acuerdos',function(req,res){
	var acuerdos = req.body;
	console.log(acuerdos);
	var acuerdos30 = acuerdos['30'];
	var acuerdos70 = acuerdos['70'];
	var cotizacion= acuerdos.cotizacion;
	var empleado = acuerdos.empleado;

	var haySolicitudCredito = false;

	for(var key in acuerdos30){
		var acuerdo = acuerdos30[key];
		var idAcuerdo = shortid.generate();
		if(acuerdo.medioPago.IDMEDIOPAGO == 502){
			haySolicitudCredito = true;
		}
		var sql = "INSERT INTO acuerdoPago (idCotizacion,idAcuerdo,idMedioPago,valor) "+
		"VALUES(:idCotizacion,:idAcuerdo,:idMedioPago,:valor)";
		dao.open(sql,[cotizacion.COTIZACION,idAcuerdo,acuerdo.medioPago.IDMEDIOPAGO,acuerdo.valor],true,null);
	}
	for(var key in acuerdos70){
		var acuerdo = acuerdos70[key];
		var idDetalleCotizacion = shortid.generate();
		var idAcuerdo = shortid.generate();
		if(acuerdo.medioPago.IDMEDIOPAGO == 502){
			haySolicitudCredito = true;
		}
		var sql = "INSERT INTO acuerdoPago (idCotizacion,idAcuerdo,idMedioPago,valor) "+
		"VALUES(:idCotizacion,:idAcuerdo,:idMedioPago,:valor)";
		dao.open(sql,[cotizacion.COTIZACION,idAcuerdo,acuerdo.medioPago.IDMEDIOPAGO,acuerdo.valor],true,null);
	}
	console.log("hay Solicitud de credito ?: "+haySolicitudCredito);
	var idAcuerdoPago= 3;
	var idEstudioCredito= 2;
	var idProceso = shortid.generate();
	//insertar registro en proceso
	if(haySolicitudCredito){
		console.log("hay solicitud de credito");
		var sql = "INSERT INTO proceso(idProceso,idEmpleado,idCotizacion,idTipoProceso,fecha) "+
		"VALUES (:idProceso,:idEmpleado,:idCotizacion,:idTipoProceso,sysdate)";
		dao.open(sql,[idProceso,empleado.idEmpleado,cotizacion.COTIZACION,idEstudioCredito],true,null);
	}
	else{
		console.log("NO hay solicitud de credito");
		var sql = "INSERT INTO proceso(idProceso,idEmpleado,idCotizacion,idTipoProceso,fecha) "+
		"VALUES (:idProceso,:idEmpleado,:idCotizacion,:idTipoProceso,sysdate)";
		dao.open(sql,[idProceso,empleado.idEmpleado,cotizacion.COTIZACION,idAcuerdoPago],true,null);
	}
	
	res.send("acuerdos");
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