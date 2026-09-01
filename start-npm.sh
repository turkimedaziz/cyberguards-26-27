#!/bin/bash
# Start Nginx Proxy Manager if not running

echo "🚀 Starting Nginx Proxy Manager..."
echo ""

# Check if NPM is already running
if docker ps | grep -q nginx-proxy-manager || docker ps | grep -q jc21/nginx-proxy-manager; then
    echo "✅ NPM is already running!"
    docker ps | grep -E "nginx-proxy-manager|jc21"
    exit 0
fi

# Check if we're in a directory with docker-compose for NPM
if [ -f "docker-compose.prod.yml" ]; then
    echo "📦 Found docker-compose.prod.yml, starting NPM..."
    docker-compose -f docker-compose.prod.yml up -d nginx-proxy-manager
elif [ -f "../nginx-proxy-manager/docker-compose.yml" ]; then
    echo "📦 Found NPM in parent directory..."
    cd ../nginx-proxy-manager && docker-compose up -d
else
    echo "⚠️  No NPM docker-compose file found."
    echo ""
    echo "Please navigate to your NPM directory and run:"
    echo "  docker-compose up -d"
    echo ""
    echo "Or create NPM configuration first if you haven't."
fi

echo ""
echo "🔍 Checking if NPM is now running..."
sleep 3
docker ps | grep -E "nginx-proxy-manager|jc21" || echo "❌ NPM not started"

echo ""
echo "🔥 Checking firewall for port 81..."
sudo ufw status | grep 81 || sudo ufw allow 81/tcp

echo ""
echo "✅ Try accessing: http://$(hostname -I | awk '{print $1}'):81"
