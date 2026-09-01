#!/bin/bash
# Quick fix and redeploy script

echo "🔧 Fixing Docker Compose issue..."
echo ""

# Stop and remove old containers
echo "🛑 Stopping old containers..."
docker-compose down -v

# Remove old images to force clean build
echo "🧹 Cleaning old images..."
docker rmi eniso-cyberguards-website_cyberguards-website 2>/dev/null || true

# Rebuild and start fresh
echo ""
echo "🚀 Building and starting fresh..."
docker-compose up -d --build --force-recreate

# Wait for container to be ready
echo ""
echo "⏳ Waiting for container to start..."
sleep 5

# Check status
echo ""
echo "✅ Container status:"
docker ps | grep cyberguards-website

# Test the application
echo ""
echo "🏥 Testing application..."
sleep 2
curl -s http://localhost:8080/health && echo " - Health check: OK" || echo " - Health check: Starting..."

echo ""
echo "📋 Container logs (last 15 lines):"
docker logs --tail 15 cyberguards-website

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 Next steps:"
echo "1. Verify site works: curl http://localhost:8080"
echo "2. Access NPM admin: http://$(hostname -I | awk '{print $1}'):81"
echo "3. Configure proxy host in NPM:"
echo "   - Domain: enisocyberguards.ovh"
echo "   - Forward to: cyberguards-website:80"
echo "   - Enable SSL"
echo ""
