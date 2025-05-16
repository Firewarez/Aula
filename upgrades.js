// Exportando o array de upgrades para uso em outros arquivos
export const upgrades = [
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

