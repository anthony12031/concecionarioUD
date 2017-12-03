var express = require('express')
var router = express.Router();
var dao = require('../dao');
var shortid = require('shortid');

var email = require('../email');

router.get('/cotizacion',function(req,res){
	sql = "SELECT C.idcotizacion cotizacion, C.cedula,C.total,TP.nombre estado  FROM "+
	"cotizacion C , proceso P,tipoProceso TP  WHERE C.fecha > sysdate-30 AND "+
	"P.idCotizacion = C.idCotizacion AND P.idTipoProceso = 1 AND TP.idTipoProceso = P.idTipoProceso";
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
		var sql = "INSERT INTO acuerdoPago (idCotizacion,idAcuerdo,idMedioPago,valor,porcentaje) "+
		"VALUES(:idCotizacion,:idAcuerdo,:idMedioPago,:valor,:porcentaje)";
		dao.open(sql,[cotizacion.COTIZACION,idAcuerdo,acuerdo.medioPago.IDMEDIOPAGO,acuerdo.valor,30],true,null);
	}
	for(var key in acuerdos70){
		var acuerdo = acuerdos70[key];
		var idDetalleCotizacion = shortid.generate();
		var idAcuerdo = shortid.generate();
		if(acuerdo.medioPago.IDMEDIOPAGO == 502){
			haySolicitudCredito = true;
		}
		var sql = "INSERT INTO acuerdoPago (idCotizacion,idAcuerdo,idMedioPago,valor,porcentaje) "+
		"VALUES(:idCotizacion,:idAcuerdo,:idMedioPago,:valor,:porcentaje)";
		dao.open(sql,[cotizacion.COTIZACION,idAcuerdo,acuerdo.medioPago.IDMEDIOPAGO,acuerdo.valor,70],true,null);
	}
	console.log("hay Solicitud de credito ?: "+haySolicitudCredito);
	var idAcuerdoPago= 3;
	var idEstudioCredito= 2;
	var idProceso = shortid.generate();
	//insertar registro en proceso
	if(haySolicitudCredito){
		console.log("hay solicitud de credito");
		//var sql = "UPDATE proceso SET idTipoProceso = :idProceso WHERE idCotizacion=:idCotizacion AND idProceso= "+
		//"(SELECT idProceso from proceso)"
		//dao.open(sql,[idEstudioCredito,cotizacion.COTIZACION],true,null);
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

router.get('/cotizaciones/separarAuto/cliente/:cedula',function(req,res){
	var cedula = req.params.cedula;
	var idAcuerdoPago = 3;
	var idAcuerdoPagoCredito = 5;
	var sql = "SELECT C.idCotizacion idCotizacion,TP.nombre estado,C.cedula cliente,C.total total FROM cotizacion C,proceso P,tipoProceso TP WHERE "+
	"P.idCotizacion = C.idCotizacion AND TP.idTipoProceso = P.idTipoProceso AND (TP.idTipoProceso = 3 OR TP.idTipoProceso = 5) AND "+
	"C.cedula="+cedula;
	dao.open(sql,[],false,res);
})

router.get('/acuerdosPago/:idCotizacion',function(req,res){
	var idCotizacion = req.params.idCotizacion;
	var sql = "SELECT A.idCotizacion, A.idAcuerdo, A.idMedioPago,MP.detalle medioPago,A.valor FROM acuerdoPago A,medioPago MP WHERE MP.idMedioPago = A.idMedioPago AND porcentaje = 30 AND idCotizacion = '"
	+idCotizacion+"'"; 
	dao.open(sql,[],false,res);
})

router.post('/acuerdos/modificar',function(req,res){
	var acuerdos = req.body.acuerdos;
	var idEmpleado = req.body.idEmpleado;
	var idCotizacion = req.body.idCotizacion;
	console.log("registrar factura");
	
	
	var idFactura = shortid.generate();
	var sql = "INSERT INTO factura (idFactura,idCotizacion,idEmpleado,idTipoFactura,fecha) "+
			"VALUES(:idFactura,:idCotizacion,:idEmpleado,:idTipoFactura,sysdate)";
	
	dao.open(sql,[idFactura,idCotizacion,idEmpleado,1],true,null,function(result){
		acuerdos.forEach(function(acuerdo){
		if(acuerdo.CANCELADO){
			var idDetalleFactura = shortid.generate();
			var sql = "INSERT INTO detalleFactura(idFactura,idDetalleFactura,idCotizacion,idAcuerdo) "+
			"VALUES(:idFactura,:idDetalleFactura,:idCotizacion,:idAcuerdo)";
			dao.open(sql,[idFactura,idDetalleFactura,idCotizacion,acuerdo.IDACUERDO],true,null);
		}
	})
	});

	

	res.send("factura");
})

module.exports = router;