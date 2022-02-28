console.log(localStorage.getItem('datosTotales'));
$(document).ready( function(){

    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    $('#date').append(date);
    let datos = JSON.parse(localStorage.getItem('datosTotales'));

    $('.col-2').css(`background`, `no-repeat center/100% url(../img/${datos[0].moto}.jpg)`);
    $('#usuario').append(`<p> ${datos[0].usuario} </p>`);
    $('#vehiculo').append(datos[0].moto);
    console.log(datos);
    $('#alquiler').append(`$ ${datos[1]}`);
    $('#seguro').append(`$ ${datos[2]}`);
    $('#total').append(`$ ${datos[3]}`);
    $('#dias').append(`${datos[0].dias} dias`);
})