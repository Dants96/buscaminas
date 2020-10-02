function crearCronometro(){
    var objeto = {};
    objeto.horas = 0;
    objeto.minutos = 0;
    objeto.segundos = 0;

    objeto.iniciar = function () {
        pintar();
        ic = setInterval(pintar, 1000);
    }

    objeto.detener = function(){
        clearInterval(ic);
    }

    objeto.reiniciar = function(){
        objeto.detener();
        objeto.horas = 0;
        objeto.minutos = 0;
        objeto.segundos = 0;
    }

    function pintar(){
        if(objeto.segundos > 59){objeto.minutos += 1; objeto.segundos = 0}
        if(objeto.minutos > 59){objeto.horas += 1; objeto.minutos = 0}

        let s_out = (objeto.segundos < 10)? "0" + objeto.segundos: objeto.segundos;
        let m_out = (objeto.minutos < 10)? "0" + objeto.minutos: objeto.minutos;
        let h_out = (objeto.horas < 10)? "0" + objeto.horas: objeto.horas;

        console.log(h_out + " : " + m_out + " : " + s_out);

        objeto.segundos += 1;
    }

    return objeto;
}

window.onload = function (){
    cronometro = new crearCronometro();
    cronometro.iniciar();
}