color_inicio = '#07b48f';    // 'rgb(7, 180, 143)'
color_ayuda = '#f1d5b4';     // 'rgb(241, 213, 180)'
color_componer = '#f5061a';  // 'rgba(245, 6, 26)'
color_estampadas = '#A9E7BE';// 'rgb(169, 231, 190)'
estoy_componiendo = false;
MinimoValoresIniciales = 27;
var id_hora;
var id_crono;
var dificultad = "";
var numero_celdas_iniciales; 
// guardamos el binario resuelto
var binario_resuelto = new Array(99);
//guardamos las celdas iniciales
var binario_ini = new Array(99);
h = m = s = "00";
explicacion =`               ****** QUE ES UN SUDOKU BINARIO ******\n
Se compone de un cuadrado de 10 celdas por lado (100 celdas)\n
Los valores para su resolucion son el cero (0) o el uno (1)\n
Las celdas en blanco determinan que el binario no esta completo\n 
              ****** NORMAS PARA SU RESOLUCION ******\n
.-Las filas y columnas deben tener la misma cantidad de unos y ceros,\n
.-No pueden contener mas de dos unos o ceros consecutivos.\n
.-Ni las filas ni las columnas deben tener secuencias iguales.\n
        ****** FORMA RAPIDA DE INTRODUCIR VALORES ******\n
Haciendo doble click en una celda podemos introducir\n
un blanco un cero o un uno de forma alternativa.`



// ======== hay que borrar cuando el programa este en produccion
//array_celdas =[00,03,06,09,12,15,23,26,29,33,34,44,49,57,59,64,66,67,71,72,79,81,82,94,96]
//array_valores = ['1','0','1','0','0','0','1','0','0','1','0','0','1','0','1','1','1','0','0','0','0','0','0','0','1']

//array_celdas =[01,03,05,06,10,12,15,18,24,27,32,35,38,43,49,56,62,64,65,68,69,78,81,84,85,91,93,99]
//array_valores = ['1','0','1','1','0','0','1','1','0','0','0','0','1','1','0','0','1','1','1','1','0','1','0','0','0','1','1','0']

//array_celdas =[02,09,11,13,15,16,19,20,22,27,34,37,38,42,43,50,59,67,70,73,75,78,84,86,91,92,97]
//array_valores = ['1','1','0','1','1','1','1','1','0','1','1','1','1','0','0','0','1','1','0','1','0','1','1','1','1','1','0']
// =========



/*
    ================================ Aqui iniciamos el proceso ===================================================
*/
//Ejecutamos la funcion inicio una vez creada la pagina, una primera vez.
$(window).on("load", inicio);

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> ponemos la aplicacion a inicio
*/
function inicio(){
    //pongo a cero el cronometro
    h = m = s = "00";
    $("#segundos").val(s);
    $("#minutos").val(m);
    $("#horas").val(h);
    inicio_hora();
    $('#entradas input[type=text]').each(function(){
        $(this).val(" ");
        $(this).attr("disabled", true); 
        $(this).removeAttr("readonly");
    });
    menu_inicio();
    $("#exp").val(explicacion);
    return;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> Inicializamos datos
*/
function poner_a_inicio(){
    $(':text')[0].focus();
    $("#comen").val("");
    //pongo a cero el cronometro
    h = m = s = "00";
    $("#segundos").val(s);
    $("#minutos").val(m);
    $("#horas").val(h);
    desabilitar_botones_crono();
    //visualizamos un guion (" ") en las celdas y ponemos el color y las desabilitamos.
    $('#entradas input[type=text]').each(function(){
        $(this).val(" ");
        $(this).css('background', color_estampadas);
        $(this).attr("disabled", true);
        $(this).removeAttr("readonly");
    });
    binario_resuelto.length = 0;
    binario_ini.length = 0;
    menu_inicio();
    return;
}

/*
    Parametros >> las celdas iniciales
    Devolvemos >> nada
    Funcion    >> Conlos datos iniciales, inicamos la busqueda de la 
    solucion del binario.
    Si la encuetra, visualiza los valores iniciales, y permite la entrada de datos
    para su solucion.
*/
function binario_aleatorio(numero_celdas_iniciales){

    let tcelda;             // mantiene en formato de texto el numero de la celda del sudoku con la que se trabaja
    let tvalor;             // contiene el valor en formato texto que tiene la celda con la que trabajamos 
    let valor;
    let nva;               // numero de la fila seleccionada que queremos estampar
    let filas_usadas=[];
    let fila_estampar=[];
    let fila_binario = 0;
    let hacer = true;
    let desechamos_fila;
    let posicion;
    let veces = 0;
    //Vaciamos el binario resuelto
    binario_resuelto.length = 0;
    while(hacer){
        ///ponemos a blanco las celdas y volvemos a inicio el bucle con el binario vacio.
        $('#entradas input[type=text]').each(function(){
            $(this).val(' ') ;
        });
        fila_binario = 0;
        desechamos_fila = false;
        filas_usadas=[];
        nva = Math.round(Math.random()*79);    
        filas_usadas.push(nva);
        fila_estampar = filas_posibles[nva];
        posicion = 0;
        for( let dato of fila_estampar){
            tcelda = n(fila_binario + posicion);
            $("#" + tcelda).val(dato);
            posicion++;
        }
        recorro = true;
        fila_binario = fila_binario + 10;
        let veces_recorrido = 0
        while(recorro){
            desechamos_fila = false;
            nva = Math.round(Math.random()*79);
            fila_escogida = filas_posibles[nva];
            if (filas_usadas.indexOf(nva) == -1){
                posicion = 0;
                for(dato of fila_escogida ){
                    tcelda = n(fila_binario + posicion);
                    tvalor = dato.toString();
                    if(aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, tvalor)){
                        $("#" + tcelda).val(tvalor);
                    }else{
                        desechamos_fila = true;
                        break;
                    }
                    posicion++;
                }
                if(desechamos_fila == false){
                    if(fila_binario > 40){
                        for(let nco of [0,1,2,3,4,5,6,7,8,9]){
                            valor = hay_mas_de_cinco_valores_iguales_en_la_columna([nco]);
                            if (valor[2]) {
                                texto = `Mas de 5 unos o ceros en la columna ${nco}`;
                                //console.log(`Mas de 5 unos o ceros en la columna ${nco}`);
                                desechamos_fila = true;
                                break;
                            }
                        }
                    }
                }
                if(desechamos_fila == false){
                    filas_usadas.push(nva);
                    fila_binario = fila_binario + 10;
                    if(filas_usadas.length == 10){
                        //comprobamos que no tengamos columnas con secuencias iguales 
                        if (hay_secuencias_iguales_de_columnas()){
                            ///ponemos a blanco las celdas y volvemos a inicio el bucle con el binario vacio.
                            $('#entradas input[type=text]').each(function(){
                                $(this).val(' ') ;
                            });
                            fila_binario = 0;
                            filas_usadas=[];
                            break;
                        }else{
                            binario_resuelto.length = 0;
                            for (let nx = 0; nx < 100; nx++){
                                tcelda = n(nx);
                                binario_resuelto[nx] = $("#" + tcelda).val();
                            }
                            //seleccionamos aleatoriamente las celdas iniciales sin repetir nunguna y guardamos en binario_ini
                            binario_ini.length = 0;
                            for (let nx=0; nx < numero_celdas_iniciales; nx++){
                                while(true){
                                    nva = Math.round(Math.random()*99);
                                    if (binario_ini.indexOf(nva) == -1){
                                        break;
                                    }
                                }
                                binario_ini[nx] = nva;
                            }
                            //Ponemos a blanco el sudoku binario 
                            $('#entradas input[type=text]').each(function(){
                                $(this).val(' ');
                                $(this).removeAttr("disabled"); 
                            });
                            //estampamos las celdas iniciales y las ponemos de solo lectura
                            for (let nx of binario_ini){
                                tcelda = n(nx);
                                $("#" + tcelda).val(binario_resuelto[nx]);
                                $("#" + tcelda).css('background', color_inicio);
                                $("#" + tcelda).attr("readonly", true);
                            }
                            menu_entrada_datos();
                            // salimos indicando que tenemos el sudoku completo. ponemos el bucle a false
                            $("#comen").val("=== YA TIENE EL BINARIO DISPONIBLE ===");
                            inicio_crono();
                            recorro = false;
                            hacer = false;
                            break; 
                        }
                    }    
                }
            }
            veces_recorrido++;
            if(veces_recorrido > 500){recorro = false;}
        }
        veces++;
        if(veces > 10000){
            hacer = false;
            $("#comen").val(`veces => ${veces}`)
        }
    }
    return;
}    

/*
    Parametros >> se pasan los numeros de las filas (0 a 9) en un array
    Devolvemos >> true si son correctas en caso contrario false
    Funcion    >> Comprueba que las celdas de las filas que se le pasan, cumplan con las normas del sudoku binario
*/
function son_correctas_las_celdas_de_una_o_varias_filas(filas){
    let tcelda; let tvalor;
    let salida = true;
    if(filas.length != 0){
        for(let nfi of filas){
            for(let nco of [0,1,2,3,4,5,6,7,8,9]){
                tcelda = n((nfi*10)+nco);
                tvalor = $("#" + tcelda).val();
                if(tvalor != ' '){
                    if (aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda,tvalor) == false){
                        salida = false;
                        break;
                    }
                }
            }
            if(salida == false){
                break;
            }
        }
    }
    return salida;
}

/*
    Parametros >> se pasan los numeros de las columnas (0 a 9) en un array
    Devolvemos >> true si son correctas en caso contrario false
    Funcion    >> Comprueba que las celdas de las columnas que se le pasan, cumplan con las normas del sudoku binario
*/
function son_correctas_las_celdas_de_una_o_varias_columnas(columnas){
    let tcelda; let tvalor;
    let salida = true;
    if(columnas.length != 0){
        for(let nco of columnas){
            for(let nfi of [0,1,2,3,4,5,6,7,8,9]){
                tcelda = n((nfi*10)+nco);
                tvalor = $("#" + tcelda).val();
                if(tvalor != ' '){
                    if (aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda,tvalor) == false){
                        salida = false;
                        break;
                    }
                }
            }
            if(salida == false){
                break;
            }
        }
    }
    return salida;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> Prepara la aplicacion para entrada valores a mano
*/
function binario_a_mano(){
    let num = 0;
    //estado_botones_inicial();   
    $('#inicio').attr("disabled", false);
    $("#entrar").attr("disabled", true);
    $("#generar").attr("disabled", true);
    $("#inicio").css('background', color_act);
    $("#entrar").css('background', color_des);
    $("#generar").css('background', color_des);
    $("#compruebo_celdas").attr("disabled",false);
    $("#compruebo_celdas").css('background', color_act);
    // pongo disabled a false a todos los imputs de tipo text del formulario entradas
    $('#entradas input[type=text]').each(function(){
        $(this).removeAttr("disabled"); 
    });
    $("#comen").val("Introduzca los números en las celdas, una vez los tenga introducidos\n " +
    " pulse el botón ->(Comprobar celdas)");
    //Vaciamos el binario resuelto
    binario_resuelto.length = 0;
    //Ponemos a blanco el array binario_ini
    for (let nx = 0; nx < 100; nx++){
        binario_ini[nx] = ' ';
    }  
    //=========hay que borrar cuando el programa este en produccion=========
    // for (let nx of array_celdas){    
    //     tcelda = n(nx);
    //     $("#" + tcelda).val(array_valores[num]); 
    //     num++  
    //}
    //========================================================================
    return
}

/*
    Parametros >> nada
    Devolvemos >> si las celdas iniciales son correctas, encontramos una solucion, y la solucion es correcta devolvemos true,
    Funcion    >> Comprobamos las celdas iniciales que cumplan con las normas del sudoku binario, buscamos una solucion,
    y comprobamos que sea correcta.
    Si todo es correcto, dejaremos en la pantalla visibles solo las celdas iniciales. 
*/
function comprobar_celdas_iniciales(){
    let tcelda;  let tvalor; let hacer; let texto = '';
    let CeldasIniciales;
    salida = true;
    hacer = true;
    if(hay_celdas_en_blanco() > (100 - MinimoValoresIniciales)){
        texto = (`la cantidad de valores iniciales no puede ser menor a ${MinimoValoresIniciales}`) 
        $("#comen").val(texto);
    }else{
        // comprobamos que los valores iniciales estan de acorde a normas del sudoku binario
        for( celda=0; celda < 100; celda++){
            tcelda = n(celda);
            if($("#" + tcelda).val() != ' '){
                if(es_correcto_el_valor_de_la_celda(celda) == false){
                    //console.info(`El valor de la celda ${celda} en el binario es incorrecto en`);
                    texto = "Introducir nuevas celdas iniciales";
                    break;
                }
            }   
        }
        if(texto == ''){
            //guardamos las celdas iniciales en array CeldasIniciales
            CeldasIniciales = [];
            for (let celda = 0; celda < 100; celda++){
                tcelda = n(celda);
                CeldasIniciales[celda] = $("#" + tcelda).val();
            }
            // Estampamos las celdas que son seguras, con los datos iniciales
            CeldasSeguras = estampar_celdas_seguras();
            if(CeldasSeguras.length > 0 ){
                hacer = true;
                cant = 0;
                while(hacer){
                    hacer = true;
                    texto = '';
                    //buscando_solucion();
                    ArrayFilasPosibles = guardo_filas_posibles();
                    //seleccionamos de forma aleatoria una fila, y tambien de forma aleatoria una de las filas que pueden ir en ella
                    NumFilaB = Math.round(Math.random()*(10 - 1));
                    LasFilasPosibles = ArrayFilasPosibles[NumFilaB];
                    longi = LasFilasPosibles.length;
                    if(longi > 0){
                        NumFilaP = Math.round(Math.random()*(longi - 1));
                        FilaSeleccionada = LasFilasPosibles[NumFilaP]
                        FilaEstampar = filas_posibles[FilaSeleccionada];
                        //Guardamos la fila binario
                        GuardoFila = [];
                        for(let nn=0; nn < 10; nn++){
                            tcelda = n((NumFilaB * 10) +nn);
                            GuardoFila[nn] = $("#" + tcelda).val();
                        }
                        //estampamos la fila posible
                        for(let nn=0; nn < 10; nn++){
                            tcelda = n((NumFilaB * 10) +nn);
                            tvalor = FilaEstampar[nn].toString();
                            if(aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, tvalor)){
                                $("#" + tcelda).val(tvalor);
                            }else{
                                // estampo la fila guardada
                                for(let nn=0; nn < 10; nn++){
                                    tcelda = n((NumFilaB * 10)+ nn);
                                    $("#" + tcelda).val(GuardoFila[nn]);
                                }
                                console.log(`No se ha podido estampar la fila ${FilaSeleccionada} de las posibles`)
                                break;
                            }
                        }
                        if(estampar_celdas_seguras() == false){
                            //aqui ponemos el binario a celdas seguras y volver a probar
                            for(let nn=0; nn < 100; nn++){
                                tcelda = n(nn);
                                $("#" + tcelda).val(CeldasSeguras[nn]);
                            }    
                        }else{
                            if(hay_celdas_en_blanco() == 0){
                                if(hay_secuencias_iguales_de_columnas()){
                                    //aqui ponemos el binario a celdas seguras y volver a probar
                                    for(let nn=0; nn < 100; nn++){
                                        tcelda = n(nn);
                                        $("#" + tcelda).val(CeldasSeguras[nn]);
                                    }
                                }else{
                                    if(comprobamos_solucion() == "Binario Correcto"){
                                        texto = "Binario Correcto"
                                        //Guardamos el binario resuelto en el array binario_resuelto y borramos la visualizacion
                                        binario_resuelto.length = 0;
                                        $('#entradas input[type=text]').each(function(){
                                            binario_resuelto.push($(this).val());
                                            $(this).val(' ') ;
                                        });
                                        //estampamos las celdas iniciales y las ponemos de solo lectura
                                        for(celda = 0; celda < 100; celda++){
                                            tcelda = n(celda);
                                            tvalor = CeldasIniciales[celda];
                                            if(tvalor != ' '){
                                                $("#" + tcelda).val(tvalor);
                                                $("#" + tcelda).css('background', color_inicio);
                                                $("#" + tcelda).attr("readonly", true);
                                            }
                                        }
                                        menu_entrada_datos();
                                        // salimos indicando que tenemos el sudoku completo. ponemos el bucle a false
                                        $("#comen").val("=== YA TIENE EL BINARIO DISPONIBLE ===");
                                        inicio_crono();
                                        hacer = false;
                                    }
                                }
                            }
                        }
                    }
                    cant++;
                    if(cant >1000){
                        $("#comen").val(`Se han dado ${cant} pases en el bucle`);
                        break;
                    }
                }
            }else{
                texto = "Introducir nuevas celdas iniciales";
                $("#comen").val(`Se han producido errores al estampar celdas seguras.(Introducir nuevas celdas iniciales)`)
                //console.info(`Se han producido errores al estampar celdas seguras`);
            }
        }
    }
    return 
}

/*
    Parametros >> nada
    Devolvemos >> la cantidad de celdas en blanco
    Funcion    >> Contamos las celdas en blanco
*/
function hay_celdas_en_blanco(){
    let cant = 0;
    $('#entradas input[type=text]').each(function(){
        if($(this).val() == ' '){
            cant++;
        }
    });
    return cant;        
}

/*
    Parametros >> variable que le indica que hacer
    Devolvemos >> nada
    Funcion    >> controlamos cuando entramos en composicion
*/
function ccompongo(que_hago){
    if(que_hago == 'validar'){
        $('#entradas input[type=text]').each(function(){
            if($(this).css("background-color") == 'rgb(245, 6, 26)'){
                $(this).css("background", color_estampadas);
            }
        });
    }else{
        $('#entradas input[type=text]').each(function(){
            if($(this).css("background-color") == 'rgb(245, 6, 26)'){
                $(this).css("background", color_estampadas);
                $(this).val(' ');
            }
        });
    }
    $('#entradas input[type=text]').each(function(){
        if($(this).css("background-color")  == 'rgb(169, 231, 190)'){
            $(this).removeAttr("readonly");
        }
    });           
    estoy_componiendo = false;
    menu_entrada_datos();
    return;
}
/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> coloca un valor en una celda aleatoriamente
*/
function ayuda_celda_aleatoria(){
    let nva; let tcelda; let hacer = false; let cant;
    // nos aseguramos que tengamos alguna celda vacia, para iniciar el bucle.
    cant = hay_celdas_en_blanco();
    if (cant > 0){
        hacer = true;
    }
    while(hacer){
        nva = Math.round(Math.random()*99);
        tcelda = n(nva);
        if ($("#" + tcelda).val() == ' '){
            tvalor = binario_resuelto[nva];
            $("#" + tcelda).val(tvalor);
            $("#" + tcelda).attr('readonly', true);
            $("#" + tcelda).css('background', color_ayuda);
            hacer = false;
        }        
    }
    return;
}
/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> coloca un valor en la celda activa 
*/
function ayuda_celda_activa(){
    let tcelda; let tvalor;
    tcelda = n(id_ultimo);
    if ($("#" + tcelda).val() == ' '){ 
        tvalor = binario_resuelto[id_ultimo]; 
        $("#" + tcelda).val(tvalor);
        $("#" + tcelda).css('background', color_ayuda);
        $("#" + tcelda).attr("readonly", true);  
    }       
    return;
}
/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> Visualiza en el binario la solucion, y pone el menu a inicio 
*/
function resolver_binario(){
    for ( let nx = 0; nx < 100; nx++){
        tcelda = n(nx);
        $("#" + tcelda).val(binario_resuelto[nx]);
    }
    desabilitar_botones_crono();
    //ponemos el menu para la posibilidad de poner el binario a inicio
    $('#inicio').attr("disabled", false);    
    $("#entrar").attr("disabled", true);
    $("#generar").attr("disabled", true);
    $("#celda_ale").attr("disabled",true);
    $("#celda_act").attr("disabled",true);
    $("#compruebo_celdas").attr("disabled",true);
    $("#compongo_binario").attr("disabled",true);
    $("#resuelvo").attr("disabled",true);
    
    $("#inicio").css('background', color_act);
    $("#entrar").css('background',color_des);
    $("#generar").css('background',color_des);
    $("#celda_ale").css('background', color_des);
    $("#celda_act").css('background', color_des);
    $("#compruebo_celdas").css('background', color_des);
    $("#compongo_binario").css('background', color_des);
    $("#resuelvo").css('background', color_des);
    return;
}

/*
    Parametros >> nada
    Devolvemos >> devolvemos true si hay secuencias iguales en las columnas en caso contrario false
    Funcion    >> comprueba las columnas para que no tengamos dos iguales 
*/
function hay_secuencias_iguales_de_columnas(){
    let salida = false;
    let arr = [0,1,2,3,4,5,6,7,8];
    let arr1 = [0,1,2,3,4,5,6,7,8,9];
    //aseguramos que el binario no contenga celdas en blanco
    if(hay_celdas_en_blanco() == 0){
        for (let columna_a_comparar of arr) {
            arr1.splice(0, 1);
            for (let columna_comparando of arr1) {
                var1 = valores_de_la_columna(columna_a_comparar);
                var2 = valores_de_la_columna(columna_comparando);
                if (JSON.stringify(var1) === JSON.stringify(var2)){
                    //console.info(`la columna ${columna_a_comparar} y la columna  ${columna_comparando} sus secuencias SON iguales`);
                    $("#comen").val(`la columna ${columna_a_comparar} y la columna  ${columna_comparando} sus secuencias SON iguales`); 
                    salida = true;
                    break;
                }    
            }
            if (salida == true){break;}
        } 
    }else{
        $("#comen").val(`El binario contiene celdas en blanco `);   
    }  
    return salida;    
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function inicio_hora(){
    id_hora = setInterval(escribeHora,1000);
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function inicio_crono(){
    $("#pausa").attr("disabled", false);
    $("#pausa").css('background', color_act);
    $("#reiniciar").attr("disabled", true);
    $("#reiniciar").css('background', color_des);
    $('#entradas input[type=text]').each(function(){
        $(this).show(); 
    });
    id_crono = setInterval(escribeCrono,1000);
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function escribeHora(){
    // visualizamos la hora
    var fecha = new Date();
    fecha.toLocaleTimeString('es-ES') ; //da la hora en el formato español de 24 horas
    var ho = fecha.getHours();
    var mi = fecha.getMinutes();
    var se = fecha.getSeconds();
    if (ho<10) {ho= "0" + ho;}
    if (mi<10) {mi= "0" + mi;}
    if (se<10) {se= "0" + se;}
    document.getElementById("reloj").innerHTML = ho + ":" + mi + ":" + se;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function escribeCrono(){    
    s++;
    if (s<10) {s= "0" + s;}
    if (s == 60){
        m++; s=0;
        if (m<10) {m= "0" + m;} 
    }
    if (m == 60){
        h++; m=0;
        if (h<10) {h= "0" + h;}
    }
    $("#segundos").val(s);
    $("#minutos").val(m);
    $("#horas").val(h);
    //-------------------------
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function para_crono(){
    $("#pausa").attr("disabled", true);
    $("#pausa").css('background', color_des);
    $("#reiniciar").attr("disabled", false);
    $("#reiniciar").css('background', color_act);

    $('#entradas input[type=text]').each(function(){
        $(this).hide(); 
    });
    clearInterval(id_crono);
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> 
*/
function desabilitar_botones_crono(){
    //desabilitamos los botones del cronometro y paramos el crono
    $("#pausa").attr("disabled", true);
    $("#pausa").css('background', color_des);
    $("#reiniciar").attr("disabled", true);
    $("#reiniciar").css('background', color_des);
    clearInterval(id_crono);
}

/*
    Parametros >> numero de celda en cadena y el valor de la celda tambien en cadena
    Devolvemos >> el valor a estampar 
    Funcion    >> comprobamos que la celda con su valor esta de acuerdo con las normas del sudoku binario
*/
function aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, tvalor){
    let fi; let co; let valor;
    let estampo = true;
    let cmas1; let cmas2; let cmenos1; let cmenos2; let a1; let a2; let s1; let s2;
    fi = parseInt(tcelda[0], 10);
    co = parseInt(tcelda[1], 10);
    // comprobamos si el valor de la celda lo permiten las dos columnas anteriores y las dos siguientes, segun la columna de la celda 
    if(co == 0 && estampo ){
        cmas1 = n((fi*10)+co+1);
        cmas2 = n((fi*10)+co+2);
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if (tvalor == s1 && tvalor == s2){
            estampo = false;
        }
    } else if(co == 1 && estampo ) {
        cmenos1 = n((fi*10)+co-1);
        cmas1 = n((fi*10)+co+1);
        cmas2 = n((fi*10)+co+2);
        a1 = $("#" + cmenos1).val();
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if(tvalor == a1 && tvalor == s1) {
            estampo = false;
        }else if( (tvalor == s1 && tvalor == s2)){
            estampo = false;
        }
    }else if(co > 1 && co < 8 && estampo){
        cmenos1 = n((fi*10)+co-1);
        cmenos2 = n((fi*10)+co-2);
        cmas1 = n((fi*10)+co+1);
        cmas2 = n((fi*10)+co+2);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if(tvalor == a1 && tvalor == a2){
            estampo = false;
        }else if(tvalor == s1 && tvalor == s2){
            estampo = false;
        }else if(tvalor == a1 && tvalor == s1){
            estampo = false;
        }
    }else if(co == 8 && estampo){
        cmenos1 = n((fi*10)+co-1);
        cmenos2 = n((fi*10)+co-2);
        cmas1 = n((fi*10)+co+1);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        s1 = $("#" + cmas1).val();
        if(tvalor == a1 &&  tvalor == a2) {
            estampo = false;
        }else if(tvalor == a1 && tvalor == s1){
            estampo = false;
        }
    }else if(co == 9 && estampo){       
        cmenos1 = n((fi*10)+co-1);
        cmenos2 = n((fi*10)+co-2);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        if (tvalor == a1 && tvalor == a2){
            estampo = false;
        }
    }
    // comprobamos si el valor de la celda lo permiten las dos filas anteriores y las dos siguientes, segun la fila de la celda 
    if(fi == 0 && estampo){
        cmas1 = n((fi*10)+10+co);
        cmas2 = n((fi*10)+20+co);
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if (tvalor == s1 && tvalor == s2){
            estampo = false;
        }
    }else if(fi == 1 && estampo) {
        cmenos1 = n((fi*10)-10+co);
        cmas1 = n((fi*10)+10+co);
        cmas2 = n((fi*10)+20+co);
        a1 = $("#" + cmenos1).val();
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if(a1 == tvalor && tvalor == s1) {
            estampo = false;
        }else if( (tvalor == s1 && tvalor == s2)){
            estampo = false;
        }
    }else if(fi > 1 && fi < 8 && estampo){
        cmenos1 = n((fi*10)-10+co);
        cmenos2 = n((fi*10)-20+co);
        cmas1 = n((fi*10)+10+co);
        cmas2 = n((fi*10)+20+co);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        s1 = $("#" + cmas1).val();
        s2 = $("#" + cmas2).val();
        if(tvalor == a1 && tvalor == a2){
            estampo = false;
        }else if(tvalor == s1 && tvalor == s2){
            estampo = false;
        }else if(tvalor == a1 && tvalor == s1){
            estampo = false;
        }
    }else if(fi == 8 && estampo){
        cmenos1 = n((fi*10)-10+co);
        cmenos2 = n((fi*10)-20+co);
        cmas1 = n((fi*10)+10+co);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        s1 = $("#" + cmas1).val();
        if(tvalor == a1 &&  tvalor == a2) {
            estampo = false;
        }else if(tvalor == a1 && tvalor == s1){
            estampo = false;
        }
    }else if(fi == 9 && estampo){       
        cmenos1 = n((fi*10)-10+co);
        cmenos2 = n((fi*10)-20+co);
        a1 = $("#" + cmenos1).val();
        a2 = $("#" + cmenos2).val();
        if (tvalor == a1 && tvalor == a2){
            estampo = false;
        }
    }
    return estampo;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> comprobamos si el binario cumple con las normas del sudoku binario
*/
function comprobamos_solucion(){
    let tcelda; let tvalor; let valor; 
    let texto = "Binario Correcto"; 
    //comprobamos que esten todas las celdas estampadas
    if(hay_celdas_en_blanco() > 0){
        texto = "El binario esta incompleto";
        return false;
    }
    //comprobamos que todas las celdas cumplan con las normas de los binarios
    if(texto == "Binario Correcto"){
        for(let nx=0; nx < 100; nx++){
            tcelda = n(nx);
            valor = $("#" + tcelda).val();
            tvalor = valor.toString();
            if(aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, tvalor) == false){
                texto = `Binario Erroneo en la celda ${tcelda} con el valor ${tvalor}`;
                break;
            }
        }
    }
    //comprobamos que las columnas no tengan mas de cincos valores iguales.
    if(texto == "Binario Correcto"){
        for(let num of [0,1,2,3,4,5,6,7,8,9]){
            valor = hay_mas_de_cinco_valores_iguales_en_la_columna([num])
            if (valor[2]){
                texto = `Mas de 5 unos o ceros en la columna ${num}`;
                break;
            }
            valor = hay_mas_de_cinco_valores_iguales_en_la_fila([num])
            if (valor[2]){
                texto = `Mas de 5 unos o ceros en la fila ${num}`;
                break;
            }
        }
    }
    $("#comen").val(texto);
    return texto;
}

/*
    Parametros >> un array con los numeros de las filas de (0 a 9). 
    Devolvemos >> un valor que nos indica si hay y si es de ceros o unos
    Funcion    >> Controlamos si tenemos mas de cinco ceros o unos dentro de la fila
*/
function hay_mas_de_cinco_valores_iguales_en_la_fila(filas){
    let ncero; let nuno; let tcelda;let valor;let valor_cero; let valor_uno;
    let columnas = [0,1,2,3,4,5,6,7,8,9];
    for (let fi of filas){
        ncero = 0; nuno = 0; valor = 0; valor_cero = 0; valor_uno = 0;
        for (let co of columnas) {
            tcelda = n((fi * 10) + co);
            if ($("#" + tcelda).val() == '0') {ncero++};
            if ($("#" + tcelda).val() == '1') {nuno++};
        }
        if (ncero > 5){
            valor_cero = 1;
        }
        if (nuno > 5){
            valor_uno = 2;
        }
        valor = valor_cero + valor_uno;
        if (valor > 0) { break;}
    }
    return valor;
}

/*

/*
    Parametros >> un array con los numeros de las columnas de (0 a 9). 
    Devolvemos >> un valor que nos indica si hay y si es de ceros o unos
    Funcion    >> Controlamos si tenemos mas de cinco ceros o unos dentro de la columna
*/
function hay_mas_de_cinco_valores_iguales_en_la_columna(columnas){
    let ncero; let nuno; let tcelda; let valor;let valor_cero; let valor_uno;
    let filas = [0,1,2,3,4,5,6,7,8,9];
    for (let co of columnas){ 
        ncero = 0; nuno = 0; valor = 0; valor_cero = 0; valor_uno = 0;
        for (let fi of filas){
            tcelda = n((fi * 10) + co);
            if ($("#" + tcelda).val() == '0') {ncero++;}
            if ($("#" + tcelda).val() == '1') {nuno++;}
        }
        if (ncero > 5){
            valor_cero = 1;

        } 
        if (nuno > 5){
            valor_uno = 2;

        }     
        valor = valor_cero + valor_uno;
        if (valor > 0) { break;}
    }
    return valor; 
}