document.addEventListener("DOMContentLoaded", function () {
    let darkModeEnabled = false;
    let language = "en";

    const energyData = {
        ph: { label: "Philippines", color: "blue", data: [50, 55, 60, 58, 65, 70, 75] },
        de: { label: "Germany", color: "red", data: [80, 85, 88, 90, 87, 85, 83] }
    };

    const ctx = document.getElementById("energyChart").getContext("2d");
    let energyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["10:00", "10:01", "10:02", "10:03", "10:04", "10:05", "10:06"],
            datasets: []
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    function updateChart(type) {
        let datasets = [];
        if (type === "ph" || type === "both") {
            datasets.push({ label: energyData.ph.label, data: energyData.ph.data, borderColor: energyData.ph.color, fill: false });
        }
        if (type === "de" || type === "both") {
            datasets.push({ label: energyData.de.label, data: energyData.de.data, borderColor: energyData.de.color, fill: false });
        }
        energyChart.data.datasets = datasets;
        energyChart.update();
    }

    document.getElementById("show-ph").addEventListener("click", () => updateChart("ph"));
    document.getElementById("show-de").addEventListener("click", () => updateChart("de"));
    document.getElementById("show-both").addEventListener("click", () => updateChart("both"));

    document.getElementById("toggle-dark-mode").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        darkModeEnabled = !darkModeEnabled;
        this.textContent = darkModeEnabled ? "Light Mode" : "Dark Mode";
    });

    document.getElementById("toggle-language").addEventListener("click", function () {
        language = language === "en" ? "de" : "en";
        this.textContent = language === "en" ? "Deutsch" : "English";
        document.getElementById("title").textContent = language === "en" ? "Energy Monitor Grid" : "Energieüberwachungsnetz";
    });

    document.getElementById("download-data").addEventListener("click", function () {
        let csvContent = "Time, Philippines, Germany\n";
        for (let i = 0; i < energyData.ph.data.length; i++) {
            csvContent += `10:0${i}, ${energyData.ph.data[i]}, ${energyData.de.data[i]}\n`;
        }
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "energy_data.csv";
        link.click();
    });

    updateChart("both");
});
