document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const toggleLanguageBtn = document.getElementById("toggle-language");
    const darkModeBtn = document.getElementById("toggle-dark-mode");
    const helpBtn = document.getElementById("toggle-help");
    const helpSection = document.getElementById("help-section");

    let language = "en";

    const energyData = {
        labels: [],
        datasets: [
            {
                label: "Germany (kWh)",
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
                data: [],
            },
            {
                label: "Philippines (kWh)",
                borderColor: "red",
                borderWidth: 2,
                fill: false,
                data: [],
            },
        ],
    };

    const energyChart = new Chart(ctx, {
        type: "line",
        data: energyData,
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Time" } },
                y: { title: { display: true, text: "Energy Consumption (kWh)" } },
            },
        },
    });

    function updateData() {
        const now = new Date().toLocaleTimeString();
        const germanyValue = Math.floor(Math.random() * (5000 - 3000) + 3000);
        const philippinesValue = Math.floor(Math.random() * (2000 - 1000) + 1000);

        energyData.labels.push(now);
        energyData.datasets[0].data.push(germanyValue);
        energyData.datasets[1].data.push(philippinesValue);

        if (energyData.labels.length > 10) {
            energyData.labels.shift();
            energyData.datasets[0].data.shift();
            energyData.datasets[1].data.shift();
        }

        energyChart.update();
    }

    setInterval(updateData, 60000);

    document.getElementById("germany-btn").addEventListener("click", () => {
        energyChart.data.datasets[0].hidden = false;
        energyChart.data.datasets[1].hidden = true;
        energyChart.update();
    });

    document.getElementById("philippines-btn").addEventListener("click", () => {
        energyChart.data.datasets[0].hidden = true;
        energyChart.data.datasets[1].hidden = false;
        energyChart.update();
    });

    document.getElementById("both-btn").addEventListener("click", () => {
        energyChart.data.datasets[0].hidden = false;
        energyChart.data.datasets[1].hidden = false;
        energyChart.update();
    });

    document.getElementById("download-data").addEventListener("click", () => {
        const csvContent = "data:text/csv;charset=utf-8,Time,Germany (kWh),Philippines (kWh)\n" +
            energyData.labels.map((time, i) => `${time},${energyData.datasets[0].data[i]},${energyData.datasets[1].data[i]}`).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "energy_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    toggleLanguageBtn.addEventListener("click", () => {
        language = language === "en" ? "de" : "en";
        toggleLanguageBtn.textContent = language === "en" ? "Deutsch" : "English";
        document.getElementById("title").textContent = language === "en" ? "Real-Time Energy Monitor" : "Echtzeit-Energiemonitor";
        document.getElementById("help-title").textContent = language === "en" ? "Help & Information" : "Hilfe & Informationen";
        document.getElementById("help-content").innerHTML = language === "en"
            ? "The Real-Time Energy Monitor provides live updates..."
            : "Der Echtzeit-Energiemonitor bietet Live-Updates...";
    });

    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    helpBtn.addEventListener("click", () => {
        helpSection.classList.toggle("hidden");
    });
});
