const translations = {
    en: {
        title: "Energy Consumption Analysis",
        infoText: "Tracking energy consumption trends for better efficiency and planning.",
        helpText: "The graph compares energy consumption in Germany and the Philippines. Hover over points for details.",
        themeToggle: "🌙",
        languageToggle: "Deutsch",
        germanyData: "Germany: Peak Usage - 34 GW (2023)",
        philippinesData: "Philippines: Peak Usage - 17 GW (2023)",
    },
    de: {
        title: "Energieverbrauchsanalyse",
        infoText: "Überwachung des Energieverbrauchs für bessere Effizienz und Planung.",
        helpText: "Das Diagramm vergleicht den Energieverbrauch in Deutschland und den Philippinen. Bewegen Sie den Mauszeiger für Details.",
        themeToggle: "🌞",
        languageToggle: "English",
        germanyData: "Deutschland: Höchstverbrauch - 34 GW (2023)",
        philippinesData: "Philippinen: Höchstverbrauch - 17 GW (2023)",
    }
};

// Language toggle
document.getElementById("language-toggle").addEventListener("click", () => {
    const currentLang = localStorage.getItem("language") || "en";
    const newLang = currentLang === "en" ? "de" : "en";
    localStorage.setItem("language", newLang);
    updateLanguage(newLang);
});

function updateLanguage(lang) {
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("info-section").innerText = translations[lang].infoText;
    document.getElementById("help-text").innerText = translations[lang].helpText;
    document.getElementById("theme-toggle").innerText = translations[lang].themeToggle;
    document.getElementById("language-toggle").innerText = translations[lang].languageToggle;
    document.getElementById("germany-data").innerText = translations[lang].germanyData;
    document.getElementById("philippines-data").innerText = translations[lang].philippinesData;
}

// Dark mode toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Help section toggle
document.getElementById("help-toggle").addEventListener("click", () => {
    document.getElementById("help-section").classList.toggle("hidden");
});

// Load settings
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "en";
    updateLanguage(savedLang);
});

// Chart setup
const ctx = document.getElementById("energyChart").getContext("2d");
new Chart(ctx, {
    type: "line",
    data: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [
            {
                label: "Germany (GW)",
                data: [31, 32, 30, 33, 34, 34.5],
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Philippines (GW)",
                data: [15, 16, 16.5, 17, 17.5, 18],
                borderColor: "green",
                borderWidth: 2,
                fill: false,
            },
        ],
    },
});

// Download Data
document.getElementById("download-btn").addEventListener("click", () => {
    const csvContent = "Year,Germany (GW),Philippines (GW)\n2018,31,15\n2019,32,16\n2020,30,16.5\n2021,33,17\n2022,34,17.5\n2023,34.5,18";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EnergyData.csv";
    link.click();
});
