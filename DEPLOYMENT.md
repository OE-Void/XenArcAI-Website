# Production Deployment Guide

This document provides instructions for deploying the XenArcAI application to production environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Docker](#docker)
  - [Traditional Server](#traditional-server)
- [Environment Variables](#environment-variables)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [Security Considerations](#security-considerations)

## Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Docker (for containerized deployments)
- Git

## Deployment Options

### Vercel (Recommended)

The application is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set up the following environment variables in Vercel:
   - `NEXT_PUBLIC_SITE_URL` - Your production domain
   - `NEXT_PUBLIC_APP_NAME` - Your application name

3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Docker

For containerized deployments:

1. Build the Docker image:
   ```bash
   docker build -t xenarcai -f Dockerfile.prod .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 xenarcai
   ```

### Traditional Server

For traditional server deployments:

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

The following environment variables should be configured in production:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | The production URL of your site | Yes |
| `NEXT_PUBLIC_APP_NAME` | The name of your application | Yes |

## CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically:

1. Runs code quality checks (ESLint, TypeScript)
2. Builds the application
3. Runs security scans
4. Deploys to production (Vercel)

To enable automatic deployments:

1. Set up the following secrets in your GitHub repository:
   - `VERCEL_TOKEN` - Vercel authentication token
   - `VERCEL_ORG_ID` - Vercel organization ID
   - `VERCEL_PROJECT_ID` - Vercel project ID
   - `DOCKER_USERNAME` - Docker Hub username (for Docker deployments)
   - `DOCKER_PASSWORD` - Docker Hub password (for Docker deployments)

## Monitoring

The application includes a health check endpoint at `/api/health` that provides:

- Application status
- Uptime information
- Memory usage statistics

## Security Considerations

- All dependencies are regularly audited via npm audit
- Security headers are configured for protection against common web vulnerabilities
- The application runs as a non-root user in Docker containers
- Environment variables are used for sensitive configuration