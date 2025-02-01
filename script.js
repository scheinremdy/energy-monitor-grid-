const ctx = document.getElementById("energyChart").getContext("2d");

// Generate a timestamp for every update
function getTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

// Initialize datasets
let germanyData = { label: "Germany (GW)", data: [], borderColor: "blue", borderWidth: 2 };
let philippinesData = { label: "Philippines (GW)", data: [], borderColor: "green", borderWidth: 2 };
let labels = [];

// Chart setup
let chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: []
    },
    options: {
        animation: { duration: 800 },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Energy Consumption (GW)" } }
        }
    }
});

// Update the chart every minute
function updateData() {
    const currentTime = getTime();
    
    // Simulate new energy values (realistic fluctuations)
    let newGermanyValue = 30 + Math.random() * 5;  // 30-35 GW
    let newPhilippinesValue = 15 + Math.random() * 3;  // 15-18 GW

    // Push new data points
    if (labels.length >= 20) {  // Keep max 20 data points visible
        labels.shift();
        germanyData.data.shift();
        philippinesData.data.shift();
    }

    labels.push(currentTime);
    germanyData.data.push(newGermanyValue);
    philippinesData.data.push(newPhilippinesValue);

    // Update chart
    chart.data.labels = labels;
    chart.data.datasets = [germanyData, philippinesData];
    chart.update();
}

// Start updating every minute
setInterval(updateData, 60000);
updateData(); // Run once at start

// Buttons for showing specific countries
document.getElementById("show-germany").addEventListener("click", () => {
    chart.data.datasets = [germanyData];
    chart.update();
});

document.getElementById("show-philippines").addEventListener("click", () => {
    chart.data.datasets = [philippinesData];
    chart.update();
});

document.getElementById("show-both").addEventListener("click", () => {
    chart.data.datasets = [germanyData, philippinesData];
    chart.update();
});

// Download CSV functionality
document.getElementById("download-btn").addEventListener("click", () => {
    let csvContent = "Time,Germany (GW),Philippines (GW)\n";
    for (let i = 0; i < labels.length; i++) {
        csvContent += `${labels[i]},${germanyData.data[i] || ""},${philippinesData.data[i] || ""}\n`;
    }
    
    let blob = new Blob([csvContent], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EnergyData.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
