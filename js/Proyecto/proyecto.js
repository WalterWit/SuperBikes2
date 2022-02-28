// HOLA MUNCO

$(document).ready( function() { 
    $('#main').append('<div id="containerIniciar"><button type="button" id="iniciar" class="botones"> Iniciar </button></div>')
    window.setTimeout(function(){
        $('#text').append('<p class="prueba">En <b>SuperBikes</b> ofrecemos servicio de alquiler de motos de alta gama. Contamos con servicio de translado de vehiculo, seguro y alquiler de equipacion. Tambien contamos con comunicacion las 24hs para los usuarios ante cualquier consulta.</p>')
        const titulo = document.querySelector('.prueba');
        const tituloCont = titulo.textContent;
        const tituloLetras = tituloCont.split("");
        titulo.textContent = "";
        for (let i = 0; i < tituloLetras.length; i++){
            titulo.innerHTML += '<span class="p">'+ tituloLetras[i]+'</span>';
        }
        console.log(tituloLetras)
        let char = 0;
        let timer = setInterval(onTick, 30);
        function onTick(){
            const span = titulo.querySelectorAll('span')[char];
            span.classList.add('fadeIn');
            char++;
            if(char === tituloLetras.length){
                complete();
                return;
            }
        }
        function complete(){
            clearInterval(timer);
            timer = null;
        }
    }, 2000);
    window.setTimeout(function(){
        $('#iniciar').animate({opacity: .8}), 1000
    }, 2500);
    $('#iniciar').click( function (){
        $('#text').fadeOut('slow')
        $('#containerVideo').fadeOut('slow');
        $('#section').fadeIn('slow');
        $('#iniciar').hide();
        $('#main').css("justify-content", "flex-start")
        $('html').css('background', 'fixed center/110% url(../img/fondo2.jpg)')
    })
    $("#generar").click( function() { 
        // ----------------------------se da estilos y se vacian datos previos en cada uso del boton "generar".
        $('#containerForm').css('border-right', 'solid 1px white')
        $('#preview').show();  
        $('#containerVideo').remove();
        $('#msj, #resultado, #containerIniciar').empty();
        $('#section').css('display', 'inline-flex');
        $('#resultado').hide();
        if(validaForm() == true){
            // ---------------------------------si la validacion es correcta se muestran los datos del usuario.
            $('#msj').hide();
            let datos = {usuario: $("#usuario").val(), moto: $("#vehiculo").val(), dias: $("#dias").val()};
            console.log(datos);
            $('#resultado').append('<div id="resultadoList"><ul id="list1"></ul></div>');
            $('#resultado').css('background-image', 'url(../img/' + datos.moto + '.jpg)');
            $.each(datos, function (ind, elem){
                $('#list1').append('<h3 id="encabezado">' + ind + '</h3><li>' + elem +'</li>');
            })
            console.log(datos.moto)
            let alquiler = costo(datos.moto) * datos.dias;
            console.log(alquiler);
            let seguro = alquiler * 12 / 100;
            console.log(seguro)
            $('#resultadoList').append(`<ul id='list2'><li style="color: #DE3724;">${datos.dias} dias:</li><li>$ ${alquiler}</li><li style="color: #DE3724;">Seguro:</li><li>$ ${seguro}</li></ul>`)
            let total = alquiler + seguro;
            $('#resultado').slideDown('slow');
            $('#resultado').append('<h2 id="total"> Costo: $' + total + '</h2>');
            // $('#containerDatos').append(`<button type="button" id="confirmar" class="botones"> Confirmar </button>`)
            
            $('#containerIniciar').append('<a href="../html/facturacion.html"><button type="button" id="continuar" class="botones"> Continuar </button></a>')
            window.setTimeout(function(){
                $('#continuar').animate({opacity: ".8"}, 1000)
            }, 2000);
            const datos2 = [datos, alquiler, seguro, total];
            const datosJson = JSON.stringify(datos2);
            localStorage.setItem('datosTotales', datosJson);
            console.log(localStorage.getItem('datosTotales'));
            $('#continuar').click(function (){

            })

        }
    });
    
});

// --------------------------funciones.

// ----------------------validar formulario.
function validaForm(){
    if($("#usuario").val() == ""){
        $('#msj').append('<h2>Debe ingresar un nombre de usuario!</h2>').fadeIn('fast');
        $("#usuario").focus();
        return false;
    }
    if($("#vehiculo").val() == 0){
        $('#msj').append('<h2>Debe seleccionar un vehiculo!</h2>').fadeIn('fast');
        $("#vehiculo").focus();
        return false;
    }
    if($("#dias").val() == ""){
        $('#msj').append('<h2>Debe indicar una cantidad de dias!</h2>').fadeIn('fast');
        $("#dias").focus();
        return false;
    }
    if(!$("#check").is(":checked")){
        $('#msj').append('<h2>Debe aceptar las bases y condiciones!</h2>').fadeIn('fast');
        return false;
    }
    return true;
}

// --------------------------------costo segun vehiculo.
function costo (a) {
    if (a == "YZFR1"){
        return 3000;
    }
    if (a == "PanigaleV4"){
        return 4000;
    }
    if (a == "Brutale1000"){
        return 6000;
    }
}

