// Tucson Foodie AI Restaurant Discovery Assistant
// Powered by Gemini 2.5 Flash

// Configuration
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const API_KEY_STORAGE = 'tucsonFoodieApiKey';
const DEMO_API_KEY = 'AIzaSyC2Dx-duvGW3YwkMhLf9AQHgWKRIiFh0Ps'; // Heavily throttled demo key

// Application State
let state = {
    apiKey: null,
    loading: false,
    results: null,
    favorites: [],
    searchHistory: [],
    sortBy: 'matchScore',
    filterPrice: 'all',
    filterFeatures: [],
    showFilters: false,
    viewMode: 'list',
    expandedCards: {},
    copiedAddress: '',
    searchCache: new Map(),
    searchDebounceTimer: null
};

// Preloaded demo results
const PRELOADED_RESULTS = {
    interpretedQuery: {
        searchType: "cuisine",
        cuisineTypes: ["mexican", "tacos"],
        features: ["tacos", "authentic"],
        priceRange: "any",
        location: "general",
        timeConstraints: [],
        dietary: []
    },
    recommendations: [
        {
            name: "El Charro Café Downtown",
            address: "311 N Court Ave, Tucson, AZ 85701",
            neighborhood: "Downtown",
            priceRange: "$",
            cuisine: "Mexican",
            matchScore: 98,
            rating: 4.5,
            reviewSummary: "Step into history at this legendary Tucson gem where the aroma of sizzling carne seca fills the air and mariachi music sets your heart dancing!",
            atmosphere: "Traditional Mexican",
            specialties: ["Carne Seca Tacos", "Chimichanga", "Tableside Guacamole"],
            dietaryOptions: {
                glutenFree: true,
                glutenFreeDetails: "Corn tortillas available, many naturally gluten-free options",
                vegan: false,
                vegetarian: true
            },
            features: ["outdoor patio", "full bar", "historic location", "mariachi on weekends"],
            hours: {
                today: "11am-9pm",
                open: true,
                happyHour: "3-6pm weekdays"
            },
            tucsonFoodie: {
                hasVoucher: true,
                voucherAmount: "$20 off",
                voucherFrequency: "every 6 months",
                latestArticle: "El Charro's Famous Carne Seca Recipe"
            },
            currentDeals: ["Taco Tuesday specials", "Happy hour margaritas 3-6pm"],
            whyRecommended: "THE place for authentic tacos! Their legendary carne seca tacos are a religious experience - tender, flavorful beef that melts in your mouth, wrapped in warm tortillas and topped with their secret spice blend. Plus, they literally invented the chimichanga!",
            phone: "(520) 622-1922",
            website: "elcharrocafe.com",
            parkingInfo: "Street parking and nearby garage",
            reservations: "Recommended for dinner"
        },
        {
            name: "Penca",
            address: "50 E Broadway Blvd, Tucson, AZ 85701",
            neighborhood: "Downtown",
            priceRange: "$",
            cuisine: "Latin American",
            matchScore: 95,
            rating: 4.6,
            reviewSummary: "A hip, vibrant spot where innovative tacos meet artisanal mezcal in a feast for all your senses - prepare to have your taco world rocked!",
            atmosphere: "Upscale Casual",
            specialties: ["Tacos de Hongos", "Duck Carnitas Tacos", "Pescado Tacos"],
            dietaryOptions: {
                glutenFree: true,
                glutenFreeDetails: "Corn tortilla tacos are gluten-free, staff very knowledgeable",
                vegan: true,
                vegetarian: true
            },
            features: ["outdoor patio", "full bar", "happy hour", "agave-focused cocktails"],
            hours: {
                today: "4pm-10pm",
                open: true,
                happyHour: "4-6pm weekdays"
            },
            tucsonFoodie: {
                hasVoucher: true,
                voucherAmount: "$20 off",
                voucherFrequency: "every 6 months",
                latestArticle: "Penca's Innovative Taco Menu"
            },
            currentDeals: ["$2 off tacos on Tuesday", "Happy hour 4-6pm"],
            whyRecommended: "Taco heaven for adventurous eaters! Their duck carnitas tacos are pure genius, and the mushroom tacos will convert even the most devoted carnivores. The mezcal selection? Mind-blowing!",
            phone: "(520) 203-7681",
            website: "pencatucson.com",
            parkingInfo: "Street parking and nearby garages",
            reservations: "Recommended"
        },
        {
            name: "Calle Tepa",
            address: "6151 E Broadway Blvd, Tucson, AZ 85711",
            neighborhood: "East Side",
            priceRange: "$",
            cuisine: "Mexican",
            matchScore: 92,
            rating: 4.4,
            reviewSummary: "Authentic street taco paradise where every bite transports you straight to the bustling markets of Mexico City!",
            atmosphere: "Casual",
            specialties: ["Street Tacos", "Al Pastor", "Carne Asada Tacos"],
            dietaryOptions: {
                glutenFree: true,
                glutenFreeDetails: "Corn tortillas standard for tacos",
                vegan: false,
                vegetarian: true
            },
            features: ["outdoor seating", "full bar", "family friendly", "quick service"],
            hours: {
                today: "11am-10pm",
                open: true,
                happyHour: "2-5pm daily"
            },
            tucsonFoodie: {
                hasVoucher: true,
                voucherAmount: "$10 off",
                voucherFrequency: "every 90 days",
                latestArticle: "Calle Tepa's Authentic Street Tacos"
            },
            currentDeals: ["Taco specials during happy hour", "$1 off margaritas 2-5pm"],
            whyRecommended: "Street taco perfection! Their al pastor is the real deal - marinated for hours, carved fresh, topped with grilled pineapple. The tortillas? Made fresh all day. The portions? Generous enough to make you weep with joy!",
            phone: "(520) 305-4600",
            website: "calletepa.com",
            parkingInfo: "Free parking lot",
            reservations: "Not needed"
        },
        {
            name: "Mojo Cuban Kitchen",
            address: "7167 E Tanque Verde Rd, Tucson, AZ 85715",
            neighborhood: "East Side",
            priceRange: "$",
            cuisine: "Cuban",
            matchScore: 88,
            rating: 4.5,
            reviewSummary: "Where Havana meets Tucson in a delicious dance of flavors - these fusion tacos will make your taste buds salsa!",
            atmosphere: "Vibrant Casual",
            specialties: ["Cuban Pork Tacos", "Mojo Chicken Tacos", "Plantain Tacos"],
            dietaryOptions: {
                glutenFree: true,
                glutenFreeDetails: "Corn tortillas available for all tacos",
                vegan: false,
                vegetarian: true
            },
            features: ["outdoor patio", "full bar", "live music Friday nights", "colorful decor"],
            hours: {
                today: "11am-9pm",
                open: true,
                happyHour: "3-6pm weekdays"
            },
            tucsonFoodie: {
                hasVoucher: true,
                voucherAmount: "$20 off",
                voucherFrequency: "every 6 months",
                latestArticle: "Mojo's Cuban-Mexican Fusion Success"
            },
            currentDeals: ["Happy hour mojitos", "Tuesday taco specials"],
            whyRecommended: "Mind-blowing Cuban-Mexican fusion tacos! Their mojo pork tacos with crispy plantains are a revelation, and don't even get me started on their mojitos - they're basically vacation in a glass!",
            phone: "(520) 298-3188",
            website: "mojocubankitchentucson.com",
            parkingInfo: "Free parking lot",
            reservations: "Recommended for groups"
        },
        {
            name: "El Charro Café Ventana",
            address: "6910 E Sunrise Dr, Tucson, AZ 85750",
            neighborhood: "Foothills",
            priceRange: "$",
            cuisine: "Mexican",
            matchScore: 86,
            rating: 4.4,
            reviewSummary: "Stunning mountain views paired with the same legendary tacos that have been making Tucsonans swoon for generations!",
            atmosphere: "Upscale Casual",
            specialties: ["Carne Seca Tacos", "Fish Tacos", "Tableside Guacamole"],
            dietaryOptions: {
                glutenFree: true,
                glutenFreeDetails: "Dedicated gluten-free menu available",
                vegan: false,
                vegetarian: true
            },
            features: ["mountain views", "full bar", "patio dining", "private dining room"],
            hours: {
                today: "11am-9pm",
                open: true,
                happyHour: "3-6pm daily"
            },
            tucsonFoodie: {
                hasVoucher: true,
                voucherAmount: "$20 off",
                voucherFrequency: "every 6 months",
                latestArticle: "El Charro Ventana's Stunning Views"
            },
            currentDeals: ["Margarita Monday specials", "Happy hour appetizers"],
            whyRecommended: "Picture this: You're savoring world-famous carne seca tacos while gazing at the majestic Catalina Mountains bathed in golden sunset light. Their fish tacos are equally spectacular - fresh, zesty, and perfectly seasoned!",
            phone: "(520) 514-1922",
            website: "elcharrocafe.com",
            parkingInfo: "Free parking lot with valet available",
            reservations: "Recommended"
        }
    ],
    searchSummary: "¡Taco lovers rejoice! We've found 5 absolutely incredible taco destinations that will blow your mind. From El Charro's legendary carne seca (a Tucson original!) to Penca's avant-garde duck carnitas, these spots are serving up taco magic. Best part? They ALL offer exclusive Tucson Foodie member vouchers!",
    tips: ["Tuesday is the best day for taco deals at most locations", "El Charro's carne seca tacos are a Tucson original - must try!", "Penca offers creative vegetarian and vegan taco options", "All listed restaurants accept Tucson Foodie member vouchers"],
    preloaded: true
};

// Example queries
const exampleQueries = [
    "Best Mexican restaurants near University with outdoor seating",
    "Gluten free pizza options downtown",
    "Restaurants with live music tonight",
    "Places with Tucson Foodie vouchers near me",
    "Late night tacos on the east side",
    "Romantic date spots with good wine selection",
    "Family friendly breakfast with kids menu",
    "Happy hour deals running now",
    "Vegan restaurants with high ratings",
    "What are some of the best taco restaurants in town?"
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Always use the DEMO_API_KEY
    state.apiKey = DEMO_API_KEY;
    
    // Remove API key modal completely
    const apiKeyModal = document.getElementById('apiKeyModal');
    if (apiKeyModal) {
        apiKeyModal.remove();
    }

    // Initialize Lucide icons
    lucide.createIcons();

    // Update current time
    updateTime();
    setInterval(updateTime, 60000);

    // Set up example queries
    setupExampleQueries();

    // Set up event listeners
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchRestaurants();
    });

    document.getElementById('searchInput').addEventListener('focus', () => {
        showSearchHistory(); // Always show suggestions
    });

    document.getElementById('searchInput').addEventListener('blur', () => {
        setTimeout(() => {
            document.getElementById('searchHistory').classList.add('hidden');
        }, 200);
    });

    // Set up feature filter buttons
    setupFeatureFilters();

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('tucsonFoodieFavorites');
    if (savedFavorites) {
        state.favorites = JSON.parse(savedFavorites);
    }

    // Load search history
    const savedHistory = localStorage.getItem('tucsonFoodieSearchHistory');
    if (savedHistory) {
        state.searchHistory = JSON.parse(savedHistory);
    }

    // Prepopulate search and results
    document.getElementById('searchInput').value = 'Which Mexican restaurants have the best tacos?';
    state.results = PRELOADED_RESULTS;
    console.log('Prepopulating with results:', state.results);
    
    // Force show results after a short delay to ensure DOM is ready
    setTimeout(() => {
        renderResults();
        // Force visibility as backup
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) resultsSection.style.display = 'block';
    }, 100);
});

// Save API Key - No longer needed, always use DEMO_API_KEY
function saveApiKey() {
    // This function is no longer used
    // Always using DEMO_API_KEY
}

// Update current time display
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('en-US', {
        timeZone: 'America/Phoenix',
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('currentTime').textContent = timeStr;
}

// Check if restaurant is currently open
function isRestaurantOpen(hours) {
    if (!hours || !hours.today) return false;
    
    const now = new Date();
    const currentTime = now.toLocaleString('en-US', {
        timeZone: 'America/Phoenix',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
    });
    
    // Parse hours like "11am-9pm" or "4pm-10pm"
    const hoursMatch = hours.today.match(/(\d{1,2})(am|pm)-(\d{1,2})(am|pm)/i);
    if (!hoursMatch) return false;
    
    let openHour = parseInt(hoursMatch[1]);
    const openPeriod = hoursMatch[2].toLowerCase();
    let closeHour = parseInt(hoursMatch[3]);
    const closePeriod = hoursMatch[4].toLowerCase();
    
    // Convert to 24-hour format
    if (openPeriod === 'pm' && openHour !== 12) openHour += 12;
    if (openPeriod === 'am' && openHour === 12) openHour = 0;
    if (closePeriod === 'pm' && closeHour !== 12) closeHour += 12;
    if (closePeriod === 'am' && closeHour === 12) closeHour = 0;
    
    const currentHour = parseInt(currentTime.split(':')[0]);
    const currentMinute = parseInt(currentTime.split(':')[1]);
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const openTotalMinutes = openHour * 60;
    const closeTotalMinutes = closeHour * 60;
    
    // Handle cases where closing time is after midnight
    if (closeTotalMinutes < openTotalMinutes) {
        return currentTotalMinutes >= openTotalMinutes || currentTotalMinutes < closeTotalMinutes;
    }
    
    return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes;
}

// Set up example queries
function setupExampleQueries() {
    const container = document.querySelector('.example-grid');
    container.innerHTML = exampleQueries.map(query => `
        <button class="example-btn" onclick="setQuery('${query.replace(/'/g, "\\'")}')">${query}</button>
    `).join('');
}

// Set query
function setQuery(query) {
    document.getElementById('searchInput').value = query;
    document.getElementById('searchInput').focus();
}

// Set up feature filters
function setupFeatureFilters() {
    const features = ['Has Voucher', 'Gluten Free', 'Vegan', 'Outdoor Seating', 'Open Now'];
    const container = document.querySelector('.feature-buttons');
    
    container.innerHTML = features.map(feature => {
        const icon = feature === 'Has Voucher' ? 'tag' : 
                     feature === 'Gluten Free' ? 'wheat' : '';
        return `
            <button class="feature-btn" onclick="toggleFeature('${feature.toLowerCase()}')" data-feature="${feature.toLowerCase()}">
                ${icon ? `<i data-lucide="${icon}"></i>` : ''}
                ${feature}
            </button>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Toggle feature filter
function toggleFeature(feature) {
    if (state.filterFeatures.includes(feature)) {
        state.filterFeatures = state.filterFeatures.filter(f => f !== feature);
    } else {
        state.filterFeatures.push(feature);
    }
    
    // Update UI
    document.querySelectorAll('.feature-btn').forEach(btn => {
        if (btn.dataset.feature === feature) {
            btn.classList.toggle('active');
        }
    });
    
    // Re-render results if they exist
    if (state.results) {
        renderResults();
    }
}

// Show search suggestions
function showSearchHistory() {
    const historyEl = document.getElementById('searchHistory');
    const now = new Date();
    const hour = now.getHours();
    
    // Dynamic suggestions based on time of day
    let suggestions = [];
    
    if (hour >= 6 && hour < 11) {
        suggestions = [
            "Best breakfast spots open now",
            "Coffee shops with pastries near me",
            "Brunch places with outdoor seating",
            "Gluten-free breakfast options"
        ];
    } else if (hour >= 11 && hour < 14) {
        suggestions = [
            "Open now for lunch",
            "Quick lunch spots downtown",
            "Healthy lunch options under $15",
            "Best sandwich shops nearby"
        ];
    } else if (hour >= 14 && hour < 17) {
        suggestions = [
            "Happy hour deals starting soon",
            "Coffee and dessert spots",
            "Restaurants with afternoon specials",
            "Quiet cafes for meetings"
        ];
    } else if (hour >= 17 && hour < 22) {
        suggestions = [
            "Romantic dinner spots with wine",
            "Best happy hour deals now",
            "Family-friendly restaurants open late",
            "Authentic Mexican with live music"
        ];
    } else {
        suggestions = [
            "Late night food open now",
            "24-hour restaurants near me",
            "Best late night tacos",
            "Delivery options after midnight"
        ];
    }
    
    // Add some always-relevant suggestions
    suggestions.push(
        "Restaurants with Tucson Foodie vouchers",
        "Vegan and vegetarian options",
        "Dog-friendly patios",
        "New restaurants this month"
    );
    
    historyEl.innerHTML = `
        <div class="search-history-header">Try searching for:</div>
        ${suggestions.slice(0, 8).map(suggestion => `
            <button class="search-history-item" onclick="setQuery('${suggestion.replace(/'/g, "\\'")}')">${suggestion}</button>
        `).join('')}
    `;
    historyEl.classList.remove('hidden');
}

// Build prompt for Gemini
function buildPrompt(query) {
    const now = new Date();
    const timeStr = now.toLocaleString('en-US', { timeZone: 'America/Phoenix' });
    const dayStr = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Phoenix' });
    const hourStr = now.getHours();
    
    // Get restaurant data as a string
    const restaurantList = Object.values(TUCSON_FOODIE_RESTAURANTS)
        .map(r => `${r.name} - ${r.cuisine}, ${r.address}, ${r.priceRange}, ${r.phone}, voucher: ${r.voucher.amount} ${r.voucher.frequency}`)
        .join('\n');
    
    // Detect if query is in Spanish
    const spanishWords = ['restaurante', 'comida', 'tacos', 'mexicano', 'donde', 'mejor', 'cerca', 'abierto', 'ahora'];
    const isSpanish = spanishWords.some(word => query.toLowerCase().includes(word));
    
    return `You are a fun, enthusiastic Tucson restaurant expert who LOVES helping people discover amazing food! Be colorful and engaging in your descriptions while being helpful and accurate.

${isSpanish ? 'IMPORTANT: The user asked in Spanish, so respond entirely in Spanish, including all restaurant descriptions, tips, and summaries.' : ''}

Query: "${query}"
Current time: ${timeStr}
Current day: ${dayStr}
Current hour (24h): ${hourStr}

STYLE GUIDE:
- Be enthusiastic and paint a vivid picture of each restaurant
- Use sensory language (sizzling, aromatic, mouthwatering, etc.)
- Highlight what makes each place special and unique
- Make the reader hungry and excited to visit!
- For reviewSummary: Write like an enthusiastic food critic
- For whyRecommended: Be specific about why THIS restaurant is perfect for their query

AVAILABLE RESTAURANTS:
${restaurantList}

Select 5-8 restaurants that best match the query. Check if they're currently open based on the time.

CRITICAL RULES FOR JSON RESPONSE:
1. Return ONLY valid JSON - no text before or after
2. Response must start with { and end with }
3. Use double quotes for all strings
4. Escape quotes inside strings with \"
5. No trailing commas in arrays or objects
6. Ensure all arrays are properly closed with ]
7. Ensure all objects are properly closed with }

Return EXACTLY this JSON structure (replace placeholder values with real data):
{
  "interpretedQuery": {
    "searchType": "general",
    "cuisineTypes": ["mexican", "italian"],
    "features": ["outdoor seating", "live music"],
    "priceRange": "any",
    "location": "general",
    "timeConstraints": [],
    "dietary": []
  },
  "recommendations": [
    {
      "name": "Restaurant Name",
      "address": "311 N Court Ave, Tucson, AZ 85701",
      "neighborhood": "Downtown",
      "priceRange": "$$",
      "cuisine": "Mexican",
      "matchScore": 95,
      "rating": 4.5,
      "reviewSummary": "Amazing food and atmosphere",
      "atmosphere": "Casual",
      "specialties": ["Tacos", "Margaritas"],
      "dietaryOptions": {
        "glutenFree": true,
        "glutenFreeDetails": "Corn tortillas available",
        "vegan": false,
        "vegetarian": true
      },
      "features": ["outdoor patio", "full bar"],
      "hours": {
        "today": "11am-9pm",
        "open": true,
        "happyHour": "3-6pm"
      },
      "tucsonFoodie": {
        "hasVoucher": true,
        "voucherAmount": "$20 off",
        "voucherFrequency": "every 6 months",
        "latestArticle": "Best Tacos in Tucson"
      },
      "currentDeals": ["Happy hour specials", "Taco Tuesday"],
      "whyRecommended": "Perfect match for your search",
      "phone": "(520) 622-1922",
      "website": "restaurant.com",
      "parkingInfo": "Street parking available",
      "reservations": "Recommended"
    }
  ],
  "searchSummary": "Found great restaurants matching your criteria",
  "tips": ["Make reservations", "Try the specials"]
}`;
}

// Search restaurants with debouncing
function searchRestaurants() {
    // Clear existing timer
    if (state.searchDebounceTimer) {
        clearTimeout(state.searchDebounceTimer);
    }
    
    // Set new timer for debounced search
    state.searchDebounceTimer = setTimeout(() => {
        performSearch();
    }, 300); // 300ms debounce
}

// Perform the actual search
async function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    
    // Clear previous results first
    state.results = null;
    const listView = document.getElementById('listView');
    if (listView) {
        listView.innerHTML = '<p style="text-align: center; color: #6b7280;">Searching...</p>';
    }
    
    // Check cache first
    const cacheKey = query.toLowerCase();
    if (state.searchCache.has(cacheKey)) {
        const cachedResults = state.searchCache.get(cacheKey);
        state.results = cachedResults;
        renderResults();
        return;
    }
    
    // Always use DEMO_API_KEY, no need to check
    state.apiKey = DEMO_API_KEY;
    
    // Update UI
    state.loading = true;
    const searchButton = document.getElementById('searchButton');
    searchButton.disabled = true;
    searchButton.innerHTML = '<i data-lucide="loader" class="loading"></i><span>Searching...</span>';
    lucide.createIcons();
    
    // Hide example queries if element exists
    const exampleQueries = document.getElementById('exampleQueries');
    if (exampleQueries) exampleQueries.classList.add('hidden');
    
    try {
        console.log('Starting API request with key:', state.apiKey ? state.apiKey.substring(0, 10) + '...' : 'NO KEY');
        console.log('API Endpoint:', GEMINI_API_ENDPOINT);
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: buildPrompt(query)
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        };
        
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${state.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', JSON.stringify(data, null, 2));
        
        // Check if response has the expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            console.error('Invalid API response structure:', data);
            throw new Error('Invalid response from API - missing expected data structure');
        }
        
        // Extract JSON from response
        const text = data.candidates[0].content.parts[0].text;
        console.log('Extracted text:', text);
        
        // Try to extract and clean JSON from the response
        let jsonString = text;
        
        // First try to extract JSON object from the text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonString = jsonMatch[0];
        }
        
        console.log('Raw response text:', text);
        console.log('Extracted JSON string:', jsonString);
        
        // Clean up common JSON issues
        // Remove any trailing commas before closing brackets/braces
        jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');
        
        // Fix missing commas between array elements
        jsonString = jsonString.replace(/\}(\s*)\{/g, '},$1{');
        
        // Fix missing commas after string values
        jsonString = jsonString.replace(/"(\s*)\n(\s*)"([^:])/g, '",$1\n$2"$3');
        
        // Fix missing commas after closing brackets/braces in objects
        jsonString = jsonString.replace(/\}(\s*)"([^:])/g, '},$1"$2');
        jsonString = jsonString.replace(/\](\s*)"([^:])/g, '],$1"$2');
        
        // Fix missing commas after values before new properties
        jsonString = jsonString.replace(/(["\d\}])(\s+)"([^"]+)":/g, '$1,$2"$3":');
        
        // Remove any control characters except newlines and tabs
        jsonString = jsonString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
        
        console.log('Cleaned JSON string:', jsonString);
        
        let results;
        try {
            results = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Failed JSON string:', jsonString);
            
            // Try to show where the error occurred
            const errorPosition = parseError.message.match(/position (\d+)/);
            if (errorPosition) {
                const pos = parseInt(errorPosition[1]);
                const start = Math.max(0, pos - 100);
                const end = Math.min(jsonString.length, pos + 100);
                console.error('Error context:', jsonString.substring(start, end));
                console.error('Error at position', pos, 'character:', jsonString[pos]);
            }
            
            throw parseError;
        }
        
        // Enrich results with data from our database and update open status
        results.recommendations = results.recommendations.map(rec => {
            const dbData = TUCSON_FOODIE_RESTAURANTS[rec.name];
            if (dbData) {
                // Merge database data with AI recommendations
                const enrichedRec = {
                    ...rec,
                    phone: dbData.phone,
                    website: dbData.website,
                    voucher: dbData.voucher,
                    tucsonFoodie: {
                        ...rec.tucsonFoodie,
                        hasVoucher: true,
                        voucherAmount: dbData.voucher.amount,
                        voucherFrequency: dbData.voucher.frequency
                    }
                };
                // Update open status
                if (enrichedRec.hours) {
                    enrichedRec.hours.open = isRestaurantOpen(enrichedRec.hours);
                }
                return enrichedRec;
            }
            // Update open status for non-database restaurants too
            if (rec.hours) {
                rec.hours.open = isRestaurantOpen(rec.hours);
            }
            return rec;
        });
        
        state.results = results;
        
        // Cache the results (limit cache size to 20 queries)
        if (state.searchCache.size >= 20) {
            const firstKey = state.searchCache.keys().next().value;
            state.searchCache.delete(firstKey);
        }
        state.searchCache.set(cacheKey, results);
        
        // Add to search history
        if (!state.searchHistory.includes(query)) {
            state.searchHistory = [query, ...state.searchHistory.slice(0, 9)];
            localStorage.setItem('tucsonFoodieSearchHistory', JSON.stringify(state.searchHistory));
        }
        
        // Show results
        renderResults();
        
    } catch (error) {
        console.error('Search error:', error);
        // More detailed error message
        let errorMsg = 'Failed to search restaurants. ';
        if (error.message.includes('API request failed')) {
            errorMsg += 'The API request failed. This could be due to rate limiting or an invalid API key.';
        } else if (error.message.includes('NetworkError')) {
            errorMsg += 'Network error. Please check your internet connection.';
        } else {
            errorMsg += error.message || 'Please try again.';
        }
        showError(errorMsg);
        
        // Clear results on error to prevent showing old results
        state.results = null;
        const listView = document.getElementById('listView');
        if (listView) {
            listView.innerHTML = '';
        }
        const summaryEl = document.querySelector('.summary-content');
        if (summaryEl) {
            summaryEl.innerHTML = '';
        }
    } finally {
        state.loading = false;
        searchButton.disabled = false;
        searchButton.innerHTML = '<i data-lucide="search"></i><span>Search</span>';
        lucide.createIcons();
    }
}

// Show error message
function showError(message) {
    // Create error element if it doesn't exist
    let errorEl = document.getElementById('errorMessage');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.id = 'errorMessage';
        errorEl.className = 'error-message';
        document.querySelector('.search-section').appendChild(errorEl);
    }
    
    errorEl.innerHTML = `
        <i data-lucide="alert-circle"></i>
        ${message}
    `;
    errorEl.style.display = 'flex';
    lucide.createIcons();
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 5000);
}

// Render results
function renderResults() {
    if (!state.results) return;
    
    // Show view controls and summary
    document.getElementById('viewControls').classList.remove('hidden');
    document.getElementById('searchSummary').classList.remove('hidden');
    document.getElementById('results').classList.remove('hidden');
    
    // Render search summary
    renderSearchSummary();
    
    // Filter and sort results
    const filtered = getSortedAndFilteredResults();
    
    // Render based on view mode
    if (state.viewMode === 'list') {
        renderListView(filtered);
    } else {
        renderMapView();
    }
    
    // Update Lucide icons
    lucide.createIcons();
}

// Render search summary
function renderSearchSummary() {
    const summaryEl = document.querySelector('.summary-content');
    
    let html = `<p>${state.results.searchSummary}</p>`;
    
    if (state.results.tips && state.results.tips.length > 0) {
        html += `
            <div style="margin-top: 0.5rem;">
                <strong style="font-size: 0.875rem;">Tips:</strong>
                <ul style="margin-top: 0.25rem;">
                    ${state.results.tips.map(tip => `
                        <li>
                            <span class="tip-bullet">•</span>
                            ${tip}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    const filtered = getSortedAndFilteredResults();
    html += `<p class="result-count">Showing ${filtered.length} of ${state.results.recommendations.length} results</p>`;
    
    summaryEl.innerHTML = html;
}

// Get sorted and filtered results
function getSortedAndFilteredResults() {
    if (!state.results?.recommendations) return [];
    
    let filtered = [...state.results.recommendations];
    
    // Apply price filter
    if (state.filterPrice !== 'all') {
        filtered = filtered.filter(r => r.priceRange.length === parseInt(state.filterPrice));
    }
    
    // Apply feature filters
    if (state.filterFeatures.length > 0) {
        filtered = filtered.filter(r => 
            state.filterFeatures.every(feature => {
                if (feature === 'has voucher') return r.tucsonFoodie?.hasVoucher;
                if (feature === 'gluten free') return r.dietaryOptions?.glutenFree;
                if (feature === 'vegan') return r.dietaryOptions?.vegan;
                if (feature === 'outdoor seating') return r.features?.some(f => f.toLowerCase().includes('outdoor'));
                if (feature === 'open now') return r.hours?.open;
                return false;
            })
        );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch (state.sortBy) {
            case 'matchScore':
                return b.matchScore - a.matchScore;
            case 'price':
                return a.priceRange.length - b.priceRange.length;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });
    
    return filtered;
}

// Render list view
function renderListView(restaurants) {
    const listEl = document.getElementById('listView');
    listEl.classList.remove('hidden');
    document.getElementById('mapView').classList.add('hidden');
    
    listEl.innerHTML = restaurants.map((restaurant, idx) => {
        const isFavorite = state.favorites.some(f => f.name === restaurant.name);
        const isExpanded = state.expandedCards[idx];
        const priceDisplay = '$'.repeat(restaurant.priceRange.length);
        
        return `
            <div class="restaurant-card">
                <div class="restaurant-header">
                    <div class="restaurant-number-circle">${idx + 1}</div>
                    <div class="restaurant-main-info">
                        <div class="restaurant-title-line">
                            <h3 class="restaurant-name">${restaurant.name}</h3>
                            <span class="restaurant-cuisine">(${restaurant.cuisine})</span>
                            ${restaurant.tucsonFoodie?.hasVoucher ? `
                                <span class="voucher-amount">${restaurant.tucsonFoodie.voucherAmount}</span>
                            ` : ''}
                            ${restaurant.rating ? `
                                <span class="rating">⭐ ${restaurant.rating}</span>
                            ` : ''}
                        </div>
                        <div class="restaurant-meta-line">
                            <span class="price-indicator">${priceDisplay}</span>
                            <span class="neighborhood">${restaurant.neighborhood}</span>
                            <span class="atmosphere">${restaurant.atmosphere}</span>
                        </div>
                        ${renderDietaryBadges(restaurant)}
                    </div>
                    <div class="restaurant-actions">
                        <div class="match-percentage">
                            <i data-lucide="star"></i>
                            ${restaurant.matchScore}%
                        </div>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${idx})" aria-label="Add to favorites">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                </div>
                
                <p class="restaurant-why-recommended">${restaurant.whyRecommended}</p>
                
                ${restaurant.reviewSummary ? `
                    <blockquote class="review-quote">
                        <em>"${restaurant.reviewSummary}"</em>
                    </blockquote>
                ` : ''}
                
                ${restaurant.tucsonFoodie?.hasVoucher ? `
                    <div class="member-deal-card">
                        <i data-lucide="tag"></i>
                        <div class="deal-content">
                            <strong>Tucson Foodie Member Deal</strong>
                            <p>${restaurant.tucsonFoodie.voucherAmount} ${restaurant.tucsonFoodie.voucherFrequency}</p>
                        </div>
                    </div>
                ` : ''}
                
                <div class="restaurant-details">
                    <div class="detail-row">
                        <i data-lucide="map-pin"></i>
                        <span>${restaurant.address}</span>
                        <button class="text-button" onclick="copyAddress('${restaurant.address.replace(/'/g, "\\'")}')">
                            <i data-lucide="copy"></i> Copy
                        </button>
                        <button class="text-button" onclick="getDirections('${restaurant.address.replace(/'/g, "\\'")}')">
                            <i data-lucide="external-link"></i> Directions
                        </button>
                    </div>
                    
                    <div class="detail-row">
                        <i data-lucide="phone"></i>
                        <a href="tel:${restaurant.phone}">${restaurant.phone}</a>
                    </div>
                    
                    ${restaurant.website ? `
                        <div class="detail-row">
                            <i data-lucide="globe"></i>
                            <a href="https://${restaurant.website}" target="_blank" rel="noopener">
                                ${restaurant.website}
                            </a>
                        </div>
                    ` : ''}
                </div>
                
                <button class="show-more-btn" onclick="toggleCard(${idx})">
                    ${isExpanded ? 'Show less' : 'Show more details'}
                    <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}"></i>
                </button>
                
                ${isExpanded ? renderExpandedContent(restaurant) : ''}
            </div>
        `;
    }).join('');
}

// Render dietary badges
function renderDietaryBadges(restaurant) {
    const badges = [];
    
    if (restaurant.dietaryOptions?.glutenFree) {
        badges.push('<span class="dietary-badge gf"><i data-lucide="wheat"></i> GF</span>');
    }
    if (restaurant.dietaryOptions?.vegan) {
        badges.push('<span class="dietary-badge vegan">Vegan</span>');
    }
    if (restaurant.features?.some(f => f.toLowerCase().includes('outdoor') || f.toLowerCase().includes('patio'))) {
        badges.push('<span class="dietary-badge outdoor"><i data-lucide="sun"></i> Outdoor</span>');
    }
    
    return badges.length > 0 ? `<div class="dietary-badges">${badges.join('')}</div>` : '';
}

// Render expanded content
function renderExpandedContent(restaurant) {
    let html = '<div class="expanded-content">';
    
    // Specialties
    if (restaurant.specialties && restaurant.specialties.length > 0) {
        html += `
            <div class="detail-section">
                <h4>Specialties & Must-Try Dishes:</h4>
                <div class="specialties-list">
                    ${restaurant.specialties.map(dish => `<span class="specialty-tag">${dish}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Dietary details
    if (restaurant.dietaryOptions?.glutenFreeDetails) {
        html += `
            <div class="detail-section">
                <h4><i data-lucide="wheat"></i> Gluten-Free Options:</h4>
                <p>${restaurant.dietaryOptions.glutenFreeDetails}</p>
            </div>
        `;
    }
    
    // Features
    if (restaurant.features && restaurant.features.length > 0) {
        html += `
            <div class="detail-section">
                <h4>Features & Amenities:</h4>
                <div class="features-list">
                    ${restaurant.features.map(feature => {
                        const icon = getFeatureIcon(feature);
                        return `<span class="feature-tag">${icon}${feature}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    // Current deals
    if (restaurant.currentDeals && restaurant.currentDeals.length > 0) {
        html += `
            <div class="detail-section">
                <h4>Current Deals & Specials:</h4>
                <ul class="deals-list">
                    ${restaurant.currentDeals.map(deal => `
                        <li><span class="tip-bullet">•</span> ${deal}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    // Additional info
    html += '<div class="additional-info">';
    
    if (restaurant.hours) {
        html += `
            <div class="info-item">
                <h4>Hours:</h4>
                <p>Today: ${restaurant.hours.today}</p>
                ${restaurant.hours.happyHour ? `<p>Happy Hour: ${restaurant.hours.happyHour}</p>` : ''}
            </div>
        `;
    }
    
    if (restaurant.parkingInfo) {
        html += `
            <div class="info-item">
                <h4>Parking:</h4>
                <p>${restaurant.parkingInfo}</p>
            </div>
        `;
    }
    
    if (restaurant.reservations) {
        html += `
            <div class="info-item">
                <h4>Reservations:</h4>
                <p>${restaurant.reservations}</p>
            </div>
        `;
    }
    
    html += '</div></div>';
    
    return html;
}

// Get feature icon HTML
function getFeatureIcon(feature) {
    const featureMap = {
        'outdoor': 'sun',
        'music': 'music',
        'bar': 'wine',
        'family': 'users',
        'parking': 'car',
        'gluten': 'wheat',
        'vegan': 'utensils',
        'voucher': 'tag',
        'deal': 'dollar-sign'
    };
    
    for (const [key, icon] of Object.entries(featureMap)) {
        if (feature.toLowerCase().includes(key)) {
            return `<i data-lucide="${icon}"></i> `;
        }
    }
    return '<i data-lucide="utensils"></i> ';
}

// Render map view
function renderMapView() {
    document.getElementById('listView').classList.add('hidden');
    document.getElementById('mapView').classList.remove('hidden');
}

// Toggle card expansion
function toggleCard(index) {
    state.expandedCards[index] = !state.expandedCards[index];
    renderResults();
}

// Toggle favorite
function toggleFavorite(index) {
    const restaurant = getSortedAndFilteredResults()[index];
    const favIndex = state.favorites.findIndex(f => f.name === restaurant.name);
    
    if (favIndex > -1) {
        state.favorites.splice(favIndex, 1);
    } else {
        state.favorites.push(restaurant);
    }
    
    // Save to localStorage
    localStorage.setItem('tucsonFoodieFavorites', JSON.stringify(state.favorites));
    
    // Update UI
    renderResults();
    renderFavorites();
}

// Render favorites
function renderFavorites() {
    if (state.favorites.length === 0) {
        document.getElementById('favorites').classList.add('hidden');
        return;
    }
    
    document.getElementById('favorites').classList.remove('hidden');
    const gridEl = document.querySelector('.favorites-grid');
    
    gridEl.innerHTML = state.favorites.map(restaurant => `
        <div class="favorite-card">
            <div class="favorite-header">
                <div>
                    <div class="favorite-name">${restaurant.name}</div>
                    <div class="favorite-meta">
                        ${restaurant.cuisine} • ${restaurant.priceRange}
                        ${restaurant.rating ? ` • ${restaurant.rating}★` : ''}
                    </div>
                    ${restaurant.tucsonFoodie?.hasVoucher ? `
                        <div class="favorite-voucher">
                            <i data-lucide="tag"></i>
                            ${restaurant.tucsonFoodie.voucherAmount}
                        </div>
                    ` : ''}
                </div>
                <button class="remove-favorite" onclick="removeFavorite('${restaurant.name.replace(/'/g, "\\'")}')">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <p class="favorite-address">${restaurant.address}</p>
            <div class="favorite-actions">
                <a href="tel:${restaurant.phone}">
                    <i data-lucide="phone"></i> Call
                </a>
                <button onclick="getDirections('${restaurant.address.replace(/'/g, "\\'")}')">
                    <i data-lucide="map-pin"></i> Directions
                </button>
                <button onclick="openTucsonFoodie('${restaurant.name.replace(/'/g, "\\'")}')">
                    <i data-lucide="newspaper"></i> Tucson Foodie
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Remove favorite
function removeFavorite(name) {
    state.favorites = state.favorites.filter(f => f.name !== name);
    localStorage.setItem('tucsonFoodieFavorites', JSON.stringify(state.favorites));
    renderFavorites();
    if (state.results) renderResults();
}

// Copy address
function copyAddress(address) {
    navigator.clipboard.writeText(address);
    state.copiedAddress = address;
    renderResults();
    
    setTimeout(() => {
        state.copiedAddress = '';
        renderResults();
    }, 2000);
}

// Get directions
function getDirections(address) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// Open Tucson Foodie
function openTucsonFoodie(restaurantName) {
    showDemoAlert(`In a production build, this will open the most recent Tucson Foodie article about ${restaurantName}.`);
}

// Share results
function shareResults() {
    showDemoAlert('In a production build, you\'ll be able to share your restaurant discoveries via text, email, or social media.');
}

// Show demo alert
function showDemoAlert(message) {
    document.getElementById('demoAlertMessage').textContent = message;
    document.getElementById('demoAlert').classList.remove('hidden');
}

// Show API key modal - No longer needed
function showApiKeyModal() {
    // This function is no longer used
    // Always using DEMO_API_KEY
}

// Close demo alert
function closeDemoAlert() {
    document.getElementById('demoAlert').classList.add('hidden');
}

// Set view mode
function setViewMode(mode) {
    state.viewMode = mode;
    
    // Update buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');
    
    renderResults();
}

// Toggle filters
function toggleFilters() {
    state.showFilters = !state.showFilters;
    const filtersEl = document.getElementById('filters');
    const chevron = document.getElementById('filterChevron');
    
    if (state.showFilters) {
        filtersEl.classList.remove('hidden');
        chevron.setAttribute('data-lucide', 'chevron-up');
    } else {
        filtersEl.classList.add('hidden');
        chevron.setAttribute('data-lucide', 'chevron-down');
    }
    
    lucide.createIcons();
}

// Apply filters (called from selects)
function applyFilters() {
    state.sortBy = document.getElementById('sortBy').value;
    state.filterPrice = document.getElementById('filterPrice').value;
    
    if (state.results) {
        renderResults();
    }
}

// Add some basic error message styling
const errorStyle = document.createElement('style');
errorStyle.textContent = `
.error-message {
    display: none;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    color: #991b1b;
    font-size: 0.875rem;
}
`;
document.head.appendChild(errorStyle);

// Display all restaurants
function displayAllRestaurants() {
    const container = document.getElementById('allRestaurants');
    if (!container) return;
    
    const restaurants = Object.values(TUCSON_FOODIE_RESTAURANTS || {});
    
    container.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card-small">
            <h3>${restaurant.name}</h3>
            <p class="restaurant-meta">
                ${restaurant.cuisine} • ${restaurant.priceRange} • ${restaurant.neighborhood}
            </p>
            <p class="restaurant-address">${restaurant.address}</p>
            <p class="restaurant-phone">${restaurant.phone}</p>
            ${restaurant.voucher ? `
                <p class="voucher-info">
                    <i data-lucide="tag"></i>
                    ${restaurant.voucher.amount} ${restaurant.voucher.frequency}
                </p>
            ` : ''}
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Filter restaurants
function filterRestaurants() {
    const category = document.getElementById('filterCategory').value;
    const price = document.getElementById('filterPrice').value;
    displayAllRestaurants(); // For now, just redisplay all
}

// Sort restaurants
function sortRestaurants() {
    const sortBy = document.getElementById('sortBy').value;
    displayAllRestaurants(); // For now, just redisplay all
}