ALTER TABLE proceso MODIFY idProceso varchar2(25);
ALTER TABLE cotizacion ADD total float;
INSERT INTO tipocaracteristica (idtipocrc,detalle) VALUES (1,'marca');                                                                     
INSERT INTO tipocaracteristica  (idtipocrc,detalle) VALUES (2,'cilindraje');
INSERT INTO tipocaracteristica  (idtipocrc,detalle) VALUES (3,'color');
INSERT INTO tipocaracteristica  (idtipocrc,detalle) VALUES (4,'modelo');
INSERT INTO tipocaracteristica  (idtipocrc,detalle) VALUES (5,'combustible');
INSERT INTO auto (idauto,nombre) VALUES (1,'NISSAN Armada exclusive');
INSERT INTO auto (idauto,nombre) VALUES (2,'Hyundai Sonata Sport 2.0T');
INSERT INTO auto (idauto,nombre) VALUES (3,'Lexus GX 460 Luxury');
INSERT INTO caracteristica (idcrt,idtipocrc,detalle) VALUES (1,1,'NISSAN');
INSERT INTO caracteristica (idcrt,idtipocrc,detalle) VALUES (2,1,'Hyunday');
INSERT INTO caracteristica (idcrt,idtipocrc,detalle) VALUES (3,1,'Lexus');
INSERT INTO caracteristica (idcrt,idtipocrc,detalle) VALUES (4,4,'2017');
INSERT INTO caracteristica (idcrt,idtipocrc,detalle) VALUES (5,3,'Rojo');
INSERT INTO autocara (idauto,idcrt) VALUES (1,1);
INSERT INTO autocara (idauto,idcrt) VALUES (2,2);
INSERT INTO autocara (idauto,idcrt) VALUES (3,3);
INSERT INTO autocara (idauto,idcrt) VALUES (1,4);
INSERT INTO autocara (idauto,idcrt) VALUES (2,4);
INSERT INTO autocara (idauto,idcrt) VALUES (3,4);
INSERT INTO autocara (idauto,idcrt) VALUES (1,5);
INSERT INTO autocara (idauto,idcrt) VALUES (2,5);
INSERT INTO autocara (idauto,idcrt) VALUES (3,5);
INSERT INTO tipoParte (idTipoParte,nombre) VALUES (1,'Aire acondicionado');
INSERT INTO tipoParte (idTipoParte,nombre) VALUES (2,'Carroceria');
INSERT INTO tipoParte (idTipoParte,nombre) VALUES (3,'Accesorio');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (1,1,'Condensador');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (2,1,'Purificador de aire');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (3,2,'Air Bag');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (4,2,'Espejo');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (5,3,'Alarma');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (6,3,'Radio');
INSERT INTO parte (idParte,idTipoParte,nombre) VALUES (7,3,'Parlante');
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (1,1,200000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (2,2,300000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (3,3,100000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (4,4,100000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (5,5,150000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (6,6,170000,sysdate);
INSERT INTO historicoPrecioParte (idHistPrecio,idParte,precio,fecha) VALUES (7,7,80000,sysdate);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(1,1,1,1);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(2,1,3,2);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(3,1,4,2);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(4,2,3,2);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(5,2,4,2);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(6,3,3,2);
INSERT INTO parteauto (idParteAuto,idAuto,idParte,cantidad) Values(7,3,4,2);
INSERT INTO tipoContacto (idTipoContacto,nombreTipoContacto) VALUES (1,'telefono');
INSERT INTO tipoContacto (idTipoContacto,nombreTipoContacto) VALUES (2,'email');
INSERT INTO tipoContacto (idTipoContacto,nombreTipoContacto) VALUES (3,'Direccion');
INSERT INTO cliente (cedula,nombre,apellido) VALUES (1023933552,'Anthony','Vargas');
INSERT INTO cliente (cedula,nombre,apellido) VALUES (1023933441,'Luis','Ramirez');
INSERT INTO cliente (cedula,nombre,apellido) VALUES (1023933771,'Andres','Buitrago');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (1,1,1023933552,3102329814);
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (2,2,1023933552,'ajvargass@correo.udistrital.edu.co');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (3,3,1023933552,'cra 79g #35-45');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (4,1,1023933441,'319673678');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (5,2,1023933441,'Luis@hotmail.com');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (6,3,1023933441,'cll 25 #15');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (7,1,1023933771,'316345234');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (8,2,1023933771,'Andres@gmail.com');
INSERT INTO contacto (idContacto,idTipoContacto,cedula,contacto) VALUES    (9,3,1023933771,'transveral 22 #34');
INSERT INTO empleado (idempleado,nombre,apellido,fechaingreso,telefono,fechanacimiento,cargo) VALUES    (11111,'Fernando','Lopez','01/01/2017','234125','10/02/1970','asesor');
INSERT INTO historicoPrecioAuto (idHistPrecioAuto,IdAuto,Precio,fecha) VALUES (1,1,50000000,sysdate);
INSERT INTO historicoPrecioAuto (idHistPrecioAuto,IdAuto,Precio,fecha) VALUES (2,2,70000000,sysdate);
INSERT INTO historicoPrecioAuto (idHistPrecioAuto,IdAuto,Precio,fecha) VALUES (3,3,90000000,sysdate);
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10001,'DEBITO');
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10002,'CREDITO');
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10003,'REVOLVING');
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10004,'PREPAGO');
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10005,'MONEDERO');
INSERT INTO tipotarjeta (idtipotarjeta,nombre) VALUES (10006,'COMERCIAL');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10865,'2094711','Cra 9 #21-11','PacificColombia');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10611,'5846931','Cra 2 #69-78','ValorizacionColombia');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10421,'8955210','Av 80 #78 Sur','AhorroGroup');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10978,'3314785','Cll 13B #65-35','AsoDineroCol');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10302,'2011963','Av Sucre #96','InversionCol');
INSERT INTO grupofinanciero (idgrfinan2,telefono,direccion,nombre) VALUES (10556,'4652288','Cll 61 #12-81A','EfectivoMoneyCol');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (4813,'TransAmerica','tramerica@banco.com','8941242','Cra 56 #85-14');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (4825,'ColBanco','colombianbank@banco.com','5974205','Cra 82 #23-11');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (4853,'DinnerGold','dnngold@banco.com','8603451','Av 1 #85-14 Este');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (4942,'TitanMoney','titanmmny@banco.com','2648017','Cll 35 Sur #56');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (4971,'Bolivariano','bolvcolombia@banco.com','9305782','Cra 10 #04-32');
INSERT INTO banco (idbanco2,nombre,correo,telefono,direccion) VALUES (5001,'FinanzasG','financolombia@banco.com','1542389','Diag 89 #20 Norte');
INSERT INTO medioPago (idMedioPago,detalle) VALUES (502,'Credito Bancario');
INSERT INTO medioPago (idMedioPago,detalle) VALUES (505,'Credito Tarjeta');
INSERT INTO medioPago (idMedioPago,detalle) VALUES (507,'Efectivo Tarjeta');
INSERT INTO medioPago (idMedioPago,detalle) VALUES (508,'Efectivo');
INSERT INTO tipoProceso(idTipoProceso,nombre) VALUES (1,'cotizacion');
INSERT INTO tipoProceso(idTipoProceso,nombre) VALUES (2,'Estudio Credito');
INSERT INTO tipoProceso(idTipoProceso,nombre) VALUES (3,'Acuerdo Pago');
INSERT INTO tipoProceso(idTipoProceso,nombre) VALUES (4,'Credito Aprobado');
INSERT INTO tipoProceso(idTipoProceso,nombre) VALUES (5,'Acuerdo Pago Credito');
INSERT INTO tipoFactura(idTipoFactura,nombreTipoFactura) VALUES (1,'Factura Automovil');
