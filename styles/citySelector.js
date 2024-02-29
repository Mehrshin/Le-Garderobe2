// Define a mapping of countries to their corresponding cities
const countryToCities = {
    'Belgium': ['Antwerp','Brudges','Brussels'],
    'Canada': ['Montreal','Ottawa','Toronto','British Columbia'],
    'Switzerland': ['Bern','Basel','Lausanne'],
    'United States': ['Los Angeles','New York','Washington D.C.']
};

// Function to populate the city select options based on the selected country
function populateCities() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    
    const selectedCountry = countrySelect.value;
    const cities = countryToCities[selectedCountry] || [];

    // Clear existing options
    citySelect.innerHTML = '<option value="" selected="selected">Choose your city</option>';

    // Add new options based on the selected country
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Event listener to trigger population of cities when a country is selected
const countrySelect = document.getElementById('countrySelect');
countrySelect.addEventListener('change', populateCities);

// Initial population of cities based on the default selected country
populateCities();
