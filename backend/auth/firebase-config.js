const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// You'll need to download service account key from Firebase Console
// Go to Project Settings > Service Accounts > Generate New Private Key

let firebaseApp;

function initializeFirebase() {
  try {
    // Check if already initialized
    if (firebaseApp) {
      return firebaseApp;
    }

    // Option 1: Using service account key file (recommended for production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      // Resolve path relative to backend directory
      const serviceAccountPath = path.resolve(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      const serviceAccount = require(serviceAccountPath);
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }
    // Option 2: Using environment variables (for development/deployment)
    else if (process.env.FIREBASE_PROJECT_ID) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }
    else {
      console.warn('⚠️  Firebase Admin SDK not initialized - Missing credentials');
      console.warn('Add Firebase credentials to your .env file');
      return null;
    }

    console.log('✅ Firebase Admin SDK initialized successfully');
    return firebaseApp;
    
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error.message);
    return null;
  }
}

// Get Firebase Auth instance
function getAuth() {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return firebaseApp ? admin.auth() : null;
}

// Verify Firebase ID Token
async function verifyIdToken(idToken) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
}

// Get user by UID
async function getUserByUid(uid) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    const userRecord = await auth.getUser(uid);
    return userRecord;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

// Get user by email
async function getUserByEmail(email) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    const userRecord = await auth.getUserByEmail(email);
    return userRecord;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

// Update user
async function updateUser(uid, properties) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    const userRecord = await auth.updateUser(uid, properties);
    return userRecord;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

// Delete user
async function deleteUser(uid) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    await auth.deleteUser(uid);
    return true;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

// Create custom token
async function createCustomToken(uid, additionalClaims = {}) {
  try {
    const auth = getAuth();
    if (!auth) {
      throw new Error('Firebase not initialized');
    }
    
    const customToken = await auth.createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    throw new Error(`Error creating custom token: ${error.message}`);
  }
}

module.exports = {
  initializeFirebase,
  getAuth,
  verifyIdToken,
  getUserByUid,
  getUserByEmail,
  updateUser,
  deleteUser,
  createCustomToken,
  admin
};
