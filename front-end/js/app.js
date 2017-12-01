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

	return{
		getClientes:getClientes,
		insertarCliente:insertarCliente,
		getDetalleCliente:getDetalleCliente
	}
}])


app.controller('controladorCotizacion',['$scope','Dao',function($scope,Dao){
	
	getClientes();

	$scope.ejemploInsertarCliente = function(){
		Dao.insertarCliente(323,'sdf','sdf',function(err,result){
		console.log(err);
		console.log(result);
	})
	}

	function getClientes(){
		Dao.getClientes(function(err,result){
			$scope.clientes = result;
			console.log(result);
		});
	}

	$scope.volver = function(){
		$('#seleccion-cliente').show();
		$('#detalle-cliente').hide();
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

}])


app.controller('controladorVentas',['$scope','Dao',function($scope,Dao){
		
}])