# Production Setup Guide

This guide provides comprehensive instructions for setting up the XenArcAI application in a production environment.

## Table of Contents
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- Node.js 20.x or higher
- npm 9.x or higher
- 2 GB RAM
- 10 GB disk space

### Recommended Requirements
- Node.js 20.x LTS
- 4 GB RAM or higher
- 20 GB disk space
- SSL certificate for HTTPS

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/xenarcai-developer-tools.git
cd xenarcai-developer-tools
```

### 2. Install Dependencies
```bash
npm ci
```

### 3. Build the Application
```bash
npm run build
```

## Configuration

### Environment Variables

Create a `.env.production` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=XenArcAI
```

### SSL Configuration

For production deployments, SSL is highly recommended. You can use:

1. Let's Encrypt (free)
2. Commercial SSL certificate
3. Cloudflare SSL (if using Cloudflare)

### Reverse Proxy Setup (Nginx)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Deployment

### Using PM2 (Process Manager)

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Start the application:
```bash
pm2 start npm --name "xenarcai" -- run start
```

3. Set PM2 to start on boot:
```bash
pm2 startup
pm2 save
```

### Using systemd (Linux)

Create a systemd service file at `/etc/systemd/system/xenarcai.service`:

```ini
[Unit]
Description=XenArcAI Application
After=network.target

[Service]
Type=notify
User=www-data
WorkingDirectory=/path/to/xenarcai-developer-tools
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable xenarcai
sudo systemctl start xenarcai
```

## Monitoring

### Health Check Endpoint

The application provides a health check endpoint at:
```
GET /api/health
```

This endpoint returns:
- Application status
- Uptime information
- Memory usage statistics

### Log Management

Application logs are output to stdout/stderr. For production, consider using:

1. **PM2 Log Management**:
```bash
pm2 logs xenarcai
```

2. **Centralized Logging**:
   - ELK Stack (Elasticsearch, Logstash, Kibana)
   - Graylog
   - Splunk
   - AWS CloudWatch
   - Google Cloud Logging

### Performance Monitoring

Recommended monitoring tools:
- New Relic
- Datadog
- Prometheus + Grafana
- Application Insights (Azure)
- CloudWatch (AWS)

## Maintenance

### Regular Updates

1. Pull the latest code:
```bash
git pull origin main
```

2. Install updated dependencies:
```bash
npm ci
```

3. Rebuild the application:
```bash
npm run build
```

4. Restart the application:
```bash
pm2 restart xenarcai
```

### Backup Strategy

Important files to backup:
- Environment configuration files
- SSL certificates
- Custom Nginx configurations
- Database backups (if applicable)

### Security Updates

1. Regularly update Node.js to the latest LTS version
2. Update npm packages with security vulnerabilities:
```bash
npm audit
npm audit fix
```

3. Monitor for security advisories

## Troubleshooting

### Common Issues

#### 1. Application Not Starting
- Check logs: `pm2 logs xenarcai`
- Verify environment variables
- Ensure port 3000 is not in use

#### 2. Build Failures
- Clean node_modules: `rm -rf node_modules && npm ci`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify disk space availability

#### 3. Performance Issues
- Monitor memory usage
- Check for memory leaks
- Optimize images and assets
- Implement caching strategies

### Support

For support, please:
1. Check the GitHub issues
2. Review the documentation
3. Contact the development team

### Emergency Procedures

#### Immediate Restart
```bash
pm2 restart xenarcai
```

#### Complete Rebuild
```bash
pm2 stop xenarcai
rm -rf node_modules .next
npm ci
npm run build
pm2 start xenarcai
```