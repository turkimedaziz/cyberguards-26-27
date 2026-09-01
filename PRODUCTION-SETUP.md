# 🚀 Production Deployment - Quick Start

## TL;DR - Deploy Now

```bash
# 1. Clone/pull latest code on VPS
git pull origin prod

# 2. Build and run (runs on port 8080, NPM will proxy it)
docker-compose up -d --build

# 3. Configure NPM at http://YOUR_VPS_IP:81
#    - Add proxy host pointing to: cyberguards-website:80
#    - Add your domain: enisocyberguards.ovh
#    - Enable SSL with Let's Encrypt

# Done! Visit https://enisocyberguards.ovh
```

## 📁 Files Overview

- `Dockerfile` - Multi-stage build (Node.js → Nginx)
- `docker-compose.yml` - Standalone deployment (port 8080)
- `docker-compose.prod.yml` - Includes NPM + Website
- `nginx.conf` - Nginx configuration for serving React SPA
- `.dockerignore` - Excludes unnecessary files from build
- `OVH-DEPLOYMENT.md` - **Complete guide for OVH domain setup**
- `DEPLOYMENT.md` - General VPS deployment guide

## 🎯 For Your Setup

Since you have Nginx Proxy Manager ready, use:

```bash
docker-compose up -d --build
```

Then configure NPM to proxy `enisocyberguards.ovh` → `cyberguards-website:80`

**Full instructions**: See `OVH-DEPLOYMENT.md`

## 🔧 Port Configuration

- **Port 80, 443**: Nginx Proxy Manager (already running)
- **Port 81**: NPM Admin Panel
- **Port 8080**: CyberGuards Website (internal, proxied by NPM)

## 📊 Health Check

```bash
# Check containers
docker ps

# Check health
curl http://localhost:8080/health

# Check logs
docker logs cyberguards-website -f
```

## 🔄 Update Process

```bash
git pull origin prod
docker-compose up -d --build
```

That's it! 🎉
