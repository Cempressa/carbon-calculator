// ===============================
// UI DASHBOARD - Versão Final
// ===============================

export function renderResults(emission, distance, transportLabel) {
    const container = document.getElementById("results-content");
    container.innerHTML = `
        <div class="results__card">
            <span class="results__card-icon">🌱</span>
            <div class="results__card-content">
                <span class="results__card-title">Emissão Total</span>
                <span class="results__card-value">${emission.toFixed(2)} kg CO₂</span>
                <span class="results__card-subtitle">${transportLabel} • ${distance} km</span>
            </div>
        </div>

        <div class="results__card results__card--savings">
            <span class="results__card-icon">📉</span>
            <div class="results__card-content">
                <span class="results__card-title">Impacto Ambiental</span>
                <span class="results__card-value">${(emission / 1000).toFixed(3)} toneladas</span>
                <span class="results__card-subtitle">Equivalente em emissões totais</span>
            </div>
        </div>
    `;

    document.getElementById("results").classList.remove("hidden");
}


// ===============================
// COMPARAÇÃO ENTRE TRANSPORTES
// ===============================

export function renderComparison(emission, factors) {
    const container = document.getElementById("comparison-content");
    container.innerHTML = "";

    const transportIcons = {
        bicycle: "🚲",
        car: "🚗",
        bus: "🚌",
        truck: "🚚"
    };

    const selectedTransport = Object.keys(factors).find(key => factors[key] === emission / distance);

    Object.entries(factors).forEach(([mode, factor]) => {
        const modeEmission = factor * distance;
        const percentage = ((modeEmission / emission) * 100).toFixed(0);

        const isSelected = modeEmission === emission;

        container.innerHTML += `
            <div class="comparison__item ${isSelected ? "comparison__item--selected" : ""}">
                <div class="comparison__item-header">
                    <span class="comparison__item-icon">${transportIcons[mode]}</span>
                    <span class="comparison__item-label">${mode.toUpperCase()}</span>
                    ${isSelected ? `<span class="comparison__item-badge">Selecionado</span>` : ""}
                </div>

                <div class="comparison__item-stats">
                    <span class="comparison__item-emission">${modeEmission.toFixed(2)} kg</span>
                    <span class="comparison__item-percentage">${percentage}%</span>
                </div>

                <div class="comparison__item-bar-container">
                    <div class="comparison__item-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });

    container.innerHTML += `
        <div class="comparison__tip">
            <span class="comparison__tip-icon">💡</span>
            <div class="comparison__tip-content">
                <span class="comparison__tip-title">Dica Sustentável</span>
                <p class="comparison__tip-text">
                    Transportes coletivos ou não motorizados reduzem drasticamente sua pegada de carbono.
                    Sempre que possível, considere alternativas mais ecológicas.
                </p>
            </div>
        </div>
    `;

    document.getElementById("comparison").classList.remove("hidden");
}


// ===============================
// CRÉDITOS DE CARBONO
// ===============================

export function renderCarbonCredits(emission) {
    const container = document.getElementById("carbon-credits-content");

    const credits = emission / 100; // 1 crédito = 100 kg CO₂
    const minPrice = credits * 40;  // R$ 40 por crédito
    const maxPrice = credits * 80;  // R$ 80 por crédito

    container.innerHTML = `
        <div class="carbon-credits__grid">

            <div class="carbon-credits__card">
                <span class="carbon-credits__card-icon">💳</span>
                <span class="carbon-credits__card-title">Créditos Necessários</span>
                <span class="carbon-credits__card-value">${credits.toFixed(2)}</span>
                <span class="carbon-credits__card-helper">Baseado em 1 crédito = 100 kg CO₂</span>
            </div>

            <div class="carbon-credits__card">
                <span class="carbon-credits__card-icon">💰</span>
                <span class="carbon-credits__card-title">Custo Estimado</span>
                <span class="carbon-credits__card-value">R$ ${minPrice.toFixed(2)} - R$ ${maxPrice.toFixed(2)}</span>
                <span class="carbon-credits__card-helper">Valores médios do mercado</span>
            </div>

        </div>

        <div class="carbon-credits__info">
            <span class="carbon-credits__info-icon">ℹ️</span>
            <div class="carbon-credits__info-content">
                <span class="carbon-credits__info-title">O que são Créditos de Carbono?</span>
                <p class="carbon-credits__info-text">
                    Créditos de carbono são certificados que representam a redução de 1 tonelada de CO₂ na atmosfera.
                    Eles ajudam a compensar emissões e apoiar projetos ambientais.
                </p>
            </div>
        </div>

        <div class="carbon-credits__action">
            <button class="carbon-credits__button">Como comprar créditos?</button>
        </div>
    `;

    document.getElementById("carbon-credits").classList.remove("hidden");
}
