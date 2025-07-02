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
            reviewSummary: "Historic Tucson institution serving authentic Sonoran-style Mexican cuisine since 1922",
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
            whyRecommended: "Tucson's oldest Mexican restaurant, invented the chimichanga, legendary carne seca tacos",
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
            reviewSummary: "Modern Latin cuisine with creative taco offerings and craft mezcal program",
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
            whyRecommended: "Inventive taco combinations with vegetarian/vegan options, excellent mezcal selection",
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
            reviewSummary: "Family-owned restaurant specializing in street tacos and traditional Mexican fare",
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
            whyRecommended: "Authentic street-style tacos with generous portions and fresh ingredients",
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
            reviewSummary: "Cuban cuisine with unique fusion tacos combining Cuban and Mexican flavors",
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
            whyRecommended: "Unique Cuban-style tacos you won't find elsewhere, excellent mojitos",
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
            reviewSummary: "Foothills location of the historic El Charro with scenic mountain views",
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
            whyRecommended: "Same great El Charro tacos with beautiful Catalina Mountain views",
            phone: "(520) 514-1922",
            website: "elcharrocafe.com",
            parkingInfo: "Free parking lot with valet available",
            reservations: "Recommended"
        }
    ],
    searchSummary: "Found 5 top-rated taco restaurants from Tucson Foodie partners, featuring authentic Mexican, innovative Latin, and unique fusion options. All offer Tucson Foodie member vouchers.",
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
    // Check for stored API key or use demo key
    state.apiKey = localStorage.getItem(API_KEY_STORAGE) || DEMO_API_KEY;
    
    // Hide API key modal since we have a demo key
    document.getElementById('apiKeyModal').classList.add('hidden');

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
        if (state.searchHistory.length > 0) {
            showSearchHistory();
        }
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

    // Load preloaded results
    state.results = PRELOADED_RESULTS;
    renderResults();

    // Set the initial query in the search input
    const searchInput = document.getElementById('searchInput');
    searchInput.value = "What are some of the best taco restaurants in town?";
});

// Save API Key
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    if (apiKey) {
        state.apiKey = apiKey;
        localStorage.setItem(API_KEY_STORAGE, apiKey);
        document.getElementById('apiKeyModal').classList.add('hidden');
        
        // Check if there's a preloaded query
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value) {
            searchRestaurants();
        }
    }
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

// Show search history
function showSearchHistory() {
    const historyEl = document.getElementById('searchHistory');
    if (state.searchHistory.length === 0) {
        historyEl.classList.add('hidden');
        return;
    }
    
    historyEl.innerHTML = `
        <div class="search-history-header">Recent searches</div>
        ${state.searchHistory.map(query => `
            <button class="search-history-item" onclick="setQuery('${query.replace(/'/g, "\\'")}')">${query}</button>
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
    
    return `You are a Tucson restaurant expert assistant. Analyze the user's query and recommend appropriate restaurants from the Tucson Foodie partner list.

Query: "${query}"
Current time: ${timeStr}
Current day: ${dayStr}
Current hour (24h): ${hourStr}

AVAILABLE RESTAURANTS:
${restaurantList}

Select 5-8 restaurants that best match the query. Consider cuisine type, location, price range, features, and current time.

Return ONLY a valid JSON object with this exact structure:
{
  "interpretedQuery": {
    "searchType": "general/deals/dietary/atmosphere/location",
    "cuisineTypes": ["mexican", "italian", etc],
    "features": ["outdoor seating", "live music", etc],
    "priceRange": "budget/moderate/upscale/any",
    "location": "area mentioned or general",
    "timeConstraints": ["now", "tonight", etc],
    "dietary": ["gluten-free", "vegan", etc]
  },
  "recommendations": [
    {
      "name": "Restaurant Name",
      "address": "Full address",
      "neighborhood": "Area",
      "priceRange": "$",
      "cuisine": "Type",
      "matchScore": 95,
      "rating": 4.5,
      "reviewSummary": "Brief description",
      "atmosphere": "Casual/Upscale/etc",
      "specialties": ["dish1", "dish2"],
      "dietaryOptions": {
        "glutenFree": true/false,
        "glutenFreeDetails": "Details if true",
        "vegan": true/false,
        "vegetarian": true/false
      },
      "features": ["feature1", "feature2"],
      "hours": {
        "today": "11am-9pm",
        "open": true/false,
        "happyHour": "3-6pm"
      },
      "tucsonFoodie": {
        "hasVoucher": true,
        "voucherAmount": "$20 off",
        "voucherFrequency": "every 6 months",
        "latestArticle": "Article title"
      },
      "currentDeals": ["deal1", "deal2"],
      "whyRecommended": "Reason this matches query",
      "phone": "phone",
      "website": "website",
      "parkingInfo": "Parking details",
      "reservations": "Recommended/Not needed"
    }
  ],
  "searchSummary": "Summary of results",
  "tips": ["tip1", "tip2"]
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
    
    // Check cache first
    const cacheKey = query.toLowerCase();
    if (state.searchCache.has(cacheKey)) {
        const cachedResults = state.searchCache.get(cacheKey);
        state.results = cachedResults;
        renderResults();
        return;
    }
    
    // Check API key
    if (!state.apiKey) {
        document.getElementById('apiKeyModal').classList.remove('hidden');
        return;
    }
    
    // Update UI
    state.loading = true;
    const searchButton = document.getElementById('searchButton');
    searchButton.disabled = true;
    searchButton.innerHTML = '<i data-lucide="loader" class="loading"></i>';
    lucide.createIcons();
    
    // Hide example queries
    document.getElementById('exampleQueries').classList.add('hidden');
    
    try {
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${state.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract JSON from response
        const text = data.candidates[0].content.parts[0].text;
        
        // Try to parse JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in response');
        }
        
        const results = JSON.parse(jsonMatch[0]);
        
        // Enrich results with data from our database
        results.recommendations = results.recommendations.map(rec => {
            const dbData = TUCSON_FOODIE_RESTAURANTS[rec.name];
            if (dbData) {
                // Merge database data with AI recommendations
                return {
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
        showError('Failed to search restaurants. Please check your API key and try again.');
    } finally {
        state.loading = false;
        searchButton.disabled = false;
        searchButton.innerHTML = '<i data-lucide="search"></i>';
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
        
        return `
            <div class="restaurant-card">
                <div class="restaurant-header">
                    <div class="restaurant-info">
                        <div class="restaurant-title-row">
                            <div class="restaurant-number">${idx + 1}</div>
                            <div>
                                <h3 class="restaurant-title">
                                    ${restaurant.name}
                                    <span class="cuisine-tag">(${restaurant.cuisine})</span>
                                    ${restaurant.tucsonFoodie?.hasVoucher ? `
                                        <span class="voucher-badge">
                                            <i data-lucide="tag"></i>
                                            ${restaurant.tucsonFoodie.voucherAmount}
                                        </span>
                                    ` : ''}
                                    ${restaurant.rating ? `
                                        <span class="rating-badge">
                                            <i data-lucide="star"></i>
                                            ${restaurant.rating}
                                        </span>
                                    ` : ''}
                                </h3>
                                <div class="restaurant-meta">
                                    <span class="meta-item">
                                        <i data-lucide="dollar-sign"></i>
                                        ${restaurant.priceRange}
                                    </span>
                                    <span class="meta-item">
                                        <i data-lucide="map-pin"></i>
                                        ${restaurant.neighborhood}
                                    </span>
                                    ${restaurant.hours?.open ? `
                                        <span class="meta-item open-now">
                                            <i data-lucide="clock"></i>
                                            Open Now
                                        </span>
                                    ` : ''}
                                    <span class="meta-item">${restaurant.atmosphere}</span>
                                </div>
                                ${renderDietaryBadges(restaurant)}
                            </div>
                        </div>
                    </div>
                    <div class="restaurant-actions">
                        <div class="match-score">
                            <i data-lucide="star"></i>
                            <span>${restaurant.matchScore}%</span>
                        </div>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${idx})">
                            <i data-lucide="heart"></i>
                        </button>
                    </div>
                </div>
                
                <p class="restaurant-description">${restaurant.whyRecommended}</p>
                
                ${restaurant.reviewSummary ? `
                    <div class="review-summary">
                        <p>"${restaurant.reviewSummary}"</p>
                    </div>
                ` : ''}
                
                ${restaurant.tucsonFoodie?.hasVoucher ? `
                    <div class="voucher-info">
                        <i data-lucide="award"></i>
                        <div class="voucher-details">
                            <strong>Tucson Foodie Member Deal</strong>
                            <p><strong>${restaurant.tucsonFoodie.voucherAmount}</strong> ${restaurant.tucsonFoodie.voucherFrequency}</p>
                        </div>
                    </div>
                ` : ''}
                
                <div class="quick-info">
                    <div class="info-group">
                        <i data-lucide="map-pin"></i>
                        <div class="info-content">
                            <p>${restaurant.address}</p>
                            <div class="info-actions">
                                <button class="info-link" onclick="copyAddress('${restaurant.address.replace(/'/g, "\\'")}')">
                                    <i data-lucide="${state.copiedAddress === restaurant.address ? 'check' : 'copy'}"></i>
                                    ${state.copiedAddress === restaurant.address ? 'Copied!' : 'Copy'}
                                </button>
                                <button class="info-link" onclick="getDirections('${restaurant.address.replace(/'/g, "\\'")}')">
                                    <i data-lucide="external-link"></i>
                                    Directions
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="contact-info">
                        <div>
                            <i data-lucide="phone" style="display: inline; margin-right: 0.5rem;"></i>
                            <a href="tel:${restaurant.phone}" class="contact-link">${restaurant.phone}</a>
                        </div>
                        <div>
                            <i data-lucide="newspaper" style="display: inline; margin-right: 0.5rem;"></i>
                            <button class="contact-link" onclick="openTucsonFoodie('${restaurant.name.replace(/'/g, "\\'")}')">
                                ${restaurant.tucsonFoodie?.latestArticle || 'Find on Tucson Foodie'}
                                <i data-lucide="external-link"></i>
                            </button>
                        </div>
                        ${restaurant.website ? `
                            <div>
                                <i data-lucide="globe" style="display: inline; margin-right: 0.5rem;"></i>
                                <a href="https://${restaurant.website}" target="_blank" rel="noopener" class="contact-link">
                                    Website
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <button class="expand-btn" onclick="toggleCard(${idx})">
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

// Show API key modal
function showApiKeyModal() {
    document.getElementById('apiKeyModal').classList.remove('hidden');
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