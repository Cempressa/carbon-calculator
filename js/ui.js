/**
 * UI Object
 * Handles all user interface rendering and utility functions
 */

const UI = {
    /**
     * UTILITY METHODS
     */

    /**
     * Format a number with specified decimal places and thousand separators
     * @param {number} number - Number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number string
     */
    formatNumber: function(number, decimals) {
        // Use toFixed() for decimals
        const fixed = Number(number).toFixed(decimals);

        // Add thousand separators using pt-BR locale
        return Number(fixed).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Format a value as Brazilian currency (BRL)
     * @param {number} value - Value to format
     * @returns {string} Formatted currency string (R$ 1.234,56)
     */
    formatCurrency: function(value) {
        // Format as R$ with pt-BR locale
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show an element by removing the 'hidden' class
     * @param {string} elementId - ID of the element to show
     */
    showElement: function(elementId) {
        // Get element by id
        const element = document.getElementById(elementId);

        if (element) {
            // Remove 'hidden' class
            element.classList.remove('hidden');
        }
    },

    /**
     * Hide an element by adding the 'hidden' class
     * @param {string} elementId - ID of the element to hide
     */
    hideElement: function(elementId) {
        // Get element by id
        const element = document.getElementById(elementId);

        if (element) {
            // Add 'hidden' class
            element.classList.add('hidden');
        }
    },

    /**
     * Scroll to an element smoothly
     * @param {string} elementId - ID of the element to scroll to
     */
    scrollToElement: function(elementId) {
        // Get element by id
        const element = document.getElementById(elementId);

        if (element) {
            // Use scrollIntoView with smooth behavior
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    /**
     * RENDERING METHODS
     */

    /**
     * Render the main results section
     * @param {Object} data - Result data containing origin, destination, distance, emission, mode, savings
     * @returns {string} HTML string for results section
     */
    renderResults: function(data) {
        // Get mode metadata from CONFIG.TRANSPORT_MODES
        const modeData = CONFIG.TRANSPORT_MODES[data.mode];

        // Create HTML string with template literals
        let html = `
            <!-- Route Card -->
            <div class="results__card">
                <div class="results__card-icon">🗺️</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Rota</h3>
                    <p class="results__card-value">${data.origin} → ${data.destination}</p>
                </div>
            </div>

            <!-- Distance Card -->
            <div class="results__card">
                <div class="results__card-icon">📏</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Distância</h3>
                    <p class="results__card-value">${this.formatNumber(data.distance, 0)} km</p>
                </div>
            </div>

            <!-- Emission Card -->
            <div class="results__card">
                <div class="results__card-icon">🍃</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Emissão de CO2</h3>
                    <p class="results__card-value">${this.formatNumber(data.emission, 2)} kg</p>
                </div>
            </div>

            <!-- Transport Mode Card -->
            <div class="results__card">
                <div class="results__card-icon">${modeData.icon}</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Meio de Transporte</h3>
                    <p class="results__card-value">${modeData.label}</p>
                </div>
            </div>
        `;

        // If mode is not 'car' and savings exist: savings card showing kg saved and percentage
        if (data.mode !== 'car' && data.savings) {
            html += `
            <!-- Savings Card -->
            <div class="results__card results__card--savings">
                <div class="results__card-icon">💰</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Economia vs Carro</h3>
                    <p class="results__card-value">${this.formatNumber(data.savings.savedKg, 2)} kg</p>
                    <p class="results__card-subtitle">${this.formatNumber(data.savings.percentage, 1)}% menos emissões</p>
                </div>
            </div>
            `;
        }

        // Return complete HTML string
        return html;
    },

    /**
     * Render the comparison section showing all transport modes
     * @param {Array} modesArray - Array of mode objects from Calculator.calculateAllModes()
     * @param {string} selectedMode - The currently selected transport mode
     * @returns {string} HTML string for comparison section
     */
    renderComparison: function(modesArray, selectedMode) {
        // Find max emission for progress bar scaling
        const maxEmission = Math.max(...modesArray.map(m => m.emission));

        let html = '';

        // Create HTML string for each mode
        modesArray.forEach(modeObj => {
            const mode = modeObj.mode;
            const emission = modeObj.emission;
            const percentageVsCar = modeObj.percentageVsCar;

            // Get mode metadata
            const modeData = CONFIG.TRANSPORT_MODES[mode];

            // Container div with class="comparison__item"
            // If mode === selectedMode, add class="comparison__item--selected"
            const selectedClass = mode === selectedMode ? ' comparison__item--selected' : '';

            // Determine bar color based on percentage vs car
            // Color-code bar: green (0-25%), yellow (25-75%), orange (75-100%), red (>100%)
            let barColor = '';
            if (percentageVsCar <= 25) {
                barColor = '#10b981'; // green
            } else if (percentageVsCar <= 75) {
                barColor = '#f59e0b'; // yellow
            } else if (percentageVsCar <= 100) {
                barColor = '#fb923c'; // orange
            } else {
                barColor = '#ef4444'; // red
            }

            // Calculate progress bar width (use max emission for 100% reference)
            const barWidth = maxEmission > 0 ? (emission / maxEmission) * 100 : 0;

            html += `
            <!-- Comparison Item -->
            <div class="comparison__item${selectedClass}">
                <!-- Header with mode icon, label, and emission stats -->
                <div class="comparison__item-header">
                    <span class="comparison__item-icon">${modeData.icon}</span>
                    <span class="comparison__item-label">${modeData.label}</span>
                    ${mode === selectedMode ? '<span class="comparison__item-badge">Selecionado</span>' : ''}
                </div>
                
                <!-- Stats showing emission and percentage vs car -->
                <div class="comparison__item-stats">
                    <div class="comparison__item-emission">
                        <strong>${this.formatNumber(emission, 2)} kg CO2</strong>
                    </div>
                    <div class="comparison__item-percentage">
                        ${this.formatNumber(percentageVsCar, 0)}% vs Carro
                    </div>
                </div>
                
                <!-- Progress bar with width based on emission -->
                <div class="comparison__item-bar-container">
                    <div class="comparison__item-bar" style="width: ${barWidth}%; background-color: ${barColor};"></div>
                </div>
            </div>
            `;
        });

        // At the end, add tip box with helpful message
        html += `
        <!-- Tip Box -->
        <div class="comparison__tip">
            <div class="comparison__tip-icon">💡</div>
            <div class="comparison__tip-content">
                <h4 class="comparison__tip-title">Dica Sustentável</h4>
                <p class="comparison__tip-text">
                    Escolher meios de transporte com menor emissão de CO2 ajuda a reduzir o impacto ambiental. 
                    A bicicleta é sempre a opção mais sustentável! 🌱
                </p>
            </div>
        </div>
        `;

        // Return complete HTML string
        return html;
    },

    /**
     * Render the carbon credits section
     * @param {Object} creditsData - Object containing credits and price information
     * @returns {string} HTML string for carbon credits section
     */
    renderCarbonCredits: function(creditsData) {
        // creditsData contains: { credits, price: { min, max, average } }
        const credits = creditsData.credits;
        const price = creditsData.price;

        // Create HTML string with grid and cards
        const html = `
            <!-- Grid with 2 cards -->
            <div class="carbon-credits__grid">
                <!-- Card 1: Credits needed -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-icon">🌳</div>
                    <h3 class="carbon-credits__card-title">Créditos de Carbono</h3>
                    <p class="carbon-credits__card-value">${this.formatNumber(credits, 4)}</p>
                    <p class="carbon-credits__card-helper">1 crédito = 1000 kg CO2</p>
                </div>
                
                <!-- Card 2: Estimated price -->
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-icon">💵</div>
                    <h3 class="carbon-credits__card-title">Valor Estimado</h3>
                    <p class="carbon-credits__card-value">${this.formatCurrency(price.average)}</p>
                    <p class="carbon-credits__card-helper">
                        Faixa: ${this.formatCurrency(price.min)} - ${this.formatCurrency(price.max)}
                    </p>
                </div>
            </div>
            
            <!-- Info box explaining what carbon credits are -->
            <div class="carbon-credits__info">
                <div class="carbon-credits__info-icon">ℹ️</div>
                <div class="carbon-credits__info-content">
                    <h4 class="carbon-credits__info-title">O que são Créditos de Carbono?</h4>
                    <p class="carbon-credits__info-text">
                        Créditos de carbono são certificados que representam a redução de 1 tonelada (1000 kg) 
                        de CO2 da atmosfera. Ao comprar créditos, você compensa suas emissões investindo em 
                        projetos ambientais como reflorestamento e energia renovável.
                    </p>
                </div>
            </div>
            
            <!-- Button to compensate emissions (non-functional demo) -->
            <div class="carbon-credits__action">
                <button class="carbon-credits__button" type="button" onclick="alert('Funcionalidade em desenvolvimento!')">
                    🛒 Compensar Emissões
                </button>
            </div>
        `;

        // Return complete HTML string
        return html;
    },

    /**
     * Show loading state on a button
     * @param {HTMLElement} buttonElement - Button element to show loading state
     */
    showLoading: function(buttonElement) {
        // Save original text in data attribute
        buttonElement.dataset.originalText = buttonElement.innerHTML;

        // Disable button
        buttonElement.disabled = true;

        // Change innerHTML to show spinner and "Calculando..." text
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Hide loading state and restore button
     * @param {HTMLElement} buttonElement - Button element to restore
     */
    hideLoading: function(buttonElement) {
        // Enable button
        buttonElement.disabled = false;

        // Restore original text from data attribute
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};

