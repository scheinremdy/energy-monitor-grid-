const translations = {
    en: {
        title: "Energy Consumption Monitor",
        infoText: "An Energy Monitor Grid is a system used to track and optimize energy consumption.",
        helpText: "This graph represents energy usage trends in Germany and the Philippines. Hover to see values.",
        themeToggle: "🌙",
        languageToggle: "Deutsch",
        germanyData: "Germany: Peak Usage - 34 GW (2023)",
        philippinesData: "Philippines: Peak Usage - 17 GW (2023)",
    },
    de: {
        title: "Energieverbrauchsmonitor",
        infoText: "Ein Energiegitter überwacht und optimiert den Energieverbrauch.",
        helpText: "Dieses Diagramm zeigt die Energieverbrauchstrends in Deutschland und den Philippinen. Bewegen Sie den Mauszeiger für Werte.",
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

// Load stored settings on page load
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
                fill: false,
            },
            {
                label: "Philippines (GW)",
                data: [15, 16, 16.5, 17, 17.5, 18],
                borderColor: "green",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw} GW`;
                    },
                },
            },
        },
    },
});
