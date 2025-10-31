#!/bin/bash

# Script to update backend API URLs in all frontend files
# Usage: ./update-api-urls.sh YOUR_BACKEND_URL

if [ -z "$1" ]; then
    echo "❌ Error: Backend URL is required"
    echo "Usage: ./update-api-urls.sh YOUR_BACKEND_URL"
    echo "Example: ./update-api-urls.sh https://plexotravel-backend.onrender.com"
    exit 1
fi

NEW_URL=$1
OLD_URL="https://travel-planner-backend-ao9v.onrender.com"

echo "🔄 Updating API URLs..."
echo "Old URL: $OLD_URL"
echo "New URL: $NEW_URL"
echo ""

# Update travel.html
echo "📝 Updating frontend/travel.html..."
sed -i '' "s|$OLD_URL|$NEW_URL|g" frontend/travel.html

# Update dashboard.html
echo "📝 Updating frontend/dashboard.html..."
sed -i '' "s|$OLD_URL|$NEW_URL|g" frontend/dashboard.html

# Update login.html
echo "📝 Updating frontend/login.html..."
sed -i '' "s|$OLD_URL|$NEW_URL|g" frontend/login.html

# Update signup.html
echo "📝 Updating frontend/signup.html..."
sed -i '' "s|$OLD_URL|$NEW_URL|g" frontend/signup.html

# Update config.js
echo "📝 Updating frontend/config.js..."
sed -i '' "s|$OLD_URL|$NEW_URL|g" frontend/config.js

echo ""
echo "✅ All API URLs updated successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Review changes: git diff"
echo "2. Commit changes: git add . && git commit -m 'Update API URLs for production'"
echo "3. Push to GitHub: git push origin main"
echo "4. Vercel will auto-deploy the changes"
echo ""
