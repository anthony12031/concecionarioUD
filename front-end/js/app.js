var app = angular.module("concecionarioUD", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/gestionCotizacion.html"
    })
    .when("/ventas", {
        templateUrl : "pages/gestionVentas.html"
    })
    .when("/login", {
        templateUrl : "pages/login.html"
    })
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
});

app.directive('navbar',['$interval',function($interval){
	return {
		templateUrl:'pages/navbar.html',
		controller:['$scope',function($scope){
			$interval(function(){
				$scope.time = moment().format('MMMM Do YYYY, h:mm:ss a');
			},1000);
			
		}]
	}
}])

app.directive('seleccionCliente',[function(){
	return {
		templateUrl:'pages/seleccionCliente.html'
	}
}])

app.directive('detalleCliente',[function(){
	return {
		templateUrl:'pages/detalleCliente.html'
	}
}])

app.directive('seleccionAuto',[function(){
	return {
		templateUrl:'pages/seleccionAuto.html'
	}
}])

app.directive('detalleAuto',[function(){
	return {
		templateUrl:'pages/detalleAuto.html'
	}
}])
















app.directive('seleccionCotizacion',[function(){
	return {
		templateUrl:'pages/seleccionCotizacion.html'
	}
}])

app.directive('detalleCotizacion',[function(){
	return {
		templateUrl:'pages/detalleCotizacion.html'
	}
}])

app.factory("Dao",['$http',function($http){

	//metodo GET,POST,PUT,DELETE
	//datos js object
	//retorna promesa
	function hacerPeticion(metodo,url,datos){
		var req = {
		 method: metodo,
		 url: url,
		 data: datos
		}
		return $http(req);
	}

	//ejemplo peticio get usando el metodo hacerPeticion
	function getClientes(callback){
		hacerPeticion('GET','/empleados',null)
			//peticion exitosa
			//res.data contiene la respuesta
			.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function insertarCliente(id,first_name,last_name,callback){
		hacerPeticion('POST','/empleados',{id:id,first_name:first_name,last_name:last_name})
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getDetalleCliente(cedula,callback){
		hacerPeticion('GET','/empleados/'+cedula,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getAutos(callback){
		hacerPeticion('GET','/autos/',null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getDetalleAuto(idAuto,callback){
		hacerPeticion('GET','/autos/'+idAuto,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getPartesIncluidas(idAuto,callback){
		hacerPeticion('GET','/autos/partesIncluidas/'+idAuto,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}









	function getCotizaciones(callback){
		hacerPeticion('GET','/cotizacion',null)
			//peticion exitosa
			//res.data contiene la respuesta
			.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getDetalleCotizacion(idCotizacion,callback){
		hacerPeticion('GET','/cotizacion/'+ idCotizacion,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	return{
		getClientes:getClientes,
		insertarCliente:insertarCliente,
		getDetalleCliente:getDetalleCliente,
		getAutos:getAutos,
		getDetalleAuto:getDetalleAuto,
		getPartesIncluidas:getPartesIncluidas,


		getCotizaciones:getCotizaciones,
		getDetalleCotizacion:getDetalleCotizacion


	}
}])


app.controller('controladorCotizacion',['$scope','Dao',function($scope,Dao){
	
	Dao.getClientes(function(err,result){
			$scope.clientes = result;
			console.log(result);
		});

	Dao.getAutos(function(err,result){
		$scope.autos = result;
		console.log(result);
	})

	$scope.ejemploInsertarCliente = function(){
		Dao.insertarCliente(323,'sdf','sdf',function(err,result){
		console.log(err);
		console.log(result);
	})
	}

	$scope.volver = function(menu){
		if(menu == 'seleccionCliente'){
			$('#seleccion-cliente').show();
			$('#detalle-cliente').hide();
		}
		if(menu == 'seleccionAuto'){
			$('#seleccion-auto').show();
			$('#detalle-auto').hide();
		}
	}

	$scope.seleccionarCliente = function(cliente,element){
		$scope.clienteSeleccionado = cliente;
		$('.rowCliente').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCliente($scope.clienteSeleccionado.CEDULA,function(err,result){
			$scope.detalleCliente = result;
			console.log(result);
			$('#seleccion-cliente').hide();
			$('#detalle-cliente').show();
		})
	}

	$scope.seleccionarAuto = function(auto,element){
		$scope.autoSeleccionado = auto;
		$('.rowAuto').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleAuto($scope.autoSeleccionado.IDAUTO,function(err,result){
			console.log(result);
			$scope.detalleAuto = result;
			console.log(result);
			$('#seleccion-auto').hide();
			$('#detalle-auto').show();
		})
		Dao.getPartesIncluidas($scope.autoSeleccionado.IDAUTO,function(err,result){
			console.log(result);
			$scope.partesIncluidas = result;
		})
	}

}])


app.controller('controladorVentas',['$scope','Dao',function($scope,Dao){

	Dao.getCotizaciones(function(err,result){
			$scope.cotizaciones = result;
			console.log(result);
	});

	$scope.seleccionCotizacion = function(cotizacion,element){
		$scope.cotizacionSeleccionada = cotizacion;
		$('.rowCotizacion').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCotizacion($scope.cotizacionSeleccionada.idCotizacion,function(err,result){
			$scope.detalleCliente = result;
			console.log(result);
			$('#seleccion-cliente').hide();
			$('#detalle-cliente').show();
		})
	}

	$scope.seleccionarCotizacion = function(auto,element){
		$scope.cotizacionSeleccionada = auto;
		$('.rowCotizacion').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCotizacion($scope.cotizacionSeleccionada.COTIZACION,function(err,result){
			console.log(result);
			$scope.detalleCotizacion = result;			
			$('#seleccion-cotizacion').hide();
			$('#detalle-cotizacion').show();
		})		

	}

	$scope.volver2 = function(menu){
		if(menu == 'seleccionCotizacion'){
			$('#seleccion-cotizacion').show();
			$('#detalle-cotizacion').hide();
		}
		
	}	
}])