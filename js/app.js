/**
 * App Initialization and Event Handling
 * Main application logic for the CO2 Calculator
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {

    /**
     * INITIALIZATION
     */

    // 1. Populate city autocomplete datalist with available cities
    CONFIG.populateDatalist();

    // 2. Enable automatic distance calculation between cities
    CONFIG.setupDistanceAutofill();

    // 3. Get the main calculator form element
    const calculatorForm = document.getElementById('calculator-form');

    if (!calculatorForm) {
        console.error('Calculator form not found!');
        return;
    }

    // 4. Add submit event listener to the form
    calculatorForm.addEventListener('submit', handleFormSubmit);

    // 5. Log successful initialization
    console.log('✅ Calculadora Inicializada!');


    /**
     * FORM SUBMIT HANDLER
     * Processes the form data and displays calculation results
     * @param {Event} event - Form submit event
     */
    function handleFormSubmit(event) {
        // 1. Prevent default form submission behavior
        event.preventDefault();

        // 2. Get all form values

        // Get origin city (trim whitespace)
        const originValue = document.getElementById('origin').value.trim();

        // Get destination city (trim whitespace)
        const destinationValue = document.getElementById('destination').value.trim();

        // Get distance and parse as float
        const distanceValue = parseFloat(document.getElementById('distance').value);

        // Get selected transport mode (find checked radio button)
        const transportModeElement = document.querySelector('input[name="transport"]:checked');
        const transportMode = transportModeElement ? transportModeElement.value : null;

        // 3. Validate inputs

        // Check if all required fields are filled
        if (!originValue || !destinationValue || !distanceValue || !transportMode) {
            alert('❌ Por favor, preencha todos os campos obrigatórios:\n- Origem\n- Destino\n- Distância\n- Meio de Transporte');
            return;
        }

        // Check if distance is greater than 0
        if (distanceValue <= 0 || isNaN(distanceValue)) {
            alert('❌ A distância deve ser um número maior que zero.');
            return;
        }

        // 4. Get submit button element
        const submitButton = calculatorForm.querySelector('button[type="submit"]');

        // 5. Show loading state on button
        UI.showLoading(submitButton);

        // 6. Hide previous results sections
        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');

        // 7. Simulate processing with setTimeout (1500ms delay)
        setTimeout(function() {

            // Try-catch block for error handling
            try {

                // Calculate emission for the selected transport mode
                const selectedEmission = Calculator.calculateEmission(distanceValue, transportMode);

                // Calculate car emission as baseline for comparison
                const carEmission = Calculator.calculateEmission(distanceValue, 'car');

                // Calculate savings compared to car baseline
                const savings = Calculator.calculateSavings(selectedEmission, carEmission);

                // Calculate emissions for all transport modes for comparison
                const allModesComparison = Calculator.calculateAllModes(distanceValue);

                // Calculate carbon credits needed
                const carbonCredits = Calculator.calculateCarbonCredits(selectedEmission);

                // Estimate price range for carbon credits
                const creditPrice = Calculator.estimateCreditPrice(carbonCredits);

                // Build data object for rendering main results
                const resultsData = {
                    origin: originValue,
                    destination: destinationValue,
                    distance: distanceValue,
                    emission: selectedEmission,
                    mode: transportMode,
                    savings: transportMode !== 'car' ? savings : null
                };

                // Build data object for carbon credits section
                const creditsData = {
                    credits: carbonCredits,
                    price: creditPrice
                };

                // Render main results and inject HTML into results-content div
                const resultsHTML = UI.renderResults(resultsData);
                document.getElementById('results-content').innerHTML = resultsHTML;

                // Render comparison chart and inject HTML into comparison-content div
                const comparisonHTML = UI.renderComparison(allModesComparison, transportMode);
                document.getElementById('comparison-content').innerHTML = comparisonHTML;

                // Render carbon credits info and inject HTML into carbon-credits-content div
                const creditsHTML = UI.renderCarbonCredits(creditsData);
                document.getElementById('carbon-credits-content').innerHTML = creditsHTML;

                // Show all three results sections
                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');

                // Scroll smoothly to the results section
                UI.scrollToElement('results');

                // Hide loading state and restore button
                UI.hideLoading(submitButton);

            } catch (error) {
                // Log error to console for debugging
                console.error('❌ Erro ao calcular emissões:', error);

                // Show user-friendly error alert
                alert('❌ Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');

                // Hide loading state and restore button
                UI.hideLoading(submitButton);
            }

        }, 1500); // 1500ms delay to simulate processing
    }

});

