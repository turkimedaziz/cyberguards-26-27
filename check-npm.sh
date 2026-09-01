#!/bin/bash
# Troubleshoot Nginx Proxy Manager

echo "🔍 Checking Nginx Proxy Manager status..."
echo ""

echo "1️⃣ Checking if NPM container is running:"
docker ps -a | grep -E "nginx-proxy-manager|jc21" || echo "❌ NPM container not found!"

echo ""
echo "2️⃣ Checking port 81 is listening:"
sudo netstat -tlnp | grep :81 || sudo ss -tlnp | grep :81 || echo "❌ Nothing listening on port 81"

echo ""
echo "3️⃣ Checking firewall status:"
sudo ufw status | grep 81 || echo "⚠️  Port 81 might not be allowed in firewall"

echo ""
echo "4️⃣ If NPM container exists, check logs:"
docker logs nginx-proxy-manager --tail 30 2>/dev/null || docker logs app --tail 30 2>/dev/null || echo "❌ No NPM container logs found"

echo ""
echo "5️⃣ Checking Docker networks:"
docker network ls | grep proxy

echo ""
echo "📋 All running containers:"
docker ps

echo ""
echo "---"
echo "💡 To fix, you may need to:"
echo "   1. Start NPM: cd to your NPM directory and run 'docker-compose up -d'"
echo "   2. Allow port in firewall: sudo ufw allow 81/tcp"
echo "   3. Check if another service is using port 81"
