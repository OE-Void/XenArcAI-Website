#!/bin/bash

# Health check script for XenArcAI application
# This script checks if the application is running and responding correctly

# Configuration
APP_URL="http://localhost:3000"
HEALTH_ENDPOINT="/api/health"
TIMEOUT=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Checking XenArcAI application health..."

# Check if the application is responding
echo "Testing connectivity to $APP_URL..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT $APP_URL)

if [ $HTTP_STATUS -eq 200 ]; then
    echo -e "${GREEN}✓ Application is accessible${NC}"
else
    echo -e "${RED}✗ Application is not accessible (HTTP $HTTP_STATUS)${NC}"
    exit 1
fi

# Check health endpoint
echo "Testing health endpoint..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT $APP_URL$HEALTH_ENDPOINT)

if [ $HEALTH_STATUS -eq 200 ]; then
    echo -e "${GREEN}✓ Health endpoint is responding${NC}"
    
    # Get health details
    HEALTH_DATA=$(curl -s --max-time $TIMEOUT $APP_URL$HEALTH_ENDPOINT)
    echo "Health data: $HEALTH_DATA"
else
    echo -e "${RED}✗ Health endpoint is not responding (HTTP $HEALTH_STATUS)${NC}"
    exit 1
fi

# Check for essential pages
echo "Testing essential pages..."

PAGES=("/" "/blog" "/research" "/legal/privacy" "/resources")
for PAGE in "${PAGES[@]}"; do
    echo "Testing $PAGE..."
    PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT $APP_URL$PAGE)
    
    if [ $PAGE_STATUS -eq 200 ]; then
        echo -e "${GREEN}✓ $PAGE is accessible${NC}"
    else
        echo -e "${YELLOW}⚠ $PAGE returned HTTP $PAGE_STATUS${NC}"
    fi
done

echo -e "${GREEN}Health check completed successfully!${NC}"