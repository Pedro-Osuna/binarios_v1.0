var id_ultimo;
var color_des = '#ABABAB';   // color cuando el boton esta desactivado gris
var color_act = '#86CA65';   // color cuando el boton esta activado verde mas fuerte


$(document).ready(function(){
    //posiciono el foco en el primer campo de type="text"
    $(':text')[0].focus();
    //control de la tecla pulsada en campos de type="text"
    $(":text").keyup(function(e) {
        //let fi; let co; let fico;
        let indice = $(this).index();  //obtenemos el indice de la celda actual
        (e.keyCode)?k=e.keyCode:k=e.which;
        if (k==13 || k==39){   //intro y flecha a la derecha
            if (indice == 99){
                $(":text")[0].focus(); 
            }else{   
                $(this).next().focus();
            }
        }else if (k==37){      // flecha a la izq
            if (indice == 0){
                $(":text")[99].focus();    
            }else{
                $(this).prev().focus();
            }
        }else if (k==40){      // flecha abajo
            if (indice > 89){
                $(":text")[indice - 90].focus();
            }else{
                $(":text")[indice + 10].focus();
            }
        }else if (k==38){      // flecha arriba 
            if (indice < 10){
                $(":text")[indice + 90].focus(); 
            }else{
                $(":text")[indice - 10].focus();
            }
        }else if (k==48 || k==49){   //
            valor = String.fromCharCode(k);
            if($(this).attr('readonly') != 'readonly'){
                $(this).val(valor);
            }
            if(estoy_componiendo && $(this).attr('readonly') != 'readonly'){
                $(this).css('background', color_componer);
            }
        }else if (k==8){ 
            ff='';
        } else { 
            $(this).val(" ");
        }
    });
    //evitamos que las celdas en estado de solo lectura sean borradas con la tecla backspace.
    $('input').keydown(function(e) {
        if(e.which === 8){ 
            if($("#" + i).attr('readonly') == 'readonly'){
                return false; 
            }
        }; 
    });
    // detectamos la celda donde se hace click y guardamos su indice  
    $("#entradas").click(function(event) {
        id_ultimo = event.target.id;
        // si la celda es menor a 10 solo pasaremos el numeros como cadena
        if(parseInt(id_ultimo) < 10 ){
            id_ultimo = id_ultimo[1];
        }
    });
    // Visualizamos modal para elegir cantidad de numeros iniciales para el binario
    $("#dat_ini").dialog({
        resizable: false,
        height: "auto",
        width: 310,
        autoOpen: false,
        modal: true,
        buttons: {
            "Aceptar": function () {
                numero_celdas_iniciales = parseInt($("#ini").val(),10);
                $("#generar").css("background", color_des);
                $("#entrar").css("background", color_des);
                $("#generar").attr("disabled", true);
                $("#entrar").attr("disabled", true);
                $(this).dialog("close");
                binario_aleatorio(numero_celdas_iniciales);
            }
        }
    });
    $( "#generar" ).on( "click", function() {
        $("#mod").val("Si la elección de celdas iniciales es de (20 a 23) o (35 a 40) la selección" +
        " de las\n" +"celdas se pueden demorar debido a la complejidad de selección ");
        $( "#dat_ini" ).dialog( "open" );
    });
    // visualizo modal para tema de componer
    $("#comp_ini").dialog({
        resizable: false,
        height: "auto",
        width: 310,
        autoOpen: false,
        modal: true,
        buttons: {
            "Validar": function () {
                //alert('Valido');
                $(this).dialog("close");
                ccompongo('validar');
            },
            "Borrar": function(){
                //alert("Borro");
                $(this).dialog("close");
                ccompongo('borrar');    
            }
        }
    });
    $( "#compongo_binario" ).on( "click", function() {
        if($("#compongo_binario").val() == "Dejar de componer"){
            $("#comp_mod").val("Si desea conservar las celdas pulse Validar " +
            "\n" +"En caso contrario pulse Borrar");
            $( "#comp_ini" ).dialog( "open" );

            $("#compongo_binario").val("Componer");
        }else{
            menu_componer();
            $('#entradas input[type=text]').each(function(){
                if ($(this).css("background-color")  == 'rgb(169, 231, 190)' && $(this).val() != ' '){   
                    $(this).attr("readonly", true); 
                }    
            });
            estoy_componiendo = true;

            $("#compongo_binario").val("Dejar de componer");
        }
    });
    //Detecto la pulsacion de dobleclick
    $('#entradas input[type=text]').dblclick(function(){
        if($(this).attr('readonly') != 'readonly'){
            if($(this).val() == ' '){
                $(this).val("0");
            }else if($(this).val() == '0'){
                $(this).val("1");    
            }else if($(this).val() == '1'){
                $(this).val(' ');        
            }
        }
        //alert("has hecho doble click en el párrafo con id=entradas");
    });
}); 