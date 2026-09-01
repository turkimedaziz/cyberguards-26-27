# CyberGuards Website - OVH Domain + Nginx Proxy Manager Setup

## 🎯 Quick Deployment with Your Existing NPM Setup

Since you already have Nginx Proxy Manager running, follow this guide to deploy your CyberGuards website with your OVH domain.

---

## 📋 Prerequisites

- ✅ VPS with Docker and Docker Compose installed
- ✅ Nginx Proxy Manager already running (on ports 80, 443, 81)
- ✅ Domain name from OVH (e.g., `enisocyberguards.ovh`)

---

## 🚀 Deployment Steps

### Step 1: Configure Your OVH Domain DNS

1. **Log in to OVH Manager**: https://www.ovh.com/manager/
2. **Go to your domain** → DNS Zone
3. **Add/Update these DNS records**:

   ```
   Type: A
   Subdomain: @
   Target: YOUR_VPS_IP_ADDRESS
   TTL: 3600

   Type: A
   Subdomain: www
   Target: YOUR_VPS_IP_ADDRESS
   TTL: 3600
   ```

4. **Save and wait** for DNS propagation (5-30 minutes)

5. **Verify DNS propagation**:
   ```bash
   # From your local machine or VPS
   dig enisocyberguards.ovh
   dig www.enisocyberguards.ovh
   ```

---

### Step 2: Deploy the CyberGuards Website

#### Option A: Deploy Alongside Existing NPM (Recommended)

```bash
# Navigate to project directory
cd /home/hama/Desktop/cyberguards/ENISo-CyberGuards-Website

# Build and start the website (on port 8080 internally)
docker-compose up -d --build

# Verify it's running
docker ps
curl http://localhost:8080
```

#### Option B: Deploy Everything Together (If NPM not yet running)

```bash
# Use the production compose file
docker-compose -f docker-compose.prod.yml up -d --build

# This will start both NPM and your website
```

---

### Step 3: Configure Nginx Proxy Manager

1. **Access NPM Admin Panel**:

   - Open browser: `http://YOUR_VPS_IP:81`
   - Default credentials:
     - Email: `admin@example.com`
     - Password: `changeme`
   - **⚠️ Change these immediately after first login!**

2. **Add Proxy Host**:

   - Click **"Hosts"** → **"Proxy Hosts"** → **"Add Proxy Host"**

   **Details Tab:**

   ```
   Domain Names: enisocyberguards.ovh, www.enisocyberguards.ovh
   Scheme: http
   Forward Hostname / IP: cyberguards-website
   Forward Port: 80
   Cache Assets: ✓ (enabled)
   Block Common Exploits: ✓ (enabled)
   Websockets Support: ✗ (not needed for static site)
   ```

   **SSL Tab:**

   ```
   SSL Certificate: Request a new SSL Certificate
   Force SSL: ✓ (enabled)
   HTTP/2 Support: ✓ (enabled)
   HSTS Enabled: ✓ (enabled)
   Email Address for Let's Encrypt: your-email@example.com
   ✓ I Agree to the Let's Encrypt Terms of Service
   ```

3. **Save** and wait for SSL certificate to be issued (30-60 seconds)

---

## 🔧 Configuration for Production

### Update Your VPS Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Allow NPM Admin (optional, or restrict to your IP)
sudo ufw allow 81/tcp

# Enable firewall
sudo ufw enable
sudo ufw status
```

### Secure NPM Admin Panel (Recommended)

After initial setup, you can:

1. **Change default credentials** (required!)
2. **Restrict admin panel access** by IP in NPM settings
3. **Or use SSH tunnel** to access admin panel:
   ```bash
   # From your local machine
   ssh -L 8081:localhost:81 user@YOUR_VPS_IP
   # Then access http://localhost:8081
   ```

---

## 📊 Verify Everything Works

```bash
# Check containers are running
docker ps

# Check website logs
docker logs cyberguards-website

# Check NPM logs
docker logs nginx-proxy-manager

# Test HTTP to HTTPS redirect
curl -I http://enisocyberguards.ovh

# Test HTTPS
curl -I https://enisocyberguards.ovh
```

---

## 🔄 Update and Redeploy

When you push changes to production:

```bash
# Pull latest changes
git pull origin prod

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Or without downtime (recommended)
docker-compose up -d --build --force-recreate
```

---

## 🎨 Architecture Overview

```
Internet
    ↓
Your OVH Domain (enisocyberguards.ovh)
    ↓
VPS (Your IP)
    ↓
Nginx Proxy Manager (Ports 80, 443, 81)
  - Handles SSL/TLS (Let's Encrypt)
  - Reverse proxy
  - HTTP to HTTPS redirect
    ↓
CyberGuards Website Container (Internal port 80)
  - React App
  - Served by Nginx
```

---

## 🐛 Troubleshooting

### Domain not resolving

```bash
# Check DNS propagation
dig enisocyberguards.ovh
nslookup enisocyberguards.ovh

# Wait up to 30 minutes for DNS propagation
```

### SSL Certificate fails

- Ensure ports 80 and 443 are open and accessible from internet
- Check domain points to correct IP
- Verify email address is valid
- Check NPM logs: `docker logs nginx-proxy-manager`

### Website not accessible through NPM

```bash
# Check if website container is running
docker ps | grep cyberguards

# Check if containers are on same network
docker network inspect enisocyberguards-website_proxy

# Test direct access
curl http://localhost:8080

# Check NPM can reach the container
docker exec -it nginx-proxy-manager ping cyberguards-website
```

### NPM Admin Panel not accessible

```bash
# Check if NPM is running
docker ps | grep nginx-proxy-manager

# Check port 81 is not blocked
sudo netstat -tlnp | grep 81

# Check firewall
sudo ufw status
```

---

## 📱 Additional NPM Features

### Add WWW Redirect

In NPM, you can force www → non-www or vice versa:

- Go to your proxy host → Edit
- **Advanced** tab → Add custom Nginx configuration:

```nginx
# Redirect www to non-www
if ($host = 'www.enisocyberguards.ovh') {
    return 301 https://enisocyberguards.ovh$request_uri;
}
```

### Rate Limiting (DDoS Protection)

In **Advanced** tab:

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
limit_req zone=mylimit burst=20 nodelay;
```

### Custom Error Pages

You can customize 404, 502, 503 pages in NPM settings.

---

## 🔒 Security Best Practices

1. ✅ **Change NPM default credentials immediately**
2. ✅ **Enable 2FA in NPM** (available in settings)
3. ✅ **Use strong passwords**
4. ✅ **Keep Docker images updated**:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```
5. ✅ **Regular backups** of NPM data:
   ```bash
   tar -czf npm-backup-$(date +%Y%m%d).tar.gz ./data ./letsencrypt
   ```
6. ✅ **Monitor logs regularly**
7. ✅ **Enable fail2ban** (optional but recommended)

---

## 💰 Cost Breakdown

- **VPS**: €4-6/month (Hetzner, OVH, DigitalOcean)
- **Domain**: €5-10/year (OVH)
- **SSL Certificate**: FREE (Let's Encrypt via NPM)
- **Total**: ~€6/month + domain

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Start everything
docker-compose up -d --build

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Restart website only
docker-compose restart cyberguards-website

# Update and redeploy
git pull origin prod && docker-compose up -d --build

# Backup NPM configuration
tar -czf npm-backup.tar.gz ./data ./letsencrypt

# Check SSL certificate expiry
echo | openssl s_client -servername enisocyberguards.ovh -connect enisocyberguards.ovh:443 2>/dev/null | openssl x509 -noout -dates
```

---

## ✅ Post-Deployment Checklist

- [ ] DNS records configured in OVH
- [ ] Website container running (`docker ps`)
- [ ] NPM proxy host configured
- [ ] SSL certificate issued and active
- [ ] HTTP redirects to HTTPS
- [ ] www and non-www both work
- [ ] NPM admin password changed
- [ ] Firewall configured
- [ ] Health check passing
- [ ] Backup strategy in place

---

## 📞 Support Resources

- **Nginx Proxy Manager Docs**: https://nginxproxymanager.com/guide/
- **OVH Support**: https://help.ovhcloud.com/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Docker Docs**: https://docs.docker.com/

---

**You're all set! Your CyberGuards website should now be live at https://enisocyberguards.ovh with automatic HTTPS! 🚀**
