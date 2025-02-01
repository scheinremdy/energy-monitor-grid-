document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");
    const languageToggle = document.getElementById("language-toggle");
    const themeToggle = document.getElementById("theme-toggle");
    const helpButton = document.getElementById("help-button");
    const helpSection = document.getElementById("help-section");
    const downloadDataBtn = document.getElementById("download-data");
    const statusIndicator = document.getElementById("status-indicator");

    let currentLanguage = "en";

    const chartData = {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
        datasets: [{
            label: "Energy Usage (kWh)",
            data: [10, 20, 30, 25, 15, 35],
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true,
        }],
    };

    const energyChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
            responsive: true,
            plugins: { tooltip: { enabled: true } },
            scales: {
                x: { grid: { display: true } },
                y: { grid: { display: true } }
            }
        }
    });

    setInterval(() => {
        const newData = Math.floor(Math.random() * 50) + 10;
        energyChart.data.datasets[0].data.shift();
        energyChart.data.datasets[0].data.push(newData);
        energyChart.update();

        let avg = energyChart.data.datasets[0].data.reduce((a, b) => a + b, 0) / 6;
        if (avg > 40) {
            statusIndicator.innerHTML = "<strong>Status:</strong> Critical ⚠️";
        } else if (avg > 25) {
            statusIndicator.innerHTML = "<strong>Status:</strong> Warning ⚠️";
        } else {
            statusIndicator.innerHTML = "<strong>Status:</strong> Normal ✅";
        }
    }, 5000);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    languageToggle.addEventListener("click", () => {
        if (currentLanguage === "en") {
            document.getElementById("title").textContent = "Energieüberwachungsnetz";
            document.getElementById("info-title").textContent = "Was ist ein Energieüberwachungsnetz?";
            document.getElementById("info-text").textContent = "Ein Energieüberwachungsnetz verfolgt und optimiert den Stromverbrauch in Echtzeit.";
            document.getElementById("help-title").textContent = "So nutzen Sie das Dashboard";
            languageToggle.textContent = "English";
            currentLanguage = "de";
        } else {
            document.getElementById("title").textContent = "Energy Monitor Grid";
            document.getElementById("info-title").textContent = "What is an Energy Monitor Grid?";
            document.getElementById("info-text").textContent = "An Energy Monitor Grid tracks and optimizes electricity consumption in real-time.";
            document.getElementById("help-title").textContent = "How to Use This Dashboard";
            languageToggle.textContent = "Deutsch";
            currentLanguage = "en";
        }
    });

    helpButton.addEventListener("click", () => {
        helpSection.classList.toggle("hidden");
    });

    downloadDataBtn.addEventListener("click", () => {
        alert("Downloading CSV...");
    });
});
