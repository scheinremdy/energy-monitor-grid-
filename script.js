document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("language-toggle");
    const infoButton = document.getElementById("info-button");
    const helpButton = document.getElementById("help-button");
    const infoSection = document.getElementById("info-section");
    const helpSection = document.getElementById("help-section");
    
    let isDarkMode = false;
    let isEnglish = true;

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        isDarkMode = !isDarkMode;
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    });

    langToggle.addEventListener("click", function () {
        isEnglish = !isEnglish;
        document.getElementById("title").textContent = isEnglish ? "Energy Consumption Monitor" : "Energieverbrauchsmonitor";
        langToggle.textContent = isEnglish ? "Deutsch" : "English";
        infoButton.textContent = isEnglish ? "ℹ️ Info" : "ℹ️ Informationen";
        helpButton.textContent = isEnglish ? "❓ Help" : "❓ Hilfe";
    });

    infoButton.addEventListener("click", function () {
        infoSection.classList.toggle("hidden");
        helpSection.classList.add("hidden"); // Hide help when info is opened
    });

    helpButton.addEventListener("click", function () {
        helpSection.classList.toggle("hidden");
        infoSection.classList.add("hidden"); // Hide info when help is opened
    });

    // Energy Data
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const germanyData = [520, 480, 510, 530, 560, 590, 620, 640, 600, 570, 540, 500]; // Simulated data in GWh
    const philippinesData = [200, 210, 220, 230, 250, 270, 290, 310, 300, 280, 260, 240];

    const ctx = document.getElementById("energyChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Germany (GWh)",
                    data: germanyData,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: true,
                },
                {
                    label: "Philippines (GWh)",
                    data: philippinesData,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
            interaction: {
                mode: "index",
                intersect: false,
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Months",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Energy Consumption (GWh)",
                    },
                },
            },
        },
    });
});
