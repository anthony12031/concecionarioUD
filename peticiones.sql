SQL> SELECT A.nombre auto,TC.detalle caracteristica,C.detalle detalle from auto A, tipoCaracteristica TC, caracteristica C,autoCara AC WHERE TC.idTipoCrc = C.idTipoCrc AND AC.idCrt = C.idCrt AND A.idAuto = AC.idAuto;

AUTO            CARACTERISTICA  DETALLE                                         
--------------- --------------- ---------------                                 
NISSAN Armada e marca           NISSAN                                          
xclusive                                                                        
                                                                                
Hyundai Sonata  marca           Hyunday                                         
Sport 2.0T                                                                      
                                                                                
Lexus GX 460 Lu marca           Lexus                                           
xury                                                                            
                                                                                
NISSAN Armada e color           Rojo                                            
xclusive                                                                        

AUTO            CARACTERISTICA  DETALLE                                         
--------------- --------------- ---------------                                 
                                                                                
Hyundai Sonata  color           Rojo                                            
Sport 2.0T                                                                      
                                                                                
Lexus GX 460 Lu color           Rojo                                            
xury                                                                            
                                                                                
NISSAN Armada e modelo          2017                                            
xclusive                                                                        
                                                                                
Hyundai Sonata  modelo          2017                                            

AUTO            CARACTERISTICA  DETALLE                                         
--------------- --------------- ---------------                                 
Sport 2.0T                                                                      
                                                                                
Lexus GX 460 Lu modelo          2017                                            
xury                                                                            
                                                                                

9 rows selected.

SQL> spool off
