import { renderResults, renderComparison, renderCarbonCredits } from "./ui.js";
import { routes } from "./routes-data.js";
import { emissionFactors } from "./config.js";

// ===============================
// Inicialização
// ===============================

const form = document.getElementById("calculator-form");
const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const distanceInput = document.getElementById("distance");
const manualDistanceCheckbox = document.getElementById("manual-distance");

// Preenche lista de cidades
const citiesList = document.getElementById("cities-list");
Object.keys(routes).forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    citiesList.appendChild(option);
});

// ===============================
// Lógica de distância automática
// ===============================

function updateDistance() {
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    if (!manualDistanceCheckbox.checked && routes[origin] && routes[origin][destination]) {
        distanceInput.value = routes[origin][destination];
    }
}

originInput.addEventListener("input", updateDistance);
destinationInput.addEventListener("input", updateDistance);

manualDistanceCheckbox.addEventListener("change", () => {
    if (manualDistanceCheckbox.checked) {
        distanceInput.removeAttribute("readonly");
        distanceInput.value = "";
    } else {
        distanceInput.setAttribute("readonly", true);
        updateDistance();
    }
});

// ===============================
// Cálculo principal
// ===============================

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();
    const distance = parseFloat(distanceInput.value);

    const transport = document.querySelector("input[name='transport']:checked").value;
    const factor = emissionFactors[transport];

    if (!origin || !destination || !distance || !factor) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const emission = distance * factor;

    const transportLabels = {
        bicycle: "Bicicleta",
        car: "Carro",
        bus: "Ônibus",
        truck: "Caminhão"
    };

    // Renderiza seções do dashboard
    renderResults(emission, distance, transportLabels[transport]);
    renderComparison(emission, emissionFactors);
    renderCarbonCredits(emission);
});
