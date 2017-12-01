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
INSERT INTO tipoContacto (idTipoContacto,nombreTipoContacto) VALUES (2,'telefono');
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







