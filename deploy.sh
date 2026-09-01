#!/bin/bash
# CyberGuards Website - Deployment Script
# Run this on your VPS after git pull

set -e

echo "🚀 Starting CyberGuards Website Deployment..."
echo ""

# Update email in .env if needed
echo "📧 Current SSL email: $SSL_EMAIL"
read -p "Press Enter to continue or Ctrl+C to edit .env first..."

# Build and start the container
echo ""
echo "🔨 Building and starting Docker container..."
docker-compose up -d --build

# Wait a bit for container to start
sleep 5

# Check if container is running
echo ""
echo "✅ Checking container status..."
docker ps | grep cyberguards-website

# Test health endpoint
echo ""
echo "🏥 Testing health endpoint..."
sleep 3
curl -f http://localhost:8080/health || echo "⚠️  Health check failed - container may still be starting"

# Show logs
echo ""
echo "📋 Recent logs:"
docker logs --tail 20 cyberguards-website

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 Next steps:"
echo "1. Access NPM admin: http://YOUR_VPS_IP:81"
echo "2. Add Proxy Host:"
echo "   - Domains: enisocyberguards.ovh, www.enisocyberguards.ovh"
echo "   - Forward to: cyberguards-website:80"
echo "   - Enable SSL with Let's Encrypt"
echo ""
echo "3. Configure OVH DNS (if not done):"
echo "   A record: @ -> YOUR_VPS_IP"
echo "   A record: www -> YOUR_VPS_IP"
echo ""
echo "📊 Useful commands:"
echo "   View logs: docker logs -f cyberguards-website"
echo "   Restart: docker-compose restart"
echo "   Stop: docker-compose down"
echo ""
