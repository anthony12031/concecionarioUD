var express = require('express')
var router = express.Router();
var dao = require('../dao');

router.get('/empleados',function(req,res){
	sql = "SELECT first_name||' '||last_name nombre,id FROM s_emp";
	dao.open(sql,[],false,res);
})


module.exports = router;