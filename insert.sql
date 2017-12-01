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




