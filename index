import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, MapPin, Clock, DollarSign, Star, Phone, Copy, Check, Heart, 
  Filter, Sparkles, ChevronDown, ChevronUp, Navigation, X, Share2, 
  Save, Globe, List, AlertCircle, Loader, ExternalLink, 
  Utensils, Wine, Music, Sun, Moon, Users, Car, Timer, Tag,
  Newspaper, Edit, Target, Info, Code, Wheat, Award, Calendar,
  MessageSquare, User, BookOpen, TrendingUp, Database, Lock,
  Zap, Bot, Shield
} from 'lucide-react';

const TucsonRestaurantFinder = () => {
  // Core state
  const [query, setQuery] = useState('What are some of the best taco restaurants in town?');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
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
  });
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDemoAlert, setShowDemoAlert] = useState(false);
  const [demoAlertMessage, setDemoAlertMessage] = useState('');
  
  // UI state
  const [favorites, setFavorites] = useState([]);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [sortBy, setSortBy] = useState('matchScore');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterFeatures, setFilterFeatures] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const buildPrompt = (userQuery) => {
    const timeStr = currentTime.toLocaleString('en-US', { timeZone: 'America/Phoenix' });
    const dayStr = currentTime.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Phoenix' });
    const hourStr = currentTime.getHours();
    
    return `You are a comprehensive Tucson restaurant expert. For this DEMO version, create realistic simulated restaurant data based on typical Tucson establishments. Analyze restaurant queries and return ONLY a valid JSON response.

Query: "${userQuery}"

Current time: ${timeStr}
Current day: ${dayStr}
Current hour (24h): ${hourStr}
Location context: Tucson, AZ (general area - specific location features available in production build)

DEMO VERSION NOTES:
- ONLY use Tucson Foodie partner restaurants listed below
- DO NOT create or hallucinate any other restaurants
- Select appropriate restaurants from this list based on the query
- Mix voucher types (monthly, 90 days, 6 months, 12 months) in results

TUCSON FOODIE PARTNER RESTAURANTS WITH COMPLETE INFO:

HIGH-VALUE 12-MONTH VOUCHERS ($40-100):
1. Commoner & Co - Modern American, 6960 E Sunrise Dr, $, (520) 257-1177
2. Kingfisher Bar & Grill - Seafood/American, 2564 E Grant Rd, $, (520) 323-7739
3. Zio Peppe - Italian, 6502 E Tanque Verde Rd, $, (520) 579-0007

6-MONTH VOUCHERS ($20):
4. El Charro Café Downtown - Mexican, 311 N Court Ave, $, (520) 622-1922
5. El Charro Café (Oro Valley) - Mexican, 7725 N Oracle Rd, $, (520) 229-1922
6. El Charro Café Ventana - Mexican, 6910 E Sunrise Dr, $, (520) 514-1922
7. Dante's Kitchen + Cocktails - American, 5755 E River Rd, $, (520) 744-2264
8. Dominick's Real Italian - Italian, 4415 N Campbell Ave, $, (520) 529-2700
9. Kingston Kitchen - Caribbean, 60 E Congress St, $, (520) 306-2840
10. Mojo Cuban Kitchen - Cuban, 7167 E Tanque Verde Rd, $, (520) 298-3188
11. Penca - Latin American, 50 E Broadway Blvd, $, (520) 203-7681
12. Prep & Pastry - American/Brunch, 3073 N Campbell Ave, $, (520) 326-7737
13. Renee's Tucson - American, 7065 E Tanque Verde Rd, $, (520) 299-2500
14. Rocco's Little Chicago - Pizza, 2707 E Broadway Blvd, $, (520) 321-1860
15. Tabu - Global Fusion, 7090 E Speedway Blvd, $, (520) 885-8228
16. Tavolino Ristorante - Italian, 2890 N Swan Rd, $, (520) 531-1913
17. The Monica - Pizza, 2526 E 6th St, $, (520) 327-7712
18. Tucson Wings - Wings/Sports Bar, 5966 E Speedway Blvd, $, (520) 571-9464

90-DAY VOUCHERS ($10-20):
19. BATA - Modern American, 35 E Toole Ave, $, (520) 798-2282
20. Bubbe's Fine Bagels - Bagels/Deli, 1101 N Wilmot Rd, $, (520) 322-9411
21. Cafe Francais - French Bakery, 7831 E Wrightstown Rd, $, (520) 886-0760
22. Calle Tepa - Mexican, 6151 E Broadway Blvd, $, (520) 305-4600
23. Corbett's - American, 340 N 6th Ave, $, (520) 884-5600
24. Ghini's French Caffe - French, 1803 E Prince Rd, $, (520) 326-9095
25. HUB Restaurant - American, 266 E Congress St, $, (520) 207-8201
26. Lindy's on 4th - Burgers, 431 N 4th Ave, $, (520) 207-1280
27. Lovin' Spoonfuls - Vegan, 2990 N Campbell Ave, $, (520) 325-7766
28. Monsoon Chocolate - Chocolate/Cafe, 2545 E Speedway Blvd, $, (520) 251-8144
29. Nook - American/Brunch, 3200 E Speedway Blvd, $, (520) 232-7200
30. Penelope Pizza - Pizza, 3071 N Alvernon Way, $, (520) 793-1600
31. Postino - Wine Bar, 5285 E Broadway Blvd, $, (520) 526-0121
32. Vera Earl Premium Beef - Steakhouse, 121 E Congress St, $, (520) 344-2275

MONTHLY VOUCHERS ($5-25):
33. Brooklyn's Beers & Burger - Burgers, 7125 E Tanque Verde Rd, $, (520) 751-1772
34. Mariscos Chihuahua (6th Ave) - Mexican Seafood, 1001 N Grande Ave, $, (520) 623-3563
35. Mariscos Chihuahua (Ina) - Mexican Seafood, 4011 W Ina Rd, $, (520) 572-1233
36. Salad Nation - Salads, 3420 E Speedway Blvd, $, (520) 318-5160
37. Thunder Bacon Burger Co - Burgers, 7330 E Broadway Blvd, $, (520) 885-1908
38. Transit Tea - Tea House, 411 N 4th Ave, $, (520) 770-1166
39. Whole Slvce Pizza - Pizza, 50 S Houghton Rd, $, (520) 439-5090

TUCSON FOODIE MEMBER VOUCHERS (for partner restaurants only):
Every 12 Months: Commoner & Co ($40), Kingfisher ($40), Zio Peppe ($40)

Every 6 Months: Charro concepts ($20), Dante's Kitchen ($20 + $1 off cocktails), Dominick's ($20), Kingston Kitchen ($20), Mojo Cuban ($20), Penca ($20), Prep & Pastry ($20), Renee's Tucson ($20), Rocco's Little Chicago ($20), Tabu ($20), Tavolino ($20), The Monica ($20), Tucson Wings ($20)

Every 90 Days: BATA ($10), Bubbe's Bagels ($10), Cafe Francais ($10), Calle Tepa ($10), Corbett's ($10), Ghini's French Caffe ($15), HUB ($10), Lindy's on 4th ($10), Lovin' Spoonfuls ($10), Nook ($10), Penelope Pizza ($10), Postino ($10), Vera Earl ($20)

Monthly: Brooklyn's Beers & Burger ($10), Mariscos Chihuahua (both locations $10), Salad Nation ($10), Thunder Bacon Burger ($5), Whole Slvce Pizza (25% off)

Search for restaurant information from the list above including:
- Select restaurants that match the query criteria
- Verify hours based on current time
- Filter by neighborhood, cuisine type, price range as requested
- Include voucher details for all results
- Prioritize by match relevance

Return a JSON object with this EXACT structure:
{
  "interpretedQuery": {
    "searchType": "general/deals/dietary/atmosphere/location",
    "cuisineTypes": ["mexican", "italian", etc],
    "features": ["outdoor seating", "live music", "gluten free", etc],
    "priceRange": "budget/moderate/upscale/any",
    "location": "specific area or landmark mentioned",
    "timeConstraints": ["now", "tonight", "lunch", etc],
    "dietary": ["gluten-free", "vegan", "vegetarian", etc]
  },
  "recommendations": [
    {
      "name": "Restaurant Name",
      "address": "Full address in Tucson, AZ",
      "neighborhood": "Downtown/University/East Side/etc",
      "priceRange": "$-$$$$",
      "cuisine": "Primary cuisine type",
      "matchScore": 0-100,
      "rating": 4.5,
      "reviewSummary": "Brief summary of what reviewers say",
      "atmosphere": "Casual/Upscale/Family-friendly/Romantic/etc",
      "specialties": ["signature dish 1", "signature dish 2"],
      "dietaryOptions": {
        "glutenFree": true/false,
        "glutenFreeDetails": "Details about GF options",
        "vegan": true/false,
        "vegetarian": true/false,
        "otherDietary": ["keto", "dairy-free", etc]
      },
      "features": ["outdoor patio", "full bar", "live music Fridays", "dog friendly", etc],
      "hours": {
        "today": "11am-10pm",
        "open": true/false,
        "happyHour": "3-6pm weekdays"
      },
      "tucsonFoodie": {
        "hasVoucher": true/false,
        "voucherAmount": "$20 off",
        "voucherFrequency": "every 6 months",
        "latestArticle": "Review title or feature",
        "articleDate": "2024-03-15"
      },
      "currentDeals": ["Happy hour 3-6pm", "Taco Tuesday $2 tacos", etc],
      "whyRecommended": "Specific reason this matches the query",
      "phone": "Use exact phone number from list above",
      "website": "Use exact website from list (some don't have www)",
      "parkingInfo": "Street parking or private lot",
      "reservations": "Recommended/Not needed/Required"
    }
  ],
  "searchSummary": "Summary of what was found based on the search criteria",
  "tips": ["Relevant tips about timing, reservations, parking, best dishes, etc"]
}

Include 5-8 restaurant recommendations from the Tucson Foodie partner list above. Your response MUST be ONLY the JSON object. DO NOT include any other text, markdown formatting, or backticks.`;
  };

  const searchRestaurants = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const prompt = buildPrompt(query);
      const response = await window.claude.complete(prompt);
      
      try {
        const parsed = JSON.parse(response);
        // Remove preloaded flag for new searches
        parsed.preloaded = false;
        setResults(parsed);
        setExpandedCards({});
        
        // Add to search history
        if (!searchHistory.includes(query)) {
          setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        setError('Failed to parse restaurant data. Please try again.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (restaurant) => {
    const newFavorites = favorites.some(f => f.name === restaurant.name)
      ? favorites.filter(f => f.name !== restaurant.name)
      : [...favorites, restaurant];
    
    setFavorites(newFavorites);
  };

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const shareResults = () => {
    setDemoAlertMessage('In a production build, you\'ll be able to share your restaurant discoveries via text, email, or social media with custom formatting and your personal recommendations.');
    setShowDemoAlert(true);
  };

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getSortedAndFilteredResults = () => {
    if (!results?.recommendations) return [];
    
    let filtered = [...results.recommendations];
    
    // Apply price filter
    if (filterPrice !== 'all') {
      filtered = filtered.filter(r => r.priceRange.length === parseInt(filterPrice));
    }
    
    // Apply feature filters
    if (filterFeatures.length > 0) {
      filtered = filtered.filter(r => 
        filterFeatures.every(feature => {
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
      switch (sortBy) {
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
  };

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      timeZone: 'America/Phoenix',
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDirections = (restaurant) => {
    const destination = `${restaurant.address}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  const openTucsonFoodie = (restaurant) => {
    setDemoAlertMessage(`In a production build, this will open the most recent Tucson Foodie article about ${restaurant.name}. The system will search through all Tucson Foodie articles to find the latest review, feature story, or mention.`);
    setShowDemoAlert(true);
  };

  const getFeatureIcon = (feature) => {
    const featureMap = {
      'outdoor': Sun,
      'music': Music,
      'bar': Wine,
      'family': Users,
      'parking': Car,
      'gluten': Wheat,
      'vegan': Utensils,
      'voucher': Tag,
      'deal': DollarSign
    };
    
    for (const [key, Icon] of Object.entries(featureMap)) {
      if (feature.toLowerCase().includes(key)) {
        return <Icon size={14} />;
      }
    }
    return <Utensils size={14} />;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Demo Alert Modal */}
      {showDemoAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="text-red-600 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Available in Production Build</h3>
                <p className="text-gray-600 text-sm">{demoAlertMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDemoAlert(false)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Header with Tucson Foodie branding */}
      <div className="text-center mb-6 md:mb-8">
        <div className="mb-4">
          <div className="bg-yellow-300 text-red-600 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm mb-2 animate-pulse">
            <Zap size={16} />
            LIVE DEMO
            <Zap size={16} />
          </div>
          <div className="bg-red-600 text-yellow-400 inline-block px-4 py-2 font-black text-2xl">
            TUCSON FOODIE
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          AI Restaurant Discovery Assistant
        </h1>
        <p className="text-gray-600 mb-3">Ask me anything about Tucson restaurants - I'll find the perfect spot for you!</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 max-w-2xl mx-auto">
          <p className="text-sm text-amber-800 font-medium flex items-center gap-2 justify-center">
            <AlertCircle size={16} />
            Demo Version - Limited Features
          </p>
          <p className="text-xs text-amber-700 mt-1 text-center">
            This demo uses simulated data from Tucson Foodie partner restaurants only. A production build would include real-time internet search, 
            all Tucson restaurants, accurate hours/ratings, and responds in under 5 seconds.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {formatTime(currentTime)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            Tucson, AZ
          </span>
        </div>
      </div>

      {/* Search Bar - More Prominent */}
      <div className="mb-8">
        <div className="text-center mb-2">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Timer size={12} />
            Demo runs on throttled AI - Production build responds in under 5 seconds
          </p>
        </div>
        <div className="relative shadow-lg rounded-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Clear preloaded results when user starts typing
              if (results?.preloaded && e.target.value !== query) {
                setResults(null);
              }
            }}
            onKeyPress={(e) => e.key === 'Enter' && searchRestaurants()}
            onFocus={() => setShowSearchHistory(true)}
            onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
            placeholder="Ask me anything about Tucson restaurants..."
            className="w-full px-6 py-4 pr-14 rounded-lg border-2 border-red-200 focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 text-gray-700 text-lg bg-white"
          />
          <button
            onClick={searchRestaurants}
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 transition-colors shadow-md"
          >
            {loading ? (
              <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search size={24} />
            )}
          </button>
          
          {/* Search History Dropdown */}
          {showSearchHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <p className="text-xs text-gray-500 px-2 py-1">Recent searches</p>
                {searchHistory.map((historyQuery, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(historyQuery);
                      setShowSearchHistory(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
                  >
                    {historyQuery}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Example Queries */}
      {!results && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-3 text-center">Try these example searches:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQueries.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(example)}
                className="text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-sm text-gray-700 shadow-sm hover:shadow-md"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* View Mode Toggle & Filters */}
      {results && (
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap gap-3">
            {/* View Mode */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List size={18} />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Globe size={18} />
                Map
              </button>
            </div>
            
            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Filter size={18} />
              Filters & Sort
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {/* Share Button */}
            <button
              onClick={shareResults}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4 shadow-sm">
              <p className="text-xs text-gray-500 italic">Select features to show only restaurants that have them</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="matchScore">Best Match</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Price range:</label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="1">$ (Budget)</option>
                    <option value="2">$$ (Moderate)</option>
                    <option value="3">$$$ (Upscale)</option>
                    <option value="4">$$$$ (Fine Dining)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-2">Features:</label>
                <div className="flex flex-wrap gap-2">
                  {['Has Voucher', 'Gluten Free', 'Vegan', 'Outdoor Seating', 'Open Now'].map(feature => (
                    <button
                      key={feature}
                      onClick={() => {
                        setFilterFeatures(prev =>
                          prev.includes(feature.toLowerCase())
                            ? prev.filter(f => f !== feature.toLowerCase())
                            : [...prev, feature.toLowerCase()]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filterFeatures.includes(feature.toLowerCase())
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {feature === 'Has Voucher' && <Tag size={12} className="inline mr-1" />}
                      {feature === 'Gluten Free' && <Wheat size={12} className="inline mr-1" />}
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Search Summary */}
      {results && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
          {results.preloaded && (
            <p className="text-xs text-yellow-700 font-medium mb-2 flex items-center gap-1">
              <Info size={12} />
              Showing preloaded demo results - Try your own search above to see more demo results!
            </p>
          )}
          <p className="text-gray-700">{results.searchSummary}</p>
          {results.tips && results.tips.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-600">Tips:</p>
              <ul className="text-sm text-gray-600 mt-1">
                {results.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-red-600 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-3">
            Showing {getSortedAndFilteredResults().length} of {results.recommendations.length} results
          </p>
        </div>
      )}

      {/* Results Container */}
      {results && (
        <div className={viewMode === 'map' ? 'relative' : ''}>
          {/* Map View */}
          {viewMode === 'map' && (
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <div className="text-center">
                <Globe size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 mb-4">
                  Available in a production build with GPS location and real-time directions
                </p>
                <button
                  onClick={() => setViewMode('list')}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Switch to List View
                </button>
              </div>
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {getSortedAndFilteredResults().map((restaurant, idx) => {
                const isFavorite = favorites.some(f => f.name === restaurant.name);
                const isExpanded = expandedCards[idx];
                const isSelected = selectedRestaurant?.name === restaurant.name;
                
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all ${
                      isSelected ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                                {restaurant.name}
                                <span className="text-sm font-normal text-gray-500">
                                  ({restaurant.cuisine})
                                </span>
                                {restaurant.tucsonFoodie?.hasVoucher && (
                                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Tag size={10} />
                                    {restaurant.tucsonFoodie.voucherAmount}
                                  </span>
                                )}
                                {restaurant.rating && (
                                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Star size={10} fill="currentColor" />
                                    {restaurant.rating}
                                  </span>
                                )}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                                <span className="flex items-center gap-1 text-gray-600">
                                  <DollarSign size={14} />
                                  {restaurant.priceRange}
                                </span>
                                <span className="flex items-center gap-1 text-gray-600">
                                  <MapPin size={14} />
                                  {restaurant.neighborhood}
                                </span>
                                {restaurant.hours?.open && (
                                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                                    <Clock size={14} />
                                    Open Now
                                  </span>
                                )}
                                <span className="text-gray-600">
                                  {restaurant.atmosphere}
                                </span>
                              </div>
                              {/* Rating source */}
                              {restaurant.rating && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Based on aggregated reviews
                                </p>
                              )}
                              {/* Feature badges */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {restaurant.dietaryOptions?.glutenFree && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                                    <Wheat size={10} />
                                    GF
                                  </span>
                                )}
                                {restaurant.dietaryOptions?.vegan && (
                                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                    Vegan
                                  </span>
                                )}
                                {restaurant.features?.some(f => f.toLowerCase().includes('outdoor') || f.toLowerCase().includes('patio')) && (
                                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                                    <Sun size={10} />
                                    Outdoor
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                            <Star size={16} className="text-yellow-600" />
                            <span className="font-semibold text-yellow-700">
                              {restaurant.matchScore}%
                            </span>
                          </div>
                          <button
                            onClick={() => toggleFavorite(restaurant)}
                            className={`p-2 rounded-full transition-colors ${
                              isFavorite 
                                ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 ml-11">{restaurant.whyRecommended}</p>

                      {/* Review Summary */}
                      {restaurant.reviewSummary && (
                        <div className="ml-11 mb-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700 italic">"{restaurant.reviewSummary}"</p>
                        </div>
                      )}

                      {/* Tucson Foodie Info */}
                      {restaurant.tucsonFoodie?.hasVoucher && (
                        <div className="ml-11 mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
                          <div className="flex items-start gap-2">
                            <Award size={16} className="text-red-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                Tucson Foodie Member Deal
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                <strong>{restaurant.tucsonFoodie.voucherAmount}</strong> {restaurant.tucsonFoodie.voucherFrequency}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ml-11">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">{restaurant.address}</p>
                            <div className="flex gap-3 mt-1">
                              <button
                                onClick={() => copyAddress(restaurant.address)}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                {copiedAddress === restaurant.address ? (
                                  <>
                                    <Check size={12} />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy size={12} />
                                    Copy
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => getDirections(restaurant)}
                                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                <ExternalLink size={12} />
                                Directions
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            <a
                              href={`tel:${restaurant.phone}`}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              {restaurant.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Newspaper size={16} className="text-gray-400" />
                            <button
                              onClick={() => openTucsonFoodie(restaurant)}
                              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                            >
                              {restaurant.tucsonFoodie?.latestArticle || 'Find on Tucson Foodie'}
                              <ExternalLink size={10} />
                            </button>
                          </div>
                          {restaurant.website && (
                            <div className="flex items-center gap-2">
                              <Globe size={16} className="text-gray-400" />
                              <a
                                href={`https://${restaurant.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-red-600 hover:text-red-700"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <button
                        onClick={() => toggleCard(idx)}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-11"
                      >
                        {isExpanded ? 'Show less' : 'Show more details'}
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 ml-11">
                          {/* Specialties */}
                          {restaurant.specialties && restaurant.specialties.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties & Must-Try Dishes:</h4>
                              <div className="flex flex-wrap gap-2">
                                {restaurant.specialties.map((dish, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="px-3 py-1 bg-orange-50 border border-orange-200 rounded-md text-sm text-gray-700"
                                  >
                                    {dish}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Dietary Details */}
                          {restaurant.dietaryOptions?.glutenFreeDetails && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                <Wheat size={16} />
                                Gluten-Free Options:
                              </h4>
                              <p className="text-sm text-gray-600">{restaurant.dietaryOptions.glutenFreeDetails}</p>
                            </div>
                          )}

                          {/* Features */}
                          {restaurant.features && restaurant.features.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Features & Amenities:</h4>
                              <div className="flex flex-wrap gap-2">
                                {restaurant.features.map((feature, fIdx) => (
                                  <span
                                    key={fIdx}
                                    className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 flex items-center gap-1"
                                  >
                                    {getFeatureIcon(feature)}
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Current Deals */}
                          {restaurant.currentDeals && restaurant.currentDeals.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Deals & Specials:</h4>
                              <ul className="space-y-1">
                                {restaurant.currentDeals.map((deal, dIdx) => (
                                  <li key={dIdx} className="text-sm text-gray-600 flex items-start gap-1">
                                    <span className="text-red-600 mt-0.5">•</span>
                                    {deal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Additional Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Hours */}
                            {restaurant.hours && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                                  Hours:
                                </h4>
                                <p className="text-sm text-gray-600">Today: {restaurant.hours.today}</p>
                                {restaurant.hours.happyHour && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    Happy Hour: {restaurant.hours.happyHour}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Parking */}
                            {restaurant.parkingInfo && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                                  Parking:
                                </h4>
                                <p className="text-sm text-gray-600">{restaurant.parkingInfo}</p>
                              </div>
                            )}

                            {/* Reservations */}
                            {restaurant.reservations && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                                  Reservations:
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">{restaurant.reservations}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && !results && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="text-red-500" fill="currentColor" />
            Your Favorite Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((restaurant, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {restaurant.cuisine} • {restaurant.priceRange} 
                      {restaurant.rating && ` • ${restaurant.rating}★`}
                    </p>
                    {restaurant.tucsonFoodie?.hasVoucher && (
                      <p className="text-sm text-green-700 font-medium mt-1 flex items-center gap-1">
                        <Tag size={12} />
                        {restaurant.tucsonFoodie.voucherAmount}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(restaurant)}
                    className="p-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{restaurant.address}</p>
                <div className="flex gap-3 mt-3">
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                  <button
                    onClick={() => getDirections(restaurant)}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <MapPin size={12} />
                    Directions
                  </button>
                  <button
                    onClick={() => openTucsonFoodie(restaurant)}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Newspaper size={12} />
                    Tucson Foodie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Possible Features Section */}
      <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles size={20} />
          Possible Features for Production Build
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Globe size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Real-Time Internet Search</p>
                <p className="text-xs text-gray-600">Live data from Google, Yelp, and other sources in under 5 seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">GPS Location & Distance Search</p>
                <p className="text-xs text-gray-600">Find restaurants "within 2 miles" or "5 minutes away"</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe size={16} className="text-purple-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Interactive Maps</p>
                <p className="text-xs text-gray-600">Visual restaurant locations with real-time directions</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Database size={16} className="text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Complete Tucson Foodie Archive</p>
                <p className="text-xs text-gray-600">Search all articles and reviews ever published</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Share2 size={16} className="text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Social Sharing</p>
                <p className="text-xs text-gray-600">Share discoveries via text, email, or social media</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User size={16} className="text-pink-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Personalized Recommendations</p>
                <p className="text-xs text-gray-600">AI learns your taste preferences over time</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tag size={16} className="text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Smart Voucher Tracking</p>
                <p className="text-xs text-gray-600">Track used vouchers and reset dates</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar size={16} className="text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Direct Reservations</p>
                <p className="text-xs text-gray-600">Book tables through OpenTable integration</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gray-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Member-Only Features</p>
                <p className="text-xs text-gray-600">Exclusive deals and early access to new restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">AI-powered restaurant discovery with real-time search</p>
          <p className="text-lg">
            Prepared for 
            <a 
              href="https://tucsonfoodie.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 mx-1 font-bold"
            >
              Tucson Foodie
            </a>
          </p>
        </div>
        <div className="text-xs text-gray-500">
          <p>
            Powered by 
            <a 
              href="https://www.skyislandai.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sky Island AI
            </a>
            • Demo Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default TucsonRestaurantFinder;
