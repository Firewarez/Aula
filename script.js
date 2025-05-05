let botao = document.getElementById("button");
let contador = 0;
let contadorTexto = document.getElementById("contador");
let contadorDiv = document.getElementById("contadora");

botao.addEventListener("click", function() {

    contador++;
    contadorDiv.style.display = "block";
    contadorTexto.innerHTML = contador;
    console.log(contador);

});