const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Firebase UID - primary identifier
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  displayName: {
    type: String,
    default: ''
  },
  
  photoURL: {
    type: String,
    default: ''
  },
  
  // Authentication Info
  emailVerified: {
    type: Boolean,
    default: false
  },
  
  authProvider: {
    type: String,
    enum: ['email', 'google', 'facebook', 'github'],
    default: 'email'
  },
  
  // User Preferences
  preferences: {
    darkMode: {
      type: Boolean,
      default: false
    },
    defaultInterests: [{
      type: String
    }],
    currency: {
      type: String,
      default: 'INR'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  isPremium: {
    type: Boolean,
    default: false
  },
  
  // Statistics
  stats: {
    totalSearches: {
      type: Number,
      default: 0
    },
    totalItineraries: {
      type: Number,
      default: 0
    },
    savedTrips: {
      type: Number,
      default: 0
    }
  },
  
  // Timestamps
  lastLogin: {
    type: Date,
    default: Date.now
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Indexes for better query performance (email and firebaseUid already have unique indexes)
userSchema.index({ createdAt: -1 });

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Method to increment search count
userSchema.methods.incrementSearches = function() {
  this.stats.totalSearches += 1;
  return this.save();
};

// Method to increment itinerary count
userSchema.methods.incrementItineraries = function() {
  this.stats.totalItineraries += 1;
  return this.save();
};

// Static method to find or create user
userSchema.statics.findOrCreate = async function(firebaseUser) {
  try {
    let user = await this.findOne({ firebaseUid: firebaseUser.uid });
    
    if (!user) {
      user = await this.create({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photoURL: firebaseUser.photoURL || '',
        emailVerified: firebaseUser.emailVerified || false,
        authProvider: firebaseUser.providerData?.[0]?.providerId?.split('.')[0] || 'email',
        lastLogin: new Date()
      });
    } else {
      // Update last login
      await user.updateLastLogin();
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
