// ===============================
// IMPORTAÇÕES
// ===============================
import { renderResults, renderComparison, renderCarbonCredits } from "./ui.js";
import { RoutesDB } from "./routes-data.js";
import { CONFIG } from "./config.js";

// ===============================
// ELEMENTOS DO FORMULÁRIO
// ===============================
const form = document.getElementById("calculator-form");
const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const distanceInput = document.getElementById("distance");
const manualDistanceCheckbox = document.getElementById("manual-distance");

// ===============================
// LISTA DE CIDADES
// ===============================
const citiesList = document.getElementById("cities-list");
RoutesDB.getAllCities().forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    citiesList.appendChild(option);
});

// ===============================
// ATUALIZAÇÃO AUTOMÁTICA DA DISTÂNCIA
// ===============================
function updateDistance() {
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    if (!manualDistanceCheckbox.checked) {
        const distance = RoutesDB.findDistance(origin, destination);

        if (distance !== null) {
            distanceInput.value = distance;
        } else {
            distanceInput.value = "";
        }
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
// CÁLCULO PRINCIPAL
// ===============================
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();
    const distance = parseFloat(distanceInput.value);

    const selectedTransport = document.querySelector("input[name='transport']:checked");
    const transport = selectedTransport ? selectedTransport.value : null;

    if (!origin || !destination || !distance || !transport) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const factor = CONFIG.EMISSION_FACTORS[transport];
    const emission = distance * factor;

    const transportLabels = {
        bicycle: "Bicicleta",
        car: "Carro",
        bus: "Ônibus",
        truck: "Caminhão"
    };

    // ===============================
    // CHAMADA DAS FUNÇÕES DO UI.JS
    // ===============================
    renderResults(emission, distance, transportLabels[transport]);
    renderComparison(emission, CONFIG.EMISSION_FACTORS, distance);
    renderCarbonCredits(emission);
    renderResults(emission, distance, transportLabels[transport]);
    renderComparison(emission, CONFIG.EMISSION_FACTORS, distance);
    renderCarbonCredits(emission);
    renderEmissionChart(CONFIG.EMISSION_FACTORS, distance, transport);

});
