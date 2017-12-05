var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/empleados',function(req,res){
	sql = "SELECT nombre ||' '||apellido nombre, cedula  FROM cliente";
	dao.open(sql,[],false,res);
})

router.get('/empleados/:cedula',function(req,res){
	var cedula = req.params.cedula;
	sql = "SELECT TC.nombreTipoContacto tipoContacto,CON.contacto "+
	 "FROM contacto CON,cliente C,tipoContacto TC WHERE C.cedula = CON.cedula AND "+
	 "TC.idTipoContacto = CON.idTipoContacto  AND C.cedula = "+cedula;
	dao.open(sql,[],false,res);
})


router.get('/autos',function(req,res){
	sql = "SELECT idAuto, nombre FROM auto";
	dao.open(sql,[],false,res);
})

router.get('/autos/accesorios',function(req,res){
	sql = "SELECT P.nombre parte,PH.precio FROM(SELECT P.nombre parte, MAX(PH.fecha) "+
	"fecha from historicoPrecioParte PH,parte P,tipoParte TP WHERE  PH.idParte = P.idParte "+
	"AND TP.idTipoParte=3 AND P.idTipoParte = TP.idTipoParte GROUP BY  P.nombre) reciente,"+
	"historicoPrecioParte PH,parte P WHERE PH.fecha = reciente.fecha AND P.nombre = reciente.parte "+
	"AND PH.idparte = P.idparte"
	dao.open(sql,[],false,res);
})

router.get('/autos/:idAuto',function(req,res){
	var idAuto = req.params.idAuto;
	sql = "SELECT A.nombre auto,TC.detalle caracteristica,C.detalle detalle FROM tipoCaracteristica TC,"+
	"caracteristica C,auto A,autoCara AC WHERE TC.idTipoCrc = C.idTipoCrc AND AC.idAuto = A.idAuto AND "+
	"AC.idCrt = C.idCrt AND A.idAuto = "+idAuto;
	dao.open(sql,[],false,res);
})

router.get('/autos/partesIncluidas/:idAuto',function(req,res){
	var idAuto = req.params.idAuto;
	sql = "SELECT DISTINCT P.idParte, P.nombre parte, 0 precio,PA.cantidad, 0 subtotal FROM "+
	"(SELECT P.nombre parte, MAX(PH.fecha) fecha "+
"from historicoPrecioParte PH,parte P,auto A,parteAuto PA WHERE PA.idAuto = A.idAuto AND PA.idParte = "+
"P.idParte AND PH.idParte = P.idParte AND A.idAuto="+idAuto+" GROUP BY A.nombre, P.nombre) reciente, parte P,"+
"historicoprecioparte PH,auto A,parteauto PA WHERE A.idAuto=PA.idAuto AND P.idParte = PA.idParte AND P.idparte = "+
"PH.idparte AND reciente.fecha = PH.fecha AND reciente.parte = p.nombre";
	dao.open(sql,[],false,res);
})

router.get('/autos/precio/:idAuto',function(req,res){
var idAuto = req.params.idAuto;
sql= "SELECT A.idAuto ,PH.idHistPrecioAuto, PH.precio FROM (SELECT A.idAuto idAuto,MAX(PH.fecha) "+
"fecha FROM auto A,historicoPrecioAuto PH WHERE PH.idAuto=A.idAuto GROUP BY A.idAuto, A.nombre) reciente,"+
"historicoPrecioAuto PH,auto A WHERE PH.fecha = reciente.fecha AND PH.idAuto = reciente.idAuto AND PH.idAuto "+
"= A.idAuto AND A.idAuto ="+ idAuto;
dao.open(sql,[],false,res);
})

var shortid = require('shortid');
 
router.post('/cotizaciones',function(req,res){

	var idCotizacion = shortid.generate();
	var idHistPrecioAuto = req.body.idHistPrecioAuto;
	var idAuto = req.body.idAuto;
	var cedula = req.body.cedula;
	var idEmpleado = req.body.idEmpleado;
	var total = req.body.total;

	console.log(total)
	var detallesCotizacion = req.body.detallesCotizacion;
	//insertar registro de la cotizacion
	sql = "INSERT INTO cotizacion (idCotizacion,idEmpleado,cedula,idAuto,idHistPrecioAuto,total,fecha) VALUES "+
	"(:idCotizacion,:idEmpleado,:cedula,:idAuto,:idHistPrecioAuto,:total,sysdate)";
	dao.open(sql,[idCotizacion,idEmpleado,cedula,idAuto,idHistPrecioAuto,total],true,null,function(result){
		//console.log(detallesCotizacion)
		//insertar detalles cotizacion
		detallesCotizacion.forEach(function(detalle){
			sql = "INSERT INTO detalleCotizacion (idCotizacion,numDetalleCotizacion,idParte,cantidad,subtotal,precio_unitario) "+
		"VALUES (:idCotizacion,:numDetalleCotizacion,:idParte,:cantidad,:subtotal,:precio_unitario)";
		var numDetalleCotizacion = shortid.generate();
		dao.open(sql,[idCotizacion,numDetalleCotizacion,detalle.IDPARTE,detalle.CANTIDAD,detalle.SUBTOTAL,detalle.PRECIO],true,null);
		})

		var idProceso = shortid.generate();
		//insertar registro en la tabla proceso
		sql = "INSERT INTO proceso(idProceso,idEmpleado,idCotizacion,idTipoProceso,fecha) VALUES "+
		"(:idProceso,:idEmpleado,:idCotizacion,:idTipoProceso,sysdate)";
		//tipo Proceso 1 es cotizacion;
		dao.open(sql,[idProceso,idEmpleado,idCotizacion,1],true,null);
		res.send("cotizacion registrada");
	});

	//hacer commit
			dao.getConexion()
				.then(function(con){
					con.commit();
					dao.close(con);
				})
})


//ejemplo insertar cliente
router.post('/empleados',function(req,res){
	console.log("post req");
	var id = req.body.id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	sql = "INSERT INTO s_emp (id,first_name,last_name) VALUES (:id,:first_name,:last_name)";
	//true significa autocommit
	dao.open(sql,[id,first_name,last_name],true,res);
})


module.exports = router;