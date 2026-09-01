# CyberGuards Website - VPS Deployment Guide

## Overview

This is a containerized React + TypeScript + Vite application served with Nginx. The Docker setup uses a multi-stage build to create an optimized production image.

## Prerequisites

- A VPS with a Linux distribution (Ubuntu/Debian recommended)
- Docker and Docker Compose installed on your VPS
- SSH access to your VPS
- (Optional) A domain name pointed to your VPS IP

## Quick Start

### 1. Install Docker and Docker Compose on VPS

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo apt install -y docker-compose

# Add your user to docker group (optional, to run docker without sudo)
sudo usermod -aG docker $USER
# Log out and back in for this to take effect
```

### 2. Clone/Upload Your Project to VPS

**Option A: Using Git**

```bash
# Clone the repository
git clone https://github.com/turkimedaziz/ENISo-CyberGuards-Website.git
cd ENISo-CyberGuards-Website
```

**Option B: Using SCP**

```bash
# From your local machine, upload the project
scp -r /path/to/project user@your-vps-ip:/home/user/cyberguards
```

### 3. Build and Run the Container

```bash
# Navigate to project directory
cd /path/to/ENISo-CyberGuards-Website

# Build and start the container
docker-compose up -d --build
```

The application will be available at `http://your-vps-ip` on port 80.

## Docker Commands

### Start the Application

```bash
docker-compose up -d
```

### Stop the Application

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

### Rebuild After Changes

```bash
docker-compose down
docker-compose up -d --build
```

### Check Container Status

```bash
docker-compose ps
```

### Access Container Shell (for debugging)

```bash
docker exec -it cyberguards-website sh
```

## Production Deployment with Domain and HTTPS

### Using Nginx Reverse Proxy with Let's Encrypt

1. **Update docker-compose.yml** to use a different port (e.g., 3000):

```yaml
ports:
  - "3000:80"
```

2. **Install Certbot on VPS**:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

3. **Create Nginx config for reverse proxy** (`/etc/nginx/sites-available/cyberguards`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

4. **Enable the site**:

```bash
sudo ln -s /etc/nginx/sites-available/cyberguards /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Get SSL Certificate**:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Using Traefik for SSL (Alternative)

Create `docker-compose.traefik.yml`:

```yaml
version: "3.8"

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./letsencrypt:/letsencrypt"
    restart: unless-stopped

  cyberguards-website:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cyberguards-website
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.cyberguards.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.cyberguards.entrypoints=websecure"
      - "traefik.http.routers.cyberguards.tls.certresolver=letsencrypt"
      - "traefik.http.services.cyberguards.loadbalancer.server.port=80"
    restart: unless-stopped
```

Then run:

```bash
docker-compose -f docker-compose.traefik.yml up -d
```

## Monitoring and Maintenance

### Check Application Health

```bash
curl http://localhost/health
```

### View Resource Usage

```bash
docker stats cyberguards-website
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Backup (if needed in future)

```bash
# No database required for this static site
# Just backup your code repository
```

## Firewall Configuration

```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (if using SSL)
sudo ufw allow 443/tcp

# Allow SSH (make sure this is allowed!)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop conflicting service (e.g., Apache)
sudo systemctl stop apache2
```

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Check Docker daemon
sudo systemctl status docker
```

### Build Fails

```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
```

## Performance Tips

1. **Enable Gzip Compression**: Already configured in nginx.conf
2. **Use CDN**: Consider CloudFlare for static assets
3. **Monitor Resources**: Use `docker stats` to monitor resource usage
4. **Auto-restart**: Configured with `restart: unless-stopped`

## Security Recommendations

1. Keep Docker updated: `sudo apt update && sudo apt upgrade`
2. Use non-root user in containers (already configured with nginx:alpine)
3. Enable firewall (ufw)
4. Use HTTPS in production
5. Regular security updates
6. Monitor logs regularly

## Cost Optimization

- **Smallest VPS**: 1GB RAM, 1 CPU core is sufficient for this static site
- **Recommended Providers**:
  - DigitalOcean ($6/month)
  - Linode ($5/month)
  - Vultr ($5/month)
  - Hetzner ($4/month)

## Support

For issues related to:

- Application: Check the main repository issues
- Docker: Review Docker logs with `docker-compose logs`
- VPS: Contact your hosting provider

---

**Quick Deployment Summary:**

```bash
# On your VPS
git clone <repository-url>
cd ENISo-CyberGuards-Website
docker-compose up -d --build
# Visit http://your-vps-ip
```

That's it! Your CyberGuards website is now running in a containerized environment.
