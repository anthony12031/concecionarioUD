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

router.get('/autos/:idAuto',function(req,res){
	var idAuto = req.params.idAuto;
	sql = "SELECT A.nombre auto,TC.detalle caracteristica,C.detalle detalle FROM tipoCaracteristica TC,"+
	"caracteristica C,auto A,autoCara AC WHERE TC.idTipoCrc = C.idTipoCrc AND AC.idAuto = A.idAuto AND "+
	"AC.idCrt = C.idCrt AND A.idAuto = "+idAuto;
	dao.open(sql,[],false,res);
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