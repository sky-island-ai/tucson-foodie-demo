# Tucson Foodie AI Restaurant Discovery Assistant

A live, deployable version of the Tucson Foodie restaurant discovery tool powered by Google's Gemini 2.0 Flash AI model. This demo showcases an intelligent restaurant recommendation system for Tucson Foodie members.

## 🚀 Live Demo

You can deploy this directly to GitHub Pages or any static hosting service. The application runs entirely in the browser with no backend required.

## 🔧 Setup Instructions

### Quick Start - Demo API Key Included!

The demo includes a heavily throttled API key for immediate testing. Just deploy and start using!

### For Better Performance - Get Your Own API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Click "use your own key" link in the demo to enter it

### 2. Deploy to GitHub Pages

1. Fork or clone this repository
2. Push to your GitHub repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" (or your default branch) and "/root"
6. Click Save
7. Your site will be available at `https://[your-username].github.io/[repo-name]/`

### 3. First Time Use

The demo works immediately with the included throttled API key! Just start searching for restaurants.

For better performance:
1. Click "use your own key" in the warning banner
2. Enter your personal Gemini API key
3. The key is stored locally in your browser (never sent to any server)

## 🌟 Features

- **Natural Language Search**: Ask questions like "best tacos near downtown" or "romantic date spots with wine"
- **Smart Filtering**: Filter by price, dietary options, outdoor seating, and more
- **Tucson Foodie Vouchers**: See exclusive member deals and voucher amounts
- **Detailed Information**: Hours, specialties, parking, contact info, and reviews
- **Favorites System**: Save your favorite restaurants locally
- **Mobile Responsive**: Works great on all devices

## 🛠️ Technical Details

- **Frontend Only**: Pure HTML, CSS, and JavaScript (no framework dependencies)
- **AI Model**: Google Gemini 2.0 Flash for fast, intelligent responses
- **Icons**: Lucide icons loaded from CDN
- **Storage**: LocalStorage for API key, favorites, and search history
- **API**: Direct integration with Google's Generative Language API

## 📁 File Structure

```
tucson-foodie-live/
├── index.html           # Main HTML file
├── styles.css          # All styling
├── app.js              # Main application logic
├── restaurants-data.js # Tucson Foodie partner restaurant database
└── README.md           # This file
```

## 🔒 Security Notes

- API keys are stored locally in the browser using localStorage
- No data is sent to any backend server
- All processing happens client-side
- For production use, consider implementing rate limiting and usage monitoring

## 🎯 Customization

### Changing the Restaurant Database

Edit `restaurants-data.js` to add or modify restaurants. Each restaurant should have:

```javascript
"Restaurant Name": {
    name: "Restaurant Name",
    address: "Full address",
    neighborhood: "Area",
    priceRange: "$-$$$$",
    cuisine: "Type",
    rating: 4.5,
    phone: "(520) xxx-xxxx",
    website: "website.com",
    voucher: { amount: "$X off", frequency: "timeframe" },
    features: ["feature1", "feature2"],
    specialties: ["dish1", "dish2"],
    dietaryOptions: { glutenFree: true/false, vegetarian: true/false, vegan: true/false }
}
```

### Modifying the AI Prompt

The AI prompt is in `app.js` in the `buildPrompt()` function. You can customize:
- How the AI interprets queries
- What information is returned
- The structure of recommendations

### Styling Changes

All styles are in `styles.css`. The design uses:
- CSS variables for easy color theming
- Flexbox and Grid for layouts
- Mobile-first responsive design

## 🚦 API Rate Limits

Gemini API has the following limits for free tier:
- 15 requests per minute
- 1 million tokens per month

For production use, consider:
- Implementing request throttling
- Caching common queries
- Monitoring usage

## 📝 License

This demo is provided as-is for educational and demonstration purposes.

## 🤝 Contributing

Feel free to submit issues or pull requests to improve the demo!

## 🏗️ Production Considerations

For a production deployment, consider:

1. **API Key Management**: Use environment variables or a proxy server
2. **Rate Limiting**: Implement client-side request throttling
3. **Caching**: Cache common queries to reduce API calls
4. **Analytics**: Add usage tracking
5. **Error Handling**: More robust error messages and fallbacks
6. **Real Data**: Integrate with live restaurant APIs
7. **Authentication**: Add user accounts for personalized features

## 🎉 Demo vs Production

This demo includes:
- ✅ Working AI-powered search
- ✅ Filtering and sorting
- ✅ Favorites system
- ✅ Mobile responsive design
- ✅ Tucson Foodie partner data

A production version would add:
- 🚀 Real-time restaurant data
- 🚀 GPS-based location search
- 🚀 Interactive maps
- 🚀 Direct reservation booking
- 🚀 Social sharing
- 🚀 User accounts and preferences
- 🚀 Complete Tucson Foodie article integration

---

Built with ❤️ for Tucson Foodie by Sky Island AI