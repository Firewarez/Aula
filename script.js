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
        baseCost: 10,
        currentCost: 10,
        costMultiplier: 1.7,
        level: 0,
        levelsValue: [0, 1, 2, 3, 10, 15],
        maxLevel: 5,
        getAutoClickValue: function () {
            return this.levelsValue[this.level] || 0;
        },
        effect: function () {
            recalculateAutoClickPower();
            updateAutoClicker(); // o efeito deste upgrade
        }
    },
    {
        id: "upgrade2",
        buttonId: "upgrade2-button",
        costSpanId: "upgrade2-cost",
        name: "Advertisement",
        baseCost: 20,
        currentCost: 20,
        costMultiplier: 2.0,
        level: 0,
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.level * 5; // 5 cliques por nível
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
        baseCost: 50,
        currentCost: 50,
        costMultiplier: 2,
        level: 0,
        maxLevel: 3,
        getAutoClickValue: function () {
            return this.level * 10; // 10 cliques por nível
        },
        effect: function () {
            recalculateAutoClickPower();
            document.body.style.backgroundColor = "#1abc9c";
            updateAutoClicker();
        }
    }
    // Adicionar mais upgrades aqui
];

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
            return total + upg.getAutoClickValue();
        }
        return total;
    }, 0);

    updateAutoClicker();
}

function updateAutoClicker() {
    if (autoClickInterval) clearInterval(autoClickInterval);

    autoClickInterval = setInterval(() => {
        contador += autoClickPower;
        updateCounterDisplay();
    }, 500);
}

setupUpgrades();