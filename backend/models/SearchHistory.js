const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  firebaseUid: {
    type: String,
    required: true,
    index: true
  },
  
  // Search Details
  destination: {
    type: String,
    required: true
  },
  
  startDate: {
    type: Date,
    required: true
  },
  
  endDate: {
    type: Date,
    required: true
  },
  
  days: {
    type: Number,
    required: true
  },
  
  interests: [{
    type: String
  }],
  
  travelCompanion: {
    type: String,
    enum: ['Solo', 'Couple', 'Family', 'Friends', 'Group'],
    default: 'Solo'
  },
  
  budget: {
    type: Number,
    default: null
  },
  
  // Generated Itinerary
  itinerary: {
    type: String,
    default: ''
  },
  
  // Metadata
  isSaved: {
    type: Boolean,
    default: false
  },
  
  isShared: {
    type: Boolean,
    default: false
  },
  
  shareLink: {
    type: String,
    default: ''
  },
  
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  
  notes: {
    type: String,
    default: ''
  },
  
  // Timestamps
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
searchHistorySchema.index({ userId: 1, searchedAt: -1 });
searchHistorySchema.index({ firebaseUid: 1, searchedAt: -1 });
searchHistorySchema.index({ destination: 1 });
searchHistorySchema.index({ isSaved: 1 });

// Virtual for duration in text format
searchHistorySchema.virtual('durationText').get(function() {
  return `${this.days} day${this.days > 1 ? 's' : ''}`;
});

// Method to mark as saved
searchHistorySchema.methods.markAsSaved = function() {
  this.isSaved = true;
  return this.save();
};

// Method to add rating
searchHistorySchema.methods.addRating = function(rating) {
  if (rating >= 1 && rating <= 5) {
    this.rating = rating;
    return this.save();
  }
  throw new Error('Rating must be between 1 and 5');
};

// Static method to get user's recent searches
searchHistorySchema.statics.getRecentSearches = async function(firebaseUid, limit = 10) {
  return this.find({ firebaseUid })
    .sort({ searchedAt: -1 })
    .limit(limit)
    .select('-itinerary'); // Exclude large itinerary text for performance
};

// Static method to get user's saved trips
searchHistorySchema.statics.getSavedTrips = async function(firebaseUid) {
  return this.find({ firebaseUid, isSaved: true })
    .sort({ searchedAt: -1 });
};

// Static method to search by destination
searchHistorySchema.statics.searchByDestination = async function(firebaseUid, destination) {
  return this.find({
    firebaseUid,
    destination: new RegExp(destination, 'i') // Case-insensitive search
  })
  .sort({ searchedAt: -1 });
};

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema, 'ItineraryPlanner');

module.exports = SearchHistory;
