//regals de juego
const buscaminas = {
    numMinasTotales: 30,
    numMinasEncontradas: 0,
    numFilas: 15,
    numColumnas: 15,
    aCamposMinas: []
}

function inicio() {
    buscaminas.numFilas = 10;
    buscaminas.numColumnas = 10;
    buscaminas.numMinasTotales = 12;
    pintarTablero();
    generarCampoMinasVacio();
    esparcirMinas();
    esparcirNumeros();
    ponerCarita();
}

function ponerCarita(){
    let boton = document.querySelector("#jugar");
    boton.removeEventListener("mouseover", function(){});
    boton.removeEventListener("mouseout", function(){});

    boton.innerHTML = ":)";
    boton.addEventListener("mouseover", function(){
        document.querySelector("#jugar").innerHTML = ":o";
    });
    boton.addEventListener("mouseout", function(){
        document.querySelector("#jugar").innerHTML = ":)";
    });
}

function pintarTablero() {
    borrarTablero();

    let tablero = document.querySelector("#tablero");

    // cambiar las variables css desde  javascript
    document.querySelector("html").style.setProperty("--num-filas", buscaminas.numFilas);
    document.querySelector("html").style.setProperty("--num-columnas", buscaminas.numColumnas);

    for (let i = 0; i < buscaminas.numFilas; i++) {
        for (let j = 0; j < buscaminas.numColumnas; j++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "f" + i + "_c" + j);
            newDiv.dataset.fila = i;
            newDiv.dataset.columna = j;
            newDiv.addEventListener("contextmenu", marcar);
            newDiv.addEventListener("click", destapar);

            tablero.appendChild(newDiv);
        }
    }
}

function borrarTablero() {
    let tablero = document.querySelector("#tablero");
    while (tablero.firstChild) {
        tablero.firstChild.removeEventListener("contextmenu", marcar);
        tablero.firstChild.removeEventListener("click", destapar);
        tablero.removeChild(tablero.firstChild);
    }
}

function marcar(miEvento) {
    if (miEvento.type === "contextmenu") {
        console.log(miEvento);
        let casilla = miEvento.currentTarget;
        miEvento.stopPropagation();
        miEvento.preventDefault();

        let fila = casilla.dataset.fila;
        let columna = casilla.dataset.columna;

        if (fila >= 0 && columna >= 0 && fila < buscaminas.numFilas && columna < buscaminas.numColumnas) {
            if (casilla.classList.contains("fa-flag")) {
                casilla.classList.remove("fa-flag");
                casilla.classList.add("fa-question");
                buscaminas.numMinasEncontradas--;
            } else if (casilla.classList.contains("fa-question")) {
                casilla.classList.remove("fa-question");
                casilla.classList.remove("fas");
            } else if (casilla.classList.length == 0) {
                casilla.classList.add("fas");
                casilla.classList.add("fa-flag");
                buscaminas.numMinasEncontradas++;
                if (buscaminas.numMinasEncontradas == buscaminas.numMinasTotales) {
                    resolverTablero(true);
                }
            }
        }
    }
}


function destapar(miEvento) {
    if (miEvento.type === "click") {
        let casilla = miEvento.currentTarget;
        let fila = casilla.dataset.fila;
        let columna = casilla.dataset.columna;

        destaparCasilla(fila, columna);
    }
}

function destaparCasilla(fila, columna) {
    fila = parseInt(fila);
    columna = parseInt(columna);
    console.log("destapando casilla [" + fila + "][" + columna + "]");


    if (fila > -1 && fila < buscaminas.numFilas && columna > -1 && columna < buscaminas.numColumnas) {
        let casilla = document.querySelector("#f" + fila + "_c" + columna);
        if (!casilla.classList.contains("destapado")) {
            if (!casilla.classList.contains("fa-flag")) {
                casilla.classList.add("destapado");
                casilla.innerHTML = buscaminas.aCamposMinas[fila][columna];
                casilla.classList.add("c" + buscaminas.aCamposMinas[fila][columna]);
                if (buscaminas.aCamposMinas[fila][columna] !== "B") {
                    if (buscaminas.aCamposMinas[fila][columna] == 0) {
                        destaparCasilla(fila - 1, columna - 1);
                        destaparCasilla(fila - 1, columna);
                        destaparCasilla(fila - 1, columna + 1);
                        destaparCasilla(fila, columna - 1);
                        destaparCasilla(fila, columna + 1);
                        destaparCasilla(fila + 1, columna - 1);
                        destaparCasilla(fila + 1, columna);
                        destaparCasilla(fila + 1, columna + 1);

                        casilla.innerHTML = "";
                    }
                } else if (buscaminas.aCamposMinas[fila][columna] == "B") {
                    casilla.innerHTML = "";
                    casilla.classList.add("fas");
                    casilla.classList.add("fa-bomb");
                    casilla.classList.add("sinmaracar");
                    resolverTablero(false);
                }
            }
        }
    }
}

//generar matriz del juego 
function generarCampoMinasVacio() {
    buscaminas.aCamposMinas = new Array(buscaminas.numFilas);
    for (let fila = 0; fila < buscaminas.numFilas; fila++) {
        buscaminas.aCamposMinas[fila] = new Array(buscaminas.numColumnas);
    }
}

function esparcirMinas() {
    let numMinasEsparcidas = 0;
    while (numMinasEsparcidas <= buscaminas.numMinasTotales) {

        let fila = Math.floor(Math.random() * buscaminas.numFilas);
        let columna = Math.floor(Math.random() * buscaminas.numColumnas);

        if (buscaminas.aCamposMinas[fila][columna] != "B") {
            buscaminas.aCamposMinas[fila][columna] = "B";
        }

        numMinasEsparcidas++;
    }
    console.log(buscaminas.aCamposMinas);
}

function contarMinasAlrededorCasilla(fila, columna) {
    let numeroMinasAlrededor = 0;

    for (let zFila = fila - 1; zFila <= fila + 1; zFila++) {
        for (let zColumna = columna - 1; zColumna <= columna + 1; zColumna++) {
            if (zFila > -1 && zFila < buscaminas.numFilas && zColumna > -1 && zColumna < buscaminas.numColumnas) {
                if (buscaminas.aCamposMinas[zFila][zColumna] == "B") {
                    numeroMinasAlrededor++;
                }
            }
        }
    }
    buscaminas.aCamposMinas[fila][columna] = numeroMinasAlrededor;
}

function esparcirNumeros() {
    for (let i = 0; i < buscaminas.numFilas; i++) {
        for (let j = 0; j < buscaminas.numColumnas; j++) {
            if (buscaminas.aCamposMinas[i][j] != "B") {
                contarMinasAlrededorCasilla(i, j);
            }
        }
    }
}

window.onload = function(){
    inicio();
    document.querySelector("#jugar").addEventListener("click", inicio);
}

function resolverTablero(are_u_wining_son) {
    for (let i = 0; i < buscaminas.numFilas; i++) {
        for (let j = 0; j < buscaminas.numColumnas; j++) {
            let casilla = document.querySelector("#f" + i + "_c" + j);
            if (buscaminas.aCamposMinas[i][j] == "B" && (!casilla.classList.contains("destapada") && !casilla.classList.contains("fa-flag"))) {
                casilla.innerHTML = "";
                casilla.classList.add("fas");
                casilla.classList.add("fa-bomb");
                casilla.classList.add("sinmaracar");
            } else if (buscaminas.aCamposMinas[i][j] == "B" && casilla.classList.contains("fa-flag")) {
                casilla.classList.add("correct");
               
            } else {
                casilla.removeEventListener("contextmenu", marcar);
                casilla.removeEventListener("click", destapar);
            }
        }
    }
    let boton = document.querySelector("#jugar");
    boton.removeEventListener("mouseover", function(){});
    boton.removeEventListener("mouseout", function(){});
    if(are_u_wining_son){
        boton.innerHTML = "B)";
        boton.addEventListener("mouseover", function(){
            document.querySelector("#jugar").innerHTML = "Bo";
        });
        boton.addEventListener("mouseout", function(){
            document.querySelector("#jugar").innerHTML = "B)";
        });
    }else{
        boton.innerHTML = "xc";
        boton.addEventListener("mouseout", function(){
            document.querySelector("#jugar").innerHTML = "xc";
        });
        boton.addEventListener("mouseover", function(){
            document.querySelector("#jugar").innerHTML = "xo";
        });
    }
}