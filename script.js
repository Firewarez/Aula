//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//Funções do botão de dica

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
let clickerHelperLevel = 0;
let clickerHelperMax = 5;
let autoClickInterval;
let autoClickValue = 1;
let upgrade1Cost = 10;
let autoClickerAtivado = false;


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

const upgrades = [
    {
        id: "upgrade1",
        buttonId: "upgrade1-button",
        costSpanId: "upgrade1-cost",
        name: "Clicker Helper",
        baseCost: 50,
        currentCost: 50,
        costMultiplier: 2.37,
        level: 0,
        levelsValue: [0, 11, 30, 75, 122, 239],
        maxLevel: 5,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
        }
    },
    {
        id: "upgrade2",
        buttonId: "upgrade2-button",
        costSpanId: "upgrade2-cost",
        name: "Advertisement",
        baseCost: 950,
        currentCost: 950,
        costMultiplier: 3.659,
        level: 0,
        levelsValue: [0, 178, 221, 399],
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
        }
    },
    {
        id: "upgrade3",
        buttonId: "upgrade3-button",
        costSpanId: "upgrade3-cost",
        name: "Turbo Boost",
        baseCost: 5750,
        currentCost: 5750,
        costMultiplier: 4.85,
        level: 0,
        levelsValue: [0, 589, 777, 1024],
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
            document.body.style.backgroundColor = "#1abc9c";
        }
    },
    {
        id: "upgrade4",
        buttonId: "upgrade4-button",
        costSpanId: "upgrade4-cost",
        name: "Turbo Boost",
        baseCost: 100000,
        currentCost: 100000,
        costMultiplier: 4.78,
        level: 0,
        levelsValue: [0, 4903, 7397, 13400],
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
            document.body.style.backgroundColor = "#1abc9c";
        }
    },
    {
        id: "upgrade5",
        buttonId: "upgrade5-button",
        costSpanId: "upgrade5-cost",
        name: "Turbo Boost",
        baseCost: 1500000,
        currentCost: 1500000,
        costMultiplier: 7.34,
        level: 0,
        levelsValue: [0, 19058, 25097, 39134],
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
            document.body.style.backgroundColor = "#1abc9c";
        }
    },
    {
        id: "upgrade6",
        buttonId: "upgrade6-button",
        costSpanId: "upgrade6-cost",
        name: "Turbo Boost",
        baseCost: 10000000,
        currentCost: 10000000,
        costMultiplier: 2.78,
        level: 0,
        levelsValue: [0, 12839757],
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.levelsValue.slice(0, this.level + 1).reduce((a, b) => a + b, 0);
        },
        effect: function () {
            recalculateAutoClickPower();
            document.body.style.backgroundColor = "#1abc9c";
            mostrarVideoEspecial();
        }
    }

    // Adicionar mais upgrades aqui
];

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