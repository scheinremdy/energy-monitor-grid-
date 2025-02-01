document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("energyChart").getContext("2d");

    const energyChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
            datasets: [
                {
                    label: "Germany (MW)",
                    data: [500, 520, 480, 510, 530, 495],
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: true,
                },
                {
                    label: "Philippines (MW)",
                    data: [300, 310, 290, 320, 315, 305],
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: { grid: { display: false } },
                y: { grid: { display: true }, title: { display: true, text: "Energy Usage (MW)" } }
            },
            plugins: {
                legend: { position: "top" },
                tooltip: { enabled: true }
            }
        }
    });

    function fetchData() {
        const newGermanyData = Math.floor(Math.random() * 100) + 450;
        const newPhilippinesData = Math.floor(Math.random() * 100) + 280;

        energyChart.data.datasets[0].data.shift();
        energyChart.data.datasets[1].data.shift();
        energyChart.data.datasets[0].data.push(newGermanyData);
        energyChart.data.datasets[1].data.push(newPhilippinesData);
        energyChart.update();
    }

    setInterval(fetchData, 3000);

    // Language Toggle
    document.getElementById("language-toggle").addEventListener("change", function() {
        const lang = this.value;
        document.getElementById("title").textContent = lang === "de" ? "Energie-Monitoring-Netz" : "Energy Monitor Grid";
        document.getElementById("info-title").textContent = lang === "de" ? "Warum ist die Überwachung des Stromnetzes wichtig?" : "Why Monitoring the Electric Grid is Important";
        document.getElementById("usage-title").textContent = lang === "de" ? "Nutzungsstatistiken" : "Usage Statistics";
        document.getElementById("help-title").textContent = lang === "de" ? "Verständnis der Grafik" : "Understanding the Graph";
    });

    // Theme Toggle
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Help Section Toggle
    document.getElementById("help-toggle").addEventListener("click", () => {
        document.getElementById("help-section").classList.toggle("hidden");
    });
});
