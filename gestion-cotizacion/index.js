var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/empleados',function(req,res){
	sql = "SELECT first_name||' '||last_name nombre,id FROM s_emp";
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