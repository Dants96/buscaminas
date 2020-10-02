function crearCronometro(display_id){
    var objeto = {};
    objeto.horas = 0;
    objeto.minutos = 0;
    objeto.segundos = 0;
    objeto.ic = 0;
    document.querySelector("#"+display_id).innerHTML = "00 : 00"

    objeto.iniciar = function () {
        pintar();
        objeto.ic = setInterval(pintar, 1000);
    }

    objeto.detener = function(){
        clearInterval(objeto.ic);
    }

    objeto.reiniciar = function(){
        objeto.horas = 0;
        objeto.minutos = 0;
        objeto.segundos = 0;
        pintar();
    }

    function pintar(){
        if(objeto.segundos > 59){objeto.minutos += 1; objeto.segundos = 0}
        if(objeto.minutos > 59){objeto.horas += 1; objeto.minutos = 0}

        let s_out = (objeto.segundos < 10)? "0" + objeto.segundos: objeto.segundos;
        let m_out = (objeto.minutos < 10)? "0" + objeto.minutos: objeto.minutos;
        let h_out = (objeto.horas < 10)? "0" + objeto.horas: objeto.horas;
        
        let pantalla = document.querySelector("#"+display_id);
        if(objeto.horas == 0){
            pantalla.innerHTML = m_out + " : " + s_out;
        }else{pantalla.innerHTML = h_out + " : " + m_out + " : " + s_out;}
        
        objeto.segundos += 1;
    }

    return objeto;
}
