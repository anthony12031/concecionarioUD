const oracle = require("oracledb");
const auth = require("./dbconfig");

oracle.outFormat = oracle.OBJECT;

function error(err,rs,cn){
	if(err){
		console.log(err.message);
		if(rs){
			rs.set('Content-Type','application/json').status(500);
			rs.send(err.message);
		}
		if(cn != null)
			close(cn);
		return -1
	}
	else
		return 0;
}

function open(sql,binds,dml,rs,callback){
	oracle.getConnection(auth,function(err,con){
		if(error(err,rs,null)==-1) return;
		con.execute(sql,binds,{autoCommit:dml},function(err,result){
			if(error(err,rs,con)==-1) return;
			//if(rs)
				//rs.set('Content-Type','application/json').status(200);
			if(dml){
				//console.log(JSON.stringify(result));
				if(rs)
				rs.send(JSON.stringify(result.rowsAffected));
				if(callback)
					callback(result);
			}
				
			else{
				//console.log(JSON.stringify(result));
				if(rs)
				rs.send(JSON.stringify(result.rows))
				if(callback)
					callback(result);
			}
			close(con)    
		})
	})
}


function close(cn){
	cn.release(function(err){
		if(err)
			console.log(err.message);
	})
}


exports.open = open;
exports.close = close;