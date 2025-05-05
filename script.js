let botao = document.getElementById("button");
let contador = 0;
let contadorTexto = document.getElementById("contador");
let contadorDiv = document.getElementById("contadora");
const infoIcon = document.getElementById("info-icon");
const infoBox = document.getElementById("info-box");

infoIcon.addEventListener("click", () => {
    infoBox.classList.toggle("show");
    if (infoBox.classList.contains("show")) {
        infoIcon.classList.remove("bi-info-circle");
        infoIcon.classList.add("bi-info-circle-fill");
    } else {
        infoIcon.classList.remove("bi-info-circle-fill");
        infoIcon.classList.add("bi-info-circle");
    }
});

document.addEventListener("click", (e) => {
    if (infoBox.classList.contains("show") && !infoBox.contains(e.target) && e.target !== infoIcon) {
        infoBox.classList.remove("show");
        infoIcon.classList.remove("bi-x-circle-fill");
        infoIcon.classList.add("bi-info-circle");
    }
});

botao.addEventListener("click", function () {

    contador++;
    contadorDiv.style.display = "block";
    contadorTexto.innerHTML = contador;
    console.log(contador);
    if (contador >= 10) {
        infoIcon.style.display = "flex";
    }
});