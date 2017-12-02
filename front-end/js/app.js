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

	function getAccesorios(callback){
		hacerPeticion('GET','/autos/accesorios/',null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}
	function agregarAccesorio(accesorio,callback){
		hacerPeticion('POST','/autos/accesorios/',accesorio)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getPrecioAuto(idAuto,callback){
		hacerPeticion('GET','/autos/precio/'+idAuto,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function almacenarCotizacion(cedula,idEmpleado,detallesCotizacion,idAuto,idHistPrecioAuto,callback){
		var datos = {
			cedula:cedula,
			idEmpleado:idEmpleado,
			detallesCotizacion:detallesCotizacion,
			idAuto:idAuto,
			idHistPrecioAuto:idHistPrecioAuto
		}
		hacerPeticion('POST','/cotizaciones/',datos)
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
		getAccesorios:getAccesorios,
		agregarAccesorio:agregarAccesorio,
		almacenarCotizacion:almacenarCotizacion,
		getPrecioAuto:getPrecioAuto
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

	$scope.total = 0;
	$scope.seleccionarAuto = function(auto,element){
		$scope.autoSeleccionado = auto;
		$('.rowAuto').removeClass('success');
		$(element).addClass('success');
		
		Dao.getPrecioAuto($scope.autoSeleccionado.IDAUTO,function(err,result){
			console.log(result);
			$scope.precioAuto = result[0];
			$scope.total += $scope.precioAuto.PRECIO;
		})

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
		Dao.getAccesorios(function(err,result){
			console.log(result);
			$scope.accesorios = result;
		})
	}



	$scope.accesoriosAgregados = [];
	$scope.agregarAccesorio = function(accesorio){
		console.log(accesorio);
		var nuevo_accesorio = {};
		for (var key in accesorio){
			nuevo_accesorio[key] = accesorio[key];
		}
		nuevo_accesorio.CANTIDAD = 1;
		nuevo_accesorio.SUBTOTAL= nuevo_accesorio.CANTIDAD*nuevo_accesorio.PRECIO;
		$scope.accesoriosAgregados.push(nuevo_accesorio);
		$scope.total += parseFloat(nuevo_accesorio.SUBTOTAL);	
	}

	$scope.guardarCotizacion = function(){
		var detallesCotizacion = $scope.partesIncluidas.concat($scope.accesoriosAgregados);
		console.log(detallesCotizacion);
		if(!$scope.clienteSeleccionado){
			alert("selecione un cliente");
		}
		else{
			Dao.almacenarCotizacion($scope.clienteSeleccionado.CEDULA,11111,detallesCotizacion,
				$scope.autoSeleccionado.IDAUTO,$scope.precioAuto.IDHISTPRECIOAUTO,function(err,result){
					console.log(result);
			})
		}
	}

}])

 var docDefinition = { content: [
 	{text:'concecionarioUD',style:"empresa"},
 	{text:'Cotizacion para automovil chrevolet',style:'header'},
 	{text:'Cliente',style:'subtitulo'},
 	{text:[
 		{text:'Nombre: ',bold:true},'Anthony Vargas  ',
 		{text:' Cedula: ',bold:true},'1023933551'
 		]
 	},
 	{text:'Caracteristicas del vehiculo',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100],
        body:[
        [ 'Caracteristica', 'Detalle'],
 			 ['Marca','Nissan']
        ]
 	}
 	},
 	{text:'Precio base',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100,100,100],
        body:[
        [ 'Item', 'Precio','Cantidad','SUBTOTAL'],
 			 ['Nissan','50 millones',1,'50 millones']
        ]
 	}
 	},
 	{text:'Partes incluidas',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100,100,100],
        body:[
        [ 'Parte', 'Precio','Cantidad','SUBTOTAL'],
 			 ['Condensador','0',1,'0']
        ]
 	}
 	}	
 	],
 	styles:{
 		tabla:{
 			margin:[0,10,0,10]
 		},
 		subtitulo:{
 			bold:true,
 			fontSize:16,
 			margin:[0,10,0,10]
 		},
 		empresa:{
			bold:true,
 			fontSize:14,
 			// margin: [left, top, right, bottom]
 			margin:[0,0,0,10]
 		},
 		header:{
 			bold:true,
 			fontSize:22,
 			margin:[0,0,0,10]
 		}
 	}
 	 };
 // download the PDF
 //pdfMake.createPdf(docDefinition).download('optionalName.pdf');

app.controller('controladorVentas',['$scope','Dao',function($scope,Dao){
		
}])