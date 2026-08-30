

/**
 * Configuration Object
 * Contains emission factors, transport mode metadata, and utility functions
 */

const CONFIG = {
    /**
     * CO2 emission factors in kg per kilometer for each transport mode
     */
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    /**
     * Transport mode metadata for UI rendering
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: 'Bicicleta',
            icon: '🚲',
            color: '#10b981'
        },
        car: {
            label: 'Carro',
            icon: '🚗',
            color: '#3b82f6'
        },
        bus: {
            label: 'Ônibus',
            icon: '🚌',
            color: '#f59e0b'
        },
        truck: {
            label: 'Caminhão',
            icon: '🚚',
            color: '#ef4444'
        }
    },

    /**
     * Carbon credit pricing and conversion information
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Populate the datalist with cities from RoutesDB
     */
    populateDatalist: function() {
        // Get all cities from the routes database
        const cities = RoutesDB.getAllCities();

        // Get the datalist element
        const datalist = document.getElementById('cities-list');

        if (!datalist) {
            console.error('Datalist element not found');
            return;
        }

        // Clear existing options
        datalist.innerHTML = '';

        // Create and append option elements for each city
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },

    /**
     * Setup automatic distance calculation when origin and destination are selected
     */
    setupDistanceAutofill: function() {
        // Get input elements
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.calculator-form__helper');

        if (!originInput || !destinationInput || !distanceInput || !manualCheckbox) {
            console.error('Required form elements not found');
            return;
        }

        /**
         * Try to find and fill distance automatically
         */
        const tryAutoFill = () => {
            // Get trimmed values
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();

            // Check if both fields are filled
            if (origin && destination) {
                // Try to find distance in database
                const distance = RoutesDB.findDistance(origin, destination);

                if (distance !== null) {
                    // Distance found - fill input and make readonly
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;

                    // Update helper text to show success
                    if (helperText) {
                        helperText.textContent = `✓ Distância encontrada: ${distance} km`;
                        helperText.style.color = '#10b981';
                    }
                } else {
                    // Distance not found - clear and suggest manual input
                    distanceInput.value = '';
                    distanceInput.readOnly = false;

                    if (helperText) {
                        helperText.textContent = 'Rota não encontrada. Por favor, insira a distância manualmente.';
                        helperText.style.color = '#f59e0b';
                    }
                }
            }
        };

        // Add change event listeners to origin and destination inputs
        originInput.addEventListener('change', tryAutoFill);
        destinationInput.addEventListener('change', tryAutoFill);

        // Add input event listeners for real-time updates (optional enhancement)
        originInput.addEventListener('input', () => {
            if (originInput.value.trim() && destinationInput.value.trim()) {
                tryAutoFill();
            }
        });

        destinationInput.addEventListener('input', () => {
            if (originInput.value.trim() && destinationInput.value.trim()) {
                tryAutoFill();
            }
        });

        // Add change listener to manual checkbox
        manualCheckbox.addEventListener('change', () => {
            if (manualCheckbox.checked) {
                // Manual mode - allow user to enter distance
                distanceInput.readOnly = false;
                distanceInput.focus();

                if (helperText) {
                    helperText.textContent = 'Modo manual ativado. Insira a distância em km.';
                    helperText.style.color = '#6b7280';
                }
            } else {
                // Automatic mode - try to find route again
                distanceInput.readOnly = true;

                if (helperText) {
                    helperText.textContent = 'A distância será preenchida automaticamente';
                    helperText.style.color = '#6b7280';
                }

                // Clear and try to autofill
                distanceInput.value = '';
                tryAutoFill();
            }
        });
    }
};

export { CONFIG };

