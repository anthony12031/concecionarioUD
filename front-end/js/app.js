var app = angular.module("concecionarioUD", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/gestionCotizacion.html"
    })
    .when("/acuerdoPago", {
        templateUrl : "pages/gestionVentas.html"
    })
    .when("/login", {
        templateUrl : "pages/login.html"
    })
    .when("/estudioCredito",{
    	templateUrl:"pages/gestionCredito.html"
    })
    .when("/separarAuto",{
    	templateUrl:"pages/separarAuto.html"
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

app.directive('seleccionPago',[function(){
	return {
		templateUrl:'pages/seleccionPago.html'
	}
}])

app.directive('detallePago30',[function(){
	return {
		templateUrl:'pages/detallePago30.html'
	}
}])

app.directive('bancosAliados',[function(){
	return {
		templateUrl:'pages/bancosAliados.html'
	}
}])

app.directive('mediosPago',[function(){
	return {
		templateUrl:'pages/mediosPago.html'
	}
}])


app.directive('separarAutoSeleccionCotizacion',[function(){
	return {
		templateUrl:'pages/separarAutoSeleccionCotizacion.html'
	}
}])

app.directive('acuerdosPago',[function(){
	return {
		templateUrl:'pages/acuerdosPago.html'
	}
}]);

app.directive('seleccionCotizacionCredito',[function(){
	return {
		templateUrl:'pages/seleccionCotizacionCredito.html'
	}
}])

app.directive('detalleCotizacionCredito',[function(){
	return {
		templateUrl:'pages/detalleCotizacionCredito.html'
	}
}])

app.directive('detalleCredito',[function(){
	return {
		templateUrl:'pages/detalleCredito.html'
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

	function almacenarCotizacion(cedula,idEmpleado,detallesCotizacion,idAuto,idHistPrecioAuto,total,callback){
		var datos = {
			cedula:cedula,
			idEmpleado:idEmpleado,
			detallesCotizacion:detallesCotizacion,
			idAuto:idAuto,
			idHistPrecioAuto:idHistPrecioAuto,
			total:total
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

	function buscarCotizacionPorCedula(cedula,callback){
		hacerPeticion('GET','/cotizaciones/cliente/'+cedula)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getMediosPago(callback){
		hacerPeticion('GET','/mediosPago')
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getBancosAliados(callback){
		hacerPeticion('GET','/bancosAliados')
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function enviarCorreo(datos,callback){
		hacerPeticion('POST','/email/',datos)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function registrarAcuerdos(acuerdos,callback){
		hacerPeticion('POST','/acuerdos/',acuerdos)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
		}
	function getCotizacionesCredito(callback){
		hacerPeticion('GET','/cotizacionCredito',null)
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

	function getDetalleCotizacionCredito(idCotizacion,callback){		
		hacerPeticion('GET','/cotizacionCredito/'+ idCotizacion,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function buscarCotizacionPorCedulaSepararAuto(cedula,callback){
		hacerPeticion('GET','/cotizaciones/separarAuto/cliente/'+cedula)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})

}
	function buscarCotizacionCreditoPorCedula(cedula,callback){
		hacerPeticion('GET','/cotizacionesCredito/cliente/'+cedula)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}


	function getAcuerdosPago(cotizacion,callback){
		hacerPeticion('GET','/acuerdosPago/'+cotizacion.IDCOTIZACION)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}

	function getDetalleCredito(idproceso,callback){
		hacerPeticion('GET','/credito/'+ idproceso,null)
		.then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})
	}


	function modificarAcuerdos(acuerdos,callback){
		hacerPeticion('POST','/acuerdos/modificar',acuerdos)
		then(function(res){
				callback (null,res.data);
			})
			//ocurrio algun error
			.catch(function(err){
				callback(err,null);
			})	
	}

	function modificarEstado(idproceso,callback){
		hacerPeticion('PUT','/estado',{idproceso:idproceso})
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
		getDetalleCotizacion:getDetalleCotizacion,
		getAccesorios:getAccesorios,
		agregarAccesorio:agregarAccesorio,
		almacenarCotizacion:almacenarCotizacion,
		getPrecioAuto:getPrecioAuto,
		buscarCotizacionPorCedula:buscarCotizacionPorCedula,
		getMediosPago:getMediosPago,
		getBancosAliados:getBancosAliados,
		enviarCorreo:enviarCorreo,
		registrarAcuerdos:registrarAcuerdos,
		buscarCotizacionPorCedulaSepararAuto:buscarCotizacionPorCedulaSepararAuto,
		getAcuerdosPago:getAcuerdosPago,
		modificarAcuerdos:modificarAcuerdos,
		getCotizacionesCredito:getCotizacionesCredito,
		getDetalleCotizacionCredito:getDetalleCotizacionCredito,
		buscarCotizacionCreditoPorCedula:buscarCotizacionCreditoPorCedula,
		getDetalleCredito:getDetalleCredito,
		modificarEstado:modificarEstado
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
		$scope.total = 0;
		$scope.accesoriosAgregados = [];
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
				$scope.autoSeleccionado.IDAUTO,$scope.precioAuto.IDHISTPRECIOAUTO,$scope.total,function(err,result){
					console.log(result);
					alert("cotizacion almacenada");
			})
		}
	}

	$scope.generarPDFCotizacion = function(){
	console.log("generar pdf");
	var caracteristicas = [['Caracteristica', 'Detalle']];
	$scope.detalleAuto.forEach(function(el){
		caracteristicas.push([el.CARACTERISTICA,el.DETALLE]);
	})	
	var partesIncluidas = [[ 'Parte', 'Precio','Cantidad','SUBTOTAL']]
	$scope.partesIncluidas.forEach(function(el){
		partesIncluidas.push([el.PARTE,el.PRECIO,el.CANTIDAD,el.SUBTOTAL]);
	})

	var partesAgregadas = [[ 'Parte', 'Precio','Cantidad','SUBTOTAL']]
	$scope.accesoriosAgregados.forEach(function(el){
		partesAgregadas.push([el.PARTE,el.PRECIO,el.CANTIDAD,el.SUBTOTAL]);
	})

	var docDefinition = { content: [
 	{text:'ConcecionarioUD',style:"empresa"},
 	{text:'Cotizacion para automovil: '+$scope.autoSeleccionado.NOMBRE,style:'header'},
 	{text:'Fecha: '+ moment().format('MMMM Do YYYY, h:mm:ss a'),style:'subtitulo'},
 	{text:'Cliente',style:'subtitulo'},
 	{text:[
 		{text:'Nombre: ',bold:true},$scope.clienteSeleccionado.NOMBRE,
 		{text:' Cedula: ',bold:true},$scope.clienteSeleccionado.CEDULA
 		]
 	},
 	{text:'Caracteristicas del vehiculo',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100],
        body:caracteristicas
 	}
 	},
 	{text:'Precio base',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100,100,100],
        body:[
        [ 'Item', 'Precio','Cantidad','SUBTOTAL'],
 			 [$scope.autoSeleccionado.NOMBRE,$scope.precioAuto.PRECIO,1,$scope.precioAuto.PRECIO]
        ]
 	}
 	},
 	{text:'Partes incluidas',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100,100,100],
        body:partesIncluidas
 	}
 	},
 	{text:'Accesorios agregados',style:'subtitulo'},
 	{style:'tabla',table:{
 		headerRows: 1,
        widths: [ 100, 100,100,100],
        body:partesAgregadas
 	}
 	},
 	{text:[
 		{text:'TOTAL: '+$scope.total,style:'total'}
 		]}	
 		
 	],
 	styles:{
 		total:{
			bold:true,
 			fontSize:14,
 			margin:[0,20,0,10]	
 		},
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
 pdfMake.createPdf(docDefinition).download('Cotizacion'+$scope.autoSeleccionado.NOMBRE+'.pdf');
	}

}])



app.controller('controladorVentas',['$scope','Dao',function($scope,Dao){

	Dao.getCotizaciones(function(err,result){
			$scope.cotizaciones = result;
			console.log(result);
	});

	$scope.buscarCotizacionPorCedulaSepararAuto = function(cedula){
		Dao.buscarCotizacionPorCedulaSepararAuto(cedula,function(err,result){
			console.log(result);
			$scope.cotizacionesSepararAuto = result;
		})
	}

	$scope.seleccionarCotizacionSepararAuto = function(cotizacion){
		console.log(cotizacion);
		Dao.getAcuerdosPago(cotizacion,function(err,result){
			console.log(result);
			$scope.acuerdosPago = result;
			$scope.cotizacionSeleccionada = cotizacion;
		})
	}

	$scope.modificarAcuerdos = function(){
		console.log("modificar acuerdos");
		console.log($scope.acuerdosPago);
		var datos = {
			acuerdos:$scope.acuerdosPago,
			idEmpleado:11111,
			idCotizacion:$scope.cotizacionSeleccionada.IDCOTIZACION
		}
		Dao.modificarAcuerdos(datos,function(err,result){
			console.log(result);
			alert("Cambios efectuados");
		})
	}

	$scope.acuerdosPago30 = {};
	var index30 = 0;
	$scope.agregarPago30 = function(){
		console.log("agregar pago 30: "+$scope.porcentaje30);
		console.log($scope.cotizacionSeleccionada.TOTAL);
		$scope.acuerdosPago30[index30]={
			porcentaje:$scope.porcentaje30,
			valor:$scope.cotizacionSeleccionada.TOTAL*$scope.porcentaje30,
			index:index30
		};
		index30++;
	}
	$scope.acuerdosPago70 = {};
	var index70 = 0;
	$scope.agregarPago70 = function(){
		console.log("agregar pago 70: "+$scope.porcentaje70);
		$scope.acuerdosPago70[index70]={
			porcentaje:$scope.porcentaje70,
			valor:$scope.cotizacionSeleccionada.TOTAL*$scope.porcentaje70,
			index:index70
		};
		index70++;
	}

	$scope.seleccionarCotizacion = function(cotizacion,element){
		$scope.cotizacionSeleccionada = cotizacion;
		$('.rowCotizacion').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCotizacion($scope.cotizacionSeleccionada.COTIZACION,function(err,result){
			console.log(result);
			$scope.detalleCotizacion = result;			
			$('#seleccion-cotizacion').hide();
			$('#detalle-cotizacion').show();
		})
	}

	$scope.buscarCotizacionPorCedula = function(cedula){
		Dao.buscarCotizacionPorCedula(cedula,function(err,result){
			console.log(result);
			$scope.cotizacionesCliente = result;
			$('#todas-cotizaciones').hide();
			$('#cliente-cotizaciones').show();
		})
	}

	$scope.volverTodasCotizaciones = function(){
			$('#todas-cotizaciones').show();
			$('#cliente-cotizaciones').hide();

	}

	$scope.elminarAcuerdo = function(acuerdo,porcentaje){
		console.log(porcentaje);
		if(porcentaje == 30)
			delete $scope.acuerdosPago30[acuerdo.index];
		else
			delete $scope.acuerdosPago70[acuerdo.index];
	}

	$scope.selecionarMedioPago = function(acuerdo,medioPago,
		porcentaje,index){
		acuerdo.medioPago = medioPago;
		//es un credito bancario
		if(medioPago.IDMEDIOPAGO == 502){
			console.log('#medios-'+porcentaje+"-"+index);
			console.log('#bancos-'+porcentaje+"-"+index);
			$('#medios-'+porcentaje+"-"+index).hide();
			$('#bancos-'+porcentaje+"-"+index).show();

			Dao.getBancosAliados(function(err,result){
				console.log(result);
				$scope.bancosAliados = result;
			})
		}
	}

	$scope.registrarAcuerdos = function(){
		var total30=0;
		var total70 = 0;
		for(var key in $scope.acuerdosPago30){
			total30 += parseFloat($scope.acuerdosPago30[key].porcentaje);
		}
		for(var key in $scope.acuerdosPago70){
			total70 += parseFloat($scope.acuerdosPago70[key].porcentaje);
		}

		if(total30 != 30 || total70 != 70){
			alert("los valores no suman al total");
			return;
		}
		empleado = {
			idEmpleado:11111
		}
		var acuerdos = {
			cotizacion:$scope.cotizacionSeleccionada,
			'30':$scope.acuerdosPago30,
			'70':$scope.acuerdosPago70,
			empleado:empleado
		};
		Dao.registrarAcuerdos(acuerdos,function(err,result){
			if(err)
				alert("error verifique los datos");	
			else
				alert("acuerdos de pago almacenados");
			console.log(err);
			console.log(result);

		})

		console.log("total30: "+total30);
		console.log("total70: "+total70);
	}

	$scope.seleccionarBanco = function(banco,valor){
		console.log("selecionar banco");
		console.log(banco.CORREO);
		Dao.enviarCorreo({
			subject:'Solicitud de credito',
			service:'hotmail',
			from:'concecionarioUD@hotmail.com',
			pass:'BasesDeDatos1',
			to:'tony_jason@hotmail.com',
			mensaje:'El cliente identificado con la cedula: '+$scope.cotizacionSeleccionada.CEDULA+
			" Desea adquirir un credito por el valor de: "+valor+"\n\n Atentamente: ConcecionarioUD"
		},function(err,result){
			console.log(result);
			alert(result);
		})
	}

	$scope.volver2 = function(menu,porcentaje,index){
		if(menu == 'seleccionCotizacion'){
			$('#seleccion-cotizacion').show();
			$('#detalle-cotizacion').hide();
			$('#seleccion-pago').hide();	
		}

		if(menu == 'medio-pago'){
			$('#medios-'+porcentaje+'-'+index).show();
			$('#bancos-'+porcentaje+'-'+index).hide();
		}


		if(menu == 'pago'){			
			$('#seleccion-pago').show();
			Dao.getMediosPago(function(err,result){
				console.log(result);
				$scope.mediosPago = result;
			})			
		}

		if(menu == 'treinta'){			
			$('#detalle-pago30').show();			
		}
		
	}	
}])





















































































app.controller('controladorCredito',['$scope','Dao',function($scope,Dao){

	Dao.getCotizacionesCredito(function(err,result){
			$scope.cotizacionesCreditos = result;
			console.log(result);
	});

	$scope.seleccionarCotizacionCredito = function(cotizacion,element){
		$scope.cotizacionCreditoSeleccionada = cotizacion;		
		$('.rowCotizacionCredito').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCotizacionCredito($scope.cotizacionCreditoSeleccionada.COTIZACION,function(err,result){

			$scope.detalleCotizacionCredito = result;
			console.log(result);			
			$('#seleccion-cotizacion-credito').hide();
			$('#detalle-cotizacion-credito').show();
		})
	}

	$scope.buscarCotizacionCreditoPorCedula = function(cedula){
		Dao.buscarCotizacionCreditoPorCedula(cedula,function(err,result){
			console.log(result);
			$scope.cotizacionesCreditosCliente = result;
			$('#todas-cotizaciones-credito').hide();
			$('#cliente-cotizaciones-credito').show();
		})
	}


	$scope.volverTodasCotizacionesCredito = function(){
			$('#todas-cotizaciones-credito').show();
			$('#cliente-cotizaciones-credito').hide();

	}

	$scope.seleccionarCredito = function(credito,element){		
		$scope.creditoSeleccionado = credito;		
		$('.rowCotizacionCredito').removeClass('success');
		$(element).addClass('success');
		
		Dao.getDetalleCredito($scope.creditoSeleccionado.PROCESO,function(err,result){
			$scope.detalleCredito = result;
			console.log(result);			
			$('#detalle-credito').show();
		})
	}

	$scope.cambiarEstado = function(cot){
		
		Dao.modificarEstado(cot,function(err,result){
			
			console.log(result);
		})
	}
	$scope.volver3 = function(menu,porcentaje,index){
		if(menu == 'seleccionCotizacionCredito'){
			$('#seleccion-cotizacion-credito').show();
			$('#detalle-cotizacion-credito').hide();				
		}				
	}	

}])