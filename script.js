//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//Funções do botão de dica
import { upgrades } from "./upgrades.js";

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

//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
// Função da logica de contador de pontos e upgrades

let botao = document.getElementById("button");
let contador = 0;
let contadorTexto = document.getElementById("contador");
let contadorDiv = document.getElementById("contadora");
let autoClickPower = 0;
let autoClickInterval;
let autoClickerAtivado = false;

// Removendo chamada à função inexistente
// setupUpgrades() será chamado no final do script

const upgrade1Button = document.getElementById("upgrade1-button");
const upgrade1CostSpan = document.getElementById("upgrade1-cost");

botao.addEventListener("click", function () {

    contador++;
    contadorDiv.style.display = "block";
    contadorTexto.innerHTML = contador;
    console.log(contador);
    if (contador >= 10) {
        infoIcon.style.display = "flex";
        document.getElementById("upgrades").style.display = "flex";
    }
});

function updateCounterDisplay() {
    contadorDiv.style.display = "block";
    contadorTexto.innerHTML = contador;
}


function mostrarVideoEspecial() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('special-video');
    modal.style.display = 'flex';
    video.currentTime = 0;
    video.play();
}


document.getElementById('close-video').addEventListener('click', function() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('special-video');
    modal.style.display = 'none';
    video.pause();
    video.currentTime = 0;
});


document.getElementById('video-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        const video = document.getElementById('special-video');
        video.pause();
        video.currentTime = 0;
    }
});

function setupUpgrades() {
    upgrades.forEach(upg => {
        const button = document.getElementById(upg.buttonId);
        const costSpan = document.getElementById(upg.costSpanId);

        // Inicializa custo
        costSpan.textContent = upg.currentCost;

        button.addEventListener("click", () => {
            if (contador >= upg.currentCost && upg.level < upg.maxLevel) {
                contador -= upg.currentCost;
                upg.level++;
                updateCounterDisplay();

                if (!autoClickerAtivado) {
                    autoClickerAtivado = true;
                }

                upg.effect();

                // Aumenta o custo
                upg.currentCost = Math.floor(upg.currentCost * upg.costMultiplier);
                costSpan.textContent = upg.currentCost;

                if (upg.level === upg.maxLevel) {
                    button.disabled = true;
                    button.textContent = "Máximo atingido";
                }
            }
        });
    });
}

function recalculateAutoClickPower() {
    autoClickPower = upgrades.reduce((total, upg) => {
        if (typeof upg.getAutoClickValue === "function") {
            const val = upg.getAutoClickValue();
            console.log(upg.id, "level:", upg.level, "auto:", val);
            return total + val;
        }
        return total;
    }, 0);

    if (autoClickerAtivado) {
        autoClickPower += 1;
    }

    updateAutoClicker();
}


function updateAutoClicker() {
    if (autoClickInterval){
        clearInterval(autoClickInterval);
        autoClickInterval = null;
    } 

    if (autoClickPower > 0) {
        autoClickInterval = setInterval(() => {
            contador += autoClickPower;
            updateCounterDisplay();
            console.log("AutoClick! +", autoClickPower);
        }, 1000);
    }
}

setupUpgrades();