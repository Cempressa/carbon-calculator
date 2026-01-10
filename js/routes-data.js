/**
 * Routes Database
 * Contains distances between major Brazilian cities
 * Structure: { origin, destination, distanceKm }
 */

const RoutesDB = {
    /**
     * Array of route objects containing origin, destination, and distance in kilometers
     * Covers major Brazilian cities across different regions
     */
    routes: [
        // Southeast Region - Major Capitals
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Vitória, ES", distanceKm: 882 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 521 },
        { origin: "Belo Horizonte, MG", destination: "Vitória, ES", distanceKm: 524 },

        // Southeast to Center-West
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Belo Horizonte, MG", destination: "Brasília, DF", distanceKm: 716 },
        { origin: "São Paulo, SP", destination: "Goiânia, GO", distanceKm: 926 },
        { origin: "São Paulo, SP", destination: "Campo Grande, MS", distanceKm: 1014 },
        { origin: "São Paulo, SP", destination: "Cuiabá, MT", distanceKm: 1679 },

        // Southeast to South
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Florianópolis, SC", distanceKm: 705 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1109 },
        { origin: "Rio de Janeiro, RJ", destination: "Curitiba, PR", distanceKm: 852 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },

        // Southeast to Northeast
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1649 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3120 },
        { origin: "Rio de Janeiro, RJ", destination: "Fortaleza, CE", distanceKm: 2808 },

        // Northeast Region
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Salvador, BA", destination: "Fortaleza, CE", distanceKm: 1389 },
        { origin: "Salvador, BA", destination: "Maceió, AL", distanceKm: 632 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Recife, PE", destination: "Natal, RN", distanceKm: 297 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Fortaleza, CE", destination: "Teresina, PI", distanceKm: 634 },
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },

        // North Region
        { origin: "Brasília, DF", destination: "Palmas, TO", distanceKm: 973 },
        { origin: "Brasília, DF", destination: "Belém, PA", distanceKm: 2120 },
        { origin: "Brasília, DF", destination: "Manaus, AM", distanceKm: 3490 },
        { origin: "Belém, PA", destination: "Manaus, AM", distanceKm: 1544 },
        { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 },

        // Regional Routes - São Paulo State
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "São José dos Campos, SP", distanceKm: 97 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 87 },

        // Regional Routes - Rio de Janeiro State
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        { origin: "Rio de Janeiro, RJ", destination: "Cabo Frio, RJ", distanceKm: 165 },

        // Regional Routes - Minas Gerais
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 543 },
        { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 283 }
    ],

    /**
     * Get all unique city names from the routes database
     * @returns {string[]} Sorted array of unique city names
     */
    getAllCities: function() {
        const citiesSet = new Set();

        // Extract cities from both origin and destination
        this.routes.forEach(route => {
            citiesSet.add(route.origin);
            citiesSet.add(route.destination);
        });

        // Convert Set to Array and sort alphabetically
        return Array.from(citiesSet).sort();
    },

    /**
     * Find the distance between two cities
     * Searches in both directions (A->B and B->A)
     * @param {string} origin - Origin city name
     * @param {string} destination - Destination city name
     * @returns {number|null} Distance in kilometers, or null if route not found
     */
    findDistance: function(origin, destination) {
        // Normalize inputs: trim whitespace and convert to lowercase
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();

        // Search for route in both directions
        const route = this.routes.find(r => {
            const routeOrigin = r.origin.toLowerCase();
            const routeDestination = r.destination.toLowerCase();

            // Check both directions: origin->destination or destination->origin
            return (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                   (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin);
        });

        // Return distance if found, null otherwise
        return route ? route.distanceKm : null;
    }
};

