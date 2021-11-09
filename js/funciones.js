/*
    Parametros >> debe ser un numero de (0 a 99)
    Devolvemos >> el numero  pasado como una cadena de dos digitos.
    Funcion    >> dado un numeros de 0 a 99  transformarlo a una cadena de dos caracteres.
*/
function n(n){ return n > 9 ? "" + n: "0" + n; } 

/*
    Parametros >> un valor numerico comprendido entre 0 y 9
    Devolvemos >> un array con 9 valores de cadena
    Funcion    >> dado el numero de una columna, extraemos los valores 
    que tiene el binario en esa columna.
*/
function valores_de_la_columna(co){
    let tcelda; let valores = []; let filas;
    filas = [1,2,3,4,5,6,7,8,9];
    for (let fi of filas) {
        tcelda = n((fi * 10) + co);
        valor = $("#" + tcelda).val();
        if (valor == " "){     
            valores = [];
            break;
        }else{
            valores.push(valor);
        }
    }
    return valores;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> ponemos el menu a inicio
*/
function menu_inicio(){
    $('#inicio').attr("disabled", true);    
    $("#entrar").attr("disabled", false);
    $("#generar").attr("disabled", false);
    $("#celda_ale").attr("disabled",true);
    $("#celda_act").attr("disabled",true);
    $("#compruebo_celdas").attr("disabled",true);
    $("#compongo_binario").attr("disabled",true);
    $("#resuelvo").attr("disabled",true);

    $("#inicio").css('background', color_des);
    $("#entrar").css('background',color_act);
    $("#generar").css('background',color_act);
    $("#celda_ale").css('background', color_des);
    $("#celda_act").css('background', color_des);
    $("#compruebo_celdas").css('background', color_des);
    $("#compongo_binario").css('background', color_des);
    $("#resuelvo").css('background', color_des);

    $("#pausa").attr("disabled", true);
    $("#pausa").css('background', color_des);
    $("#reiniciar").attr("disabled", true);
    $("#reiniciar").css('background', color_des);
    return
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> ponemos el menu a componer
*/
function menu_componer(){
    $('#inicio').attr("disabled", false);    
    $("#entrar").attr("disabled", true);
    $("#generar").attr("disabled", true);
    $("#celda_ale").attr("disabled",true);
    $("#celda_act").attr("disabled",true);
    $("#compruebo_celdas").attr("disabled",true);
    $("#compongo_binario").attr("disabled",false);
    $("#resuelvo").attr("disabled",true);
    
    $("#inicio").css('background', color_act);
    $("#entrar").css('background',color_des);
    $("#generar").css('background',color_des);
    $("#celda_ale").css('background', color_des);
    $("#celda_act").css('background', color_des);
    $("#compruebo_celdas").css('background', color_des);
    $("#compongo_binario").css('background', color_act);
    $("#resuelvo").css('background', color_des);
    $(':text')[0].focus();
    return;
}

/*
    Parametros >> nada
    Devolvemos >> nada
    Funcion    >> ponemos el menu a entrada datos
*/
function menu_entrada_datos(){
    $('#inicio').attr("disabled", false);
    $("#entrar").attr("disabled", true);
    $("#generar").attr("disabled", true);
    $("#celda_ale").attr("disabled",false);
    $("#celda_act").attr("disabled",false);
    $("#compruebo_celdas").attr("disabled",true);
    $("#compongo_binario").attr("disabled",false);
    $("#resuelvo").attr("disabled",false);

    $("#inicio").css('background', color_act);
    $("#entrar").css('background', color_des);
    $("#generar").css('background', color_des);
    $("#celda_ale").css('background', color_act);
    $("#celda_act").css('background', color_act);
    $("#compruebo_celdas").css('background', color_des);
    $("#compongo_binario").css('background', color_act);
    $("#resuelvo").css('background', color_act);
    $(':text')[0].focus();
    return     
}

/*
    parametros >> ninguno
    devolucion >> un array con todas las celdas que hasta ese momento es han podido estampar de forma segura. 
    funcion    >> Hacemos un recorrido de las celdas del binario de forma que aquellas celdas que esten en blanco 
    observamos que valor podria ir, en funcion de las dos celdas a su izquierda y las dos de su derecha, de su fila
    y observando que valor podria ir, en funcion de las dos celdas superiores y las dos inferiores, de su columna
    se pueden dar tres casos:
    .-si en los dos casos nos da el mismo valor, ese sera el que debemos estampar, 
    .-si los valores son diferentes deberemos estampar un blanco
    .-si no se puede estampar ninguno, significa que se produce un error.
*/
function estampar_celdas_seguras(){
    let salida = true; let hacer; let vol = 0;
    let tcelda; let cosa;
    let celdas_blancas_inicio = hay_celdas_en_blanco();
    let celdas_blancas_fin; let ArrayCeldasSeguras = [];
    if(celdas_blancas_inicio != 0){
        hacer = true;
        while(hacer){
            $("#comen").val(`vueltas >> ${vol}`);
            for (let celda = 0; celda < 100; celda++){
                tcelda = n(celda);
                if($('#' + tcelda).val() == ' '){
                    cosa = estampar_un_valor_en_la_celda_segun_valores_de_sus_celdas_contiguas(celda)
                    if (cosa == '1'){
                        $("#" + tcelda).val('1');
                    }else if(cosa == '0'){
                        $("#" + tcelda).val('0');
                    }else if (cosa == ' '){
                        $("#comen").val("Valor >> ' '");
                    }else{
                        $("#comen").val(cosa);
                        //console.info(cosa);
                        salida = false;
                        hacer = false;
                        break;
                    }
                }
            }
            if(hacer){
                for(let num = 0; num < 10; num++){
                    valor = hay_mas_de_cinco_ceros_o_unos_en_una_fila(num);
                    if(valor[2]){
                        //console.info(`Hay mas de cinco unos o ceros en la fila ${num}`);
                        hacer = false;
                        salida = false;
                        break;
                    }else{
                        valor = hay_mas_de_cinco_ceros_o_unos_en_una_columna(num);
                        if(valor[2]){
                            //console.info(`Hay mas de cinco unos o ceros en la columna ${num}`);
                            hacer = false;
                            salida = false;
                            break;
                        }
                    }
                }
                //resolvemos filas y columnas con cinco (ceros o unos en las filas o columnas)
                for(let num = 0; num < 100; num++){
                    cinco_ceros_o_unos_en_una_fila(num);
                }
            }
            if(hacer){
                celdas_blancas_fin = hay_celdas_en_blanco();
                if(celdas_blancas_inicio == celdas_blancas_fin){
                    hacer = false;
                    salida = true;
                    ArrayCeldasSeguras = [];
                    for(nx=0; nx<100; nx++){
                        tcelda = n(nx);
                        ArrayCeldasSeguras[nx] = $("#" + tcelda).val();
                    }
                    
                }else{
                    celdas_blancas_inicio = celdas_blancas_fin;
                } 
            }
            vol++;
        }
    }
    return ArrayCeldasSeguras;
}

/*
    parametros >> fila: es un array con los numeros de las filas a controlar
    Devolucion >> en un array de tres elementos devuelve por este orden: numero de ceros, numeros de unos y true 
    si no hay ni mas de cinco ceros ni mas de cinco unos en caso contrario devuelve false
    funcion    >> contamos los ceros y unos de una fila
*/
function hay_mas_de_cinco_ceros_o_unos_en_una_fila(fila){
    let columnas = [0,1,2,3,4,5,6,7,8,9];
    let tcelda; let unos; let ceros;
    let salida = false;
    fila = Math.trunc(fila);
    if(fila > -1 && fila < 10 ){
        unos = 0; ceros = 0;
        for(let nco of columnas){
            tcelda = n((fila*10) + nco);
            if($("#" + tcelda).val() == '1'){unos++;}
            if($("#" + tcelda).val() == '0'){ceros++;}
            if(unos > 5 || ceros > 5 ){
                salida = true;
                //console.info(`Ceros ${ceros}  Unos ${unos} en la fila ${fila}`);
                break;
            }
        }
    }else{
        salida = true;
        //console.info(`Se ha pasado un valor erroneo de fila (${fila}) debe estar entre (0 y 9)`);
    }
    return [ceros, unos, salida];
}

/*
    parametros >> columna: es un array con los numeros de las columnas a controlar
    Devolucion >> en un array de tres elementos devuelve por este orden: numero de ceros, numeros de unos y true 
    si no hay ni mas de cinco ceros ni mas de cinco unos en caso contrario devuelve false
    funcion    >> contamos los ceros y unos de una columna 
*/
function hay_mas_de_cinco_ceros_o_unos_en_una_columna(columna){
    let filas = [0,1,2,3,4,5,6,7,8,9];
    let tcelda; let unos; let ceros;
    let salida = false;
    columna = Math.trunc(columna);
    if(columna > -1 && columna < 10 ){
        unos = 0; ceros = 0;
        for(let nfi of filas){
            tcelda = n((nfi*10) + columna);
            if($("#" + tcelda).val() == '1'){unos++;}
            if($("#" + tcelda).val() == '0'){ceros++;}
            if(unos > 5 || ceros > 5 ){
                salida = true;
                //console.info(`Ceros ${ceros}  Unos ${unos} en la columna ${columna}`);
                break;
            }
        }
    }else{
        salida = true;
        //console.info(`Se ha pasado un valor erroneo de columna (${columna}) debe estar entre (0 y 9)`);
    }
    return [ceros, unos, salida];
}

/*
    parametro: >> celda:es el numero de celda del (0 al 99) que queremos controlar
    devolucion >> true  si es correcta a las normas del sudoku y no contribulle a que se genere mas de 5 unos o ceros
    en la fila y columnas a las que pertenece, en caso contrario devuelve false
    funcion    >> comprobamos que el valor sea el correcto segun sus dos celdas adyacentes a la izq, dcha, arriba,abajo, y 
    que no genere mas de 5 ceros ni unos en la fila y columna a la que pertenece
*/ 
function es_correcto_el_valor_de_la_celda(celda){
    let salida = true;
    let nfi; let nco; let tcelda; let tvalor;
    let ValorFila; let ValorColumna;
    celda = Math.trunc(celda); //devolvemos la parte entera de un numeros sin redondear
    if(celda > -1 && celda < 100){
        tcelda = n(celda);
        nfi = parseInt(tcelda[0]); nco = parseInt(tcelda[1]); 
        tvalor = $("#" + tcelda).val();
        if(tvalor != ' '){
            if (aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda,tvalor) == false){
                //console.info(`La celda ${tcelda} con valor ${tvalor} no es correcta`);
                salida = false;
            }else{
                ValorFila = hay_mas_de_cinco_ceros_o_unos_en_una_fila(nfi)
                if(ValorFila[2] == true){
                    //console.info(`Tenemos mas de cinco ceros o unos en la fila ${nfi}`);
                    salida = false;
                }else{
                    ValorColumna = hay_mas_de_cinco_ceros_o_unos_en_una_columna(nco)
                    if(ValorColumna[2] == true){
                        //console.info(`Tenemos mas de cinco ceros o unos en la columna ${nco}`);
                        salida = false;
                    }
                }
            }
        }
    }
    return salida;
}

/*
    parametros >> debemos pasarle un valor numerico que debe estar entre 0 y 99
    devolucion >> devolvemos una cadena que puede ser "0", "1", " ", o bien un texto que indica el fallo 
    funcion    >> dada una celda, buscamos que valor de texto entre el '0','1',' ', que  podamos estampar
    segun sean sus celdas adyacentes en su fila y su columna. Si se dan valores contradictorios, lo indicara
    devolviendo un texto explicativo
*/
function estampar_un_valor_en_la_celda_segun_valores_de_sus_celdas_contiguas(celda){
    let fi; let co; let cmenos1; let cmenos2; let cmas1; let cmas2; let a1; let a2; let s1; let s2;
    let estampo; let estampo_c; let estampo_f; 
    celda = Math.trunc(celda); //devolvemos la parte entera de un numeros sin redondear
    tcelda = n(celda);
    if(celda > -1 && celda < 100){
        fi = parseInt(tcelda[0], 10);
        co = parseInt(tcelda[1], 10);
        // controlamos las columnas de la fila a la que pertenece la celda
        if(co == 0){
            cmas1 = n((fi*10)+co+1);
            cmas2 = n((fi*10)+co+2);
            s1 = $("#" + cmas1).val();
            s2 = $("#" + cmas2).val();
            if ((s1 == '0' &&  s2 == '0') || (s1 == '1' && s2 == '1')){
                if ( s1 == '1'){
                    estampo = '0';
                }else{
                    estampo = '1';
                }    
            }else{
                estampo = ' ';
            }
        }else if(co == 1) {
            cmenos1 = n((fi*10)+co-1);
            cmas1 = n((fi*10)+co+1);
            cmas2 = n((fi*10)+co+2);
            a1 = $("#" + cmenos1).val();
            s1 = $("#" + cmas1).val();
            s2 = $("#" + cmas2).val();
            if( (s1 == '1' && s2 == '1') || (a1 == '1' && s1 == '1')){
                estampo = '0'
            }else if( (s1 == '0' && s2 == '0') || (a1 == '0' && s1 == '0')){
                estampo = '1';
            }else{
                estampo = ' ';
            }
        }else if(co > 1 && co < 8){
            cmenos1 = n((fi*10)+co-1);
            cmenos2 = n((fi*10)+co-2);
            cmas1 = n((fi*10)+co+1);
            cmas2 = n((fi*10)+co+2);
            a1 = $("#" + cmenos1).val();
            a2 = $("#" + cmenos2).val();
            s1 = $("#" + cmas1).val();
            s2 = $("#" + cmas2).val();            
            if ((a1 == '0' &&  a2 == '0') && (s1 == '1' && s2 == '1')){
                estampo = `La celda ${celda} no admite ni el cero ni el uno`;
                //console.info(`La celda ${celda} no admite ni el cero ni el uno`);
            }else if ((a1 == '1' &&  a2 == '1') && (s1 == '0' && s2 == '0')){
                estampo = `La celda ${celda} no admite ni el cero ni el uno`;
                //console.info(`La celda ${celda} no admite ni el cero ni el uno`);
            }else if ((a1 == '0' &&  a2 == '0') || (s1 == '0' && s2 == '0')){
                estampo = '1';    
            }else if ((a1 == '0') && (s1 == '0')){
                estampo = '1';    
            }else if ((a1 == '1' &&  a2 == '1') || (s1 == '1' && s2 == '1')){
                estampo = '0';
            }else if ((a1 == '1') && (s1 == '1')){
                estampo = '0';   
            }else{
                estampo = ' ';
            }
        }else if(co == 8){
            cmenos1 = n((fi*10)+co-1);
            cmenos2 = n((fi*10)+co-2);
            cmas1 =   n((fi*10)+co+1);
            a1 = $("#" + cmenos1).val();
            a2 = $("#" + cmenos2).val();
            s1 = $("#" + cmas1).val();
            if( (a1 == '1' && a2 == '1') || (a1 == '1' && s1 == '1')){
                estampo = '0';
            }else if( (a1 == '0' && a2 == '0') || (a1 == '0' && s1 == '0')){
                estampo = '1';
            }else{
                estampo = ' ';
            }
        }else if( co == 9){       
            cmenos1 = n((fi*10)+co-1);
            cmenos2 = n((fi*10)+co-2);
            a1 = $("#" + cmenos1).val();
            a2 = $("#" + cmenos2).val();
            if ((a1 == '0' &&  a2 == '0') || (a1 == '1' && a2 == '1')){
                if ( a1 == '1'){
                    estampo = '0';
                }else{
                    estampo = '1';
                } 
            }else{
                estampo = ' ';
            }
        }
        // controlamos las filas de la columna a la que pertenece la celda
        if (estampo.length < 10){ 
            estampo_f = estampo;
            if(fi == 0){
                cmas1 = n((fi*10)+10+co);
                cmas2 = n((fi*10)+20+co);
                s1 = $("#" + cmas1).val();
                s2 = $("#" + cmas2).val();
                if ((s1 == '0' &&  s2 == '0') || (s1 == '1' && s2 == '1')){
                    if ( s1 == '1'){
                        estampo = '0';
                    }else{
                        estampo = '1';
                    }    
                }else{
                    estampo = ' ';
                }
            }else if(fi == 1) {
                cmenos1 = n((fi*10)-10+co);
                cmas1 = n((fi*10)+10+co);
                cmas2 = n((fi*10)+20+co);
                a1 = $("#" + cmenos1).val();
                s1 = $("#" + cmas1).val();
                s2 = $("#" + cmas2).val();
                if( (s1 == '1' && s2 == '1') || (a1 == '1' && s1 == '1')){
                    estampo = '0'
                }else if( (s1 == '0' && s2 == '0') || (a1 == '0' && s1 == '0')){
                    estampo = '1';
                }else{
                    estampo = ' ';
                }
            }else if(fi > 1 && fi < 8){
                cmenos1 = n((fi*10)-10+co);
                cmenos2 = n((fi*10)-20+co);
                cmas1 =   n((fi*10)+10+co);
                cmas2 =   n((fi*10)+20+co);
                a1 = $("#" + cmenos1).val();
                a2 = $("#" + cmenos2).val();
                s1 = $("#" + cmas1).val();
                s2 = $("#" + cmas2).val();            
                if ((a1 == '0' &&  a2 == '0') && (s1 == '1' && s2 == '1')){
                    estampo = `La celda ${celda} no admite ni el cero ni el uno`;
                    //console.info(`La celda ${celda} no admite ni el cero ni el uno`);
                }else if ((a1 == '1' &&  a2 == '1') && (s1 == '0' && s2 == '0')){
                    estampo = `La celda ${celda} no admite ni el cero ni el uno`;
                    //console.info(`La celda ${celda} no admite ni el cero ni el uno`);
                }else if ((a1 == '0' &&  a2 == '0') || (s1 == '0' && s2 == '0')){
                    estampo = '1';    
                }else if ((a1 == '0') && (s1 == '0')){
                    estampo = '1';    
                }else if ((a1 == '1' &&  a2 == '1') || (s1 == '1' && s2 == '1')){
                    estampo = '0';
                }else if ((a1 == '1') && (s1 == '1')){
                    estampo = '0';    
                }else{
                    estampo = ' ';
                }
            }else if(fi == 8){
                cmenos1 = n((fi*10)-10+co);
                cmenos2 = n((fi*10)-20+co);
                cmas1 =   n((fi*10)+10+co);
                a1 = $("#" + cmenos1).val();
                a2 = $("#" + cmenos2).val();
                s1 = $("#" + cmas1).val();
                if( (a1 == '1' && a2 == '1') || (a1 == '1' && s1 == '1')){
                    estampo = '0';
                }else if( (a1 == '0' && a2 == '0') || (a1 == '0' && s1 == '0')){
                    estampo = '1';
                }else{
                    estampo = ' ';
                }
            }else if( fi == 9){       
                cmenos1 = n((fi*10)-10+co);
                cmenos2 = n((fi*10)-20+co);
                a1 = $("#" + cmenos1).val();
                a2 = $("#" + cmenos2).val();
                if ((a1 == '0' &&  a2 == '0') || (a1 == '1' && a2 == '1')){
                    if ( a1 == '1'){
                        estampo = '0';
                    }else{
                        estampo = '1';
                    }
                }else{
                    estampo = ' ';
                }
            }
            if(estampo.length < 10){
                estampo_c = estampo;
                if (estampo_c == '0' && estampo_f  == '1'){
                    estampo =  `Celda ${celda} con datos contrarios  estampo_c ${estampo_c} estampo_f ${estampo_f}`;
                    //console.info(`Celda ${celda} con datos contrarios  estampo_c ${estampo_c} estampo_f ${estampo_f}`);
                }else if (estampo_c == '1' &&  estampo_f == '0'){
                    estampo =  `Celda ${celda} con datos contrarios estampo_c ${estampo_c} estampo_f ${estampo_f}`;
                    //console.info(`Celda ${celda} con datos contrarios estampo_c ${estampo_c} estampo_f ${estampo_f}`);
                }else if (estampo_c == ' ' && estampo_f == ' '){  
                    estampo = ' ';
                }else if (estampo_c == ' ' && estampo_f == '0'){ 
                    estampo = '0';
                }else if (estampo_c == '0' && estampo_f == ' '){        
                    estampo = '0';
                }else if (estampo_c == '0' && estampo_f == '0'){        
                    estampo = '0';
                }else if (estampo_c == '1' && estampo_f == ' '){        
                    estampo = '1';
                }else if (estampo_c == ' ' && estampo_f == '1'){        
                    estampo = '1';
                }else if (estampo_c == '1' && estampo_f == '1'){        
                    estampo = '1';
                }
            }    
        }
    }else{
        //console.info(`Celda ${celda} el valor debe estar entre 0 y 99`);
        estampo = `el valor debe estar entre 0 y 99`
    }
    return estampo;
}

/*
    parametros >> le pasamos un numeros de fila cuyo valor numerico que debe estar entre 0 y 9
    devolucion >> nada 
    funcion    >> dada una fila, buscamos en ella cinco unos o ceros, en el caso de encontrarlos sabemos que las demas 
    celdas de la fila deben contener lo contrario de los cinco que hemos encontrado. En caso de no encontrar, no haremos nada.
*/
function cinco_ceros_o_unos_en_una_fila(fila){
    let numeros = [0,1,2,3,4,5,6,7,8,9];
    let unosf; let cerosf; let unosc; let cerosc;let tceldaf; let tceldac;
    let salida = true; let ponerf; let ponerc;
    unosf = 0; cerosf = 0; unosc = 0; cerosc = 0;
    for (let num of numeros){
        tceldaf = n((fila*10)+num);
        tceldac = n(fila + num * 10);
        // la fila
        if ($("#" + tceldaf).val() == '1'){
            unosf++;
        }else if($("#" + tceldaf).val() == '0'){
            cerosf++;
        }
        // la columna
        if ($("#" + tceldac).val() == '1'){
            unosc++;
        }else if($("#" + tceldac).val() == '0'){
            cerosc++;
        }
    }
    if(cerosf > 5 || unosf > 5 || cerosc > 5 || unosc > 5){
        salida = false;
    }else{
        ponerf = '';
        if(cerosf == 5){
            ponerf = '1';
        }else if(unosf == 5){
            ponerf = '0';
        }
        //relleno la fila
        if(ponerf == '0' || ponerf == '1'){
            for (let num of numeros){
                tcelda = n((fila*10) + num);
                if($("#" + tcelda).val() == ' '){
                    if(aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, ponerf)){
                        $("#" + tcelda).val(ponerf);
                    }
                }
            }
        }
        ponerc = '';
        if(cerosc == 5){
            ponerc = '1';
        }else if(unosc == 5){
            ponerc = '0';
        }
        //relleno la columna
        if(ponerc == '0' || ponerc == '1'){
            for (let num of numeros){
                tcelda = n(fila + (num * 10));
                if($("#" + tcelda).val() == ' '){
                    if(aprovar_el_valor_de_la_celda_segun_valores_de_sus_celdas_contiguas_en_la_fila_columna(tcelda, ponerc)){
                        $("#" + tcelda).val(ponerc);
                    }
                }
            }
        }
    }
    return
}

/*  Parametros >> nada
    Devolvemos >> un array de 10 elementos cada elemento contendra un array con los numeros de filas  que son posibles 
    a la fila que tratamos del binario.
    Funcion    >>teniendo el binario relleno hasta no poder estampar ninguna celda mas con seguridad.
    buscamos todas las filas posibles en el array de (filas_posibles) para cada una de las filas del binario relleno 
    hasta este momento( pues esta relleno con las celdas seguras, las dudosas no se han rellenado). 
    Guardamos por cada fila, los numeros de filas posibles para cada una de ellas, en un array de 10 elementos, de (0 a 9)    
*/
function guardo_filas_posibles(){
    let tcelda; let numeros_de_las_filas = []; fila_binario = [];let numeros_fila_aceptados;
    let blancos; let tvalor;
    for(nfi of [0,10,20,30,40,50,60,70,80,90]){
        blancos = 0;
        for(let nco of [0,1,2,3,4,5,6,7,8,9]){
            tcelda = n(nfi + nco);
            tvalor = $('#' + tcelda).val();
            if(tvalor == ' '){
                blancos++;
            }
            fila_binario[nco] = tvalor;
        }
        if(blancos > 0 ){
            posi = 0;
            numeros_fila_aceptados = [];
            for(fila_posible of filas_posibles){
                fila_desechada = false
                for(let nco of [0,1,2,3,4,5,6,7,8,9]){
                    if(fila_binario[nco] != ' '){
                        if(fila_binario[nco] != fila_posible[nco].toString()){
                                fila_desechada = true;
                            break
                        }
                    }
                }
                if(fila_desechada == false){
                    numeros_fila_aceptados.push(posi);
                }
                posi++;
            }
            numeros_de_las_filas.push(numeros_fila_aceptados);
        }else{
            numeros_de_las_filas.push([]);    
        }
    }
    return numeros_de_las_filas;
}
