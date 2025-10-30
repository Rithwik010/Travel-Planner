// API Configuration for PlexoTravel
// Update this file with your deployed backend URL after deploying to Render

const API_CONFIG = {
  // Current backend URL (update this after deploying to Render)
  BACKEND_URL: 'https://travel-planner-backend-ao9v.onrender.com',
  
  // API Endpoints
  endpoints: {
    generateItinerary: '/api/generate-itinerary',
    syncUser: '/api/auth/sync-user',
    getUser: '/api/auth/me',
    searchHistory: '/api/user/search-history',
    savedTrips: '/api/user/saved-trips',
    getTrip: '/api/user/trip',
    saveTrip: '/api/user/save-trip',
    unsaveTrip: '/api/user/unsave-trip',
    rateTrip: '/api/user/rate',
    searchImages: '/api/gallery/search-images'
  },
  
  // Get full URL for an endpoint
  getUrl(endpoint) {
    return `${this.BACKEND_URL}${this.endpoints[endpoint] || endpoint}`;
  }
};

// Make it globally available
if (typeof window !== 'undefined') {
  window.API_CONFIG = API_CONFIG;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
