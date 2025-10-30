const express = require('express');
const router = express.Router();
const { verifyIdToken, getUserByUid, updateUser, deleteUser } = require('../auth/firebase-config');
const User = require('../models/User');
const { authenticateUser } = require('../auth/auth-middleware');

/**
 * POST /api/auth/sync-user
 * Sync Firebase user with MongoDB
 * This is called after successful login/signup
 */
router.post('/sync-user', async (req, res) => {
  try {
    // Get token from Authorization header or request body
    const authHeader = req.headers.authorization;
    let idToken = req.body.idToken;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      idToken = authHeader.split('Bearer ')[1];
    }

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required in Authorization header or request body' });
    }

    // Verify the Firebase ID token
    const decodedToken = await verifyIdToken(idToken);
    const { uid, email, name, picture, email_verified } = decodedToken;

    // Find or create user in MongoDB
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Create new user
      user = new User({
        firebaseUid: uid,
        email,
        displayName: name || email.split('@')[0],
        photoURL: picture || null,
        emailVerified: email_verified || false
      });
      await user.save();
      console.log(`✅ New user created: ${email}`);
    } else {
      // Update existing user
      user.displayName = name || user.displayName;
      user.photoURL = picture || user.photoURL;
      user.emailVerified = email_verified || user.emailVerified;
      await user.updateLastLogin();
      console.log(`✅ User synced: ${email}`);
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isPremium: user.isPremium,
        stats: user.stats
      }
    });

  } catch (error) {
    console.error('❌ Sync user error:', error);
    res.status(401).json({ error: 'Invalid or expired token', details: error.message });
  }
});

/**
 * GET /api/auth/me
 * Get current user profile
 * Requires authentication
 */
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = req.user.mongoUser;

    res.json({
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isPremium: user.isPremium,
      preferences: user.preferences,
      stats: user.stats,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });

  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

/**
 * PUT /api/auth/profile
 * Update user profile
 * Requires authentication
 */
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { displayName, photoURL, preferences } = req.body;
    const user = req.user;

    // Update fields if provided
    if (displayName) user.displayName = displayName;
    if (photoURL) user.photoURL = photoURL;
    
    if (preferences) {
      if (preferences.darkMode !== undefined) {
        user.preferences.darkMode = preferences.darkMode;
      }
      if (preferences.defaultInterests) {
        user.preferences.defaultInterests = preferences.defaultInterests;
      }
      if (preferences.currency) {
        user.preferences.currency = preferences.currency;
      }
    }

    await user.save();

    // Also update Firebase user if display name or photo changed
    if (displayName || photoURL) {
      const updates = {};
      if (displayName) updates.displayName = displayName;
      if (photoURL) updates.photoURL = photoURL;
      
      await updateUser(user.firebaseUid, updates);
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

/**
 * POST /api/auth/logout
 * Logout (client-side handles Firebase signOut)
 * This endpoint is mainly for logging purposes
 */
router.post('/logout', authenticateUser, async (req, res) => {
  try {
    console.log(`👋 User logged out: ${req.user.email}`);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

/**
 * DELETE /api/auth/account
 * Delete user account (both Firebase and MongoDB)
 * Requires authentication
 */
router.delete('/account', authenticateUser, async (req, res) => {
  try {
    const user = req.user;

    // Delete from MongoDB
    await User.findByIdAndDelete(user._id);

    // Delete from Firebase
    await deleteUser(user.firebaseUid);

    console.log(`🗑️ User account deleted: ${user.email}`);
    res.json({ success: true, message: 'Account deleted successfully' });

  } catch (error) {
    console.error('❌ Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

/**
 * POST /api/auth/verify-token
 * Verify if a token is valid (useful for client-side checks)
 */
router.post('/verify-token', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ valid: false, error: 'Token is required' });
    }

    const decodedToken = await verifyIdToken(idToken);
    
    res.json({
      valid: true,
      uid: decodedToken.uid,
      email: decodedToken.email
    });

  } catch (error) {
    res.json({ valid: false, error: 'Invalid token' });
  }
});

module.exports = router;
