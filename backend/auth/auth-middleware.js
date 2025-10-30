const { verifyIdToken } = require('./firebase-config');
const User = require('../models/User');

/**
 * Middleware to verify Firebase authentication token
 * Add this to routes that require authentication
 */
async function authenticateUser(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No authentication token provided'
      });
    }

    // Extract token
    const idToken = authHeader.split('Bearer ')[1];

    // Verify token with Firebase
    const decodedToken = await verifyIdToken(idToken);
    
    // Find or create user in MongoDB
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found in database. Please sign up again.'
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account deactivated',
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      mongoUser: user,
      firebaseToken: decodedToken
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.message.includes('Token verification failed')) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid or expired'
      });
    }

    return res.status(500).json({
      error: 'Authentication error',
      message: error.message
    });
  }
}

/**
 * Middleware to check if user is premium
 * Use after authenticateUser middleware
 */
function requirePremium(req, res, next) {
  if (!req.user || !req.user.mongoUser) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  if (!req.user.mongoUser.isPremium) {
    return res.status(403).json({
      error: 'Premium required',
      message: 'This feature is only available for premium users'
    });
  }

  next();
}

/**
 * Middleware to check if email is verified
 * Use after authenticateUser middleware
 */
function requireEmailVerified(req, res, next) {
  if (!req.user || !req.user.mongoUser) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  if (!req.user.emailVerified) {
    return res.status(403).json({
      error: 'Email not verified',
      message: 'Please verify your email address to access this feature'
    });
  }

  next();
}

/**
 * Optional authentication middleware
 * Attaches user if token is present, but doesn't fail if missing
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await verifyIdToken(idToken);
      const user = await User.findOne({ firebaseUid: decodedToken.uid });
      
      if (user && user.isActive) {
        req.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          emailVerified: decodedToken.email_verified,
          mongoUser: user,
          firebaseToken: decodedToken
        };
      }
    }
    
    next();
  } catch (error) {
    // Continue even if authentication fails
    next();
  }
}

module.exports = {
  authenticateUser,
  requirePremium,
  requireEmailVerified,
  optionalAuth
};
