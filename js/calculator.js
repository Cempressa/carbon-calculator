/**
 * Calculator Object
 * Provides calculation methods for CO2 emissions, savings, and carbon credits
 */

const Calculator = {
    /**
     * Calculate CO2 emission for a given distance and transport mode
     * @param {number} distanceKm - Distance in kilometers
     * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
     * @returns {number} CO2 emission in kg, rounded to 2 decimal places
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Get emission factor from CONFIG.EMISSION_FACTORS using transportMode as key
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];

        // Calculate: distance * factor
        const emission = distanceKm * emissionFactor;

        // Return result rounded to 2 decimal places
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculate emissions for all transport modes with comparison to car baseline
     * @param {number} distanceKm - Distance in kilometers
     * @returns {Array} Array of objects with mode, emission, and percentageVsCar, sorted by emission
     */
    calculateAllModes: function(distanceKm) {
        // Create array to store results
        const results = [];

        // Calculate car emission as baseline
        const carEmission = this.calculateEmission(distanceKm, 'car');

        // For each transport mode in CONFIG.EMISSION_FACTORS:
        for (const mode in CONFIG.EMISSION_FACTORS) {
            // Calculate emission for that mode
            const emission = this.calculateEmission(distanceKm, mode);

            // Calculate percentage vs car: (emission / carEmission) * 100
            const percentageVsCar = carEmission > 0
                ? Math.round((emission / carEmission) * 100 * 100) / 100
                : 0;

            // Push object to array: { mode: 'car', emission: 12.5, percentageVsCar: 100 }
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }

        // Sort array by emission (lowest first)
        results.sort((a, b) => a.emission - b.emission);

        // Return array
        return results;
    },

    /**
     * Calculate carbon savings compared to a baseline emission
     * @param {number} emission - Current emission in kg
     * @param {number} baselineEmission - Baseline emission in kg
     * @returns {Object} Object with savedKg and percentage
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calculate saved kg: baseline - emission
        const savedKg = baselineEmission - emission;

        // Calculate percentage: (saved / baseline) * 100
        const percentage = baselineEmission > 0
            ? (savedKg / baselineEmission) * 100
            : 0;

        // Return object: { savedKg: 5.5, percentage: 45 }
        // Round numbers to 2 decimals
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Calculate number of carbon credits for a given emission
     * @param {number} emissionKg - Emission in kg
     * @returns {number} Number of carbon credits, rounded to 4 decimal places
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emission by CONFIG.CARBON_CREDIT.KG_PER_CREDIT
        const credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;

        // Return rounded to 4 decimal places
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimate price range for carbon credits in BRL
     * @param {number} credits - Number of carbon credits
     * @returns {Object} Object with min, max, and average prices
     */
    estimateCreditPrice: function(credits) {
        // Calculate min: credits * PRICE_MIN_BRL
        const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;

        // Calculate max: credits * PRICE_MAX_BRL
        const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;

        // Calculate average: (min + max) / 2
        const average = (min + max) / 2;

        // Return object: { min: 50.5, max: 150.5, average: 100.5 }
        // Round to 2 decimals
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            average: Math.round(average * 100) / 100
        };
    }
};

