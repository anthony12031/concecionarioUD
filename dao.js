const oracle = require("oracledb");
const auth = require("./dbconfig");


function error(err,rs,cn){
	if(err){
		console.log(err.message);
		rs.contenType('application/json').status(500);
		rs.send(err.message);
		if(cn != null)
			close(cn);
		return -1
	}
	else
		return 0;

}

function open(sql,binds,dml,rs){
	oracle.getConnection(auth,function(err,con){
		if(error(err,rs,null)==-1) return;
		cn.execute(sql,binds,{autoCommit:dml},function(err,result){
			if(error(err,rs,cn)==-1) return;
			rs.contenType("application/json").status(200);
			if(dml)
				rs.send(JSON.stringify(result.rowsAffected));
			else{
				console.log(result.metadata);
				rs.send(JSON.stringify(result.rows))
			}
			close(cn)    
		})
	})
}


function close(cn){
	cn.release(function(err){
		if(err)
			console.log(err.message);
	})
}


exports.open = open
exports.close = close