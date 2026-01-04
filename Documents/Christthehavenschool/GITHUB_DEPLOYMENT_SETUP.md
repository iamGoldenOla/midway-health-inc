# GitHub Actions Deployment Setup for cPanel (FTP-only)

This document explains how to set up GitHub repository secrets for deploying your application to cPanel using GitHub Actions with FTP only (no SSH access required).

## Prerequisites

1. Your cPanel hosting account must support:
   - Node.js applications
   - FTP access
   - Ability to run Node.js applications through cPanel (either via Node.js selector or by setting up manually)

2. You need to have the following information from your cPanel hosting provider:
   - FTP host, username, and password
   - Paths where you want to deploy your frontend and backend

## Setting Up GitHub Repository Secrets

To configure the deployment, you need to add the following secrets to your GitHub repository:

### Steps to Add Secrets:

1. Go to your GitHub repository
2. Click on the "Settings" tab
3. In the left sidebar, click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each of the secrets listed below

### Required Secrets:

#### cPanel Access Secrets:
- `FTP_HOST` - Your FTP server hostname or IP address (e.g., 163.61.188.6)
- `FTP_USERNAME` - Your FTP username (e.g., christt2)
- `FTP_PASSWORD` - Your FTP password

#### Deployment Path Secrets:
- `FTP_DIR` - Server path for frontend deployment (e.g., `public_html/`)
- For backend deployment, files will be placed in `/backend/` directory

#### Backend Environment Secrets:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep this secure!)
- `JWT_SECRET` - Secret key for JWT token signing
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - Frontend domain for CORS configuration (e.g., https://yourdomain.com)

#### Frontend Environment Secrets:
- `VITE_API_URL` - URL of your backend API (e.g., https://api.yourdomain.com)

## Security Best Practices

1. **Never commit secrets to the repository** - Always use GitHub repository secrets
2. **Use strong, unique keys** for JWT and other secrets
3. **Regularly rotate secrets** - Update your secrets periodically for security
4. **Use dedicated deployment user** - Create a specific user for deployments with minimal required permissions

## Deployment Process

1. Once you've added all the required secrets, any push to the `main` branch will trigger the deployment
2. The workflow will:
   - Build the backend application
   - Install backend dependencies
   - Create environment configuration
   - Deploy the backend to your cPanel server via FTP
   - Build the frontend application
   - Deploy the frontend to your cPanel server via FTP

## Important Note about Backend Startup

Since this setup uses FTP-only deployment without SSH access, the backend Node.js application will be deployed to your server but will not be automatically started. You will need to:

1. Use your cPanel control panel to start the Node.js application if your host provides a Node.js application manager
2. Or contact your hosting provider to start the application for you
3. Or if your hosting provider supports it, the application might start automatically based on your server configuration

## Troubleshooting

### Common Issues:

1. **FTP connection failures** - Verify FTP host, username, and password
2. **Build failures** - Ensure all environment variables are properly set
3. **Backend not starting** - Check with your hosting provider about Node.js application startup procedures
4. **Files not uploading** - Verify the correct server paths for deployment

### Checking Deployment Status:

1. View GitHub Actions logs in the "Actions" tab of your repository
2. Check your cPanel file manager to confirm files were uploaded
3. Check your cPanel logs or contact your hosting provider for backend application status

## Manual Deployment

You can also trigger a deployment manually without pushing code by going to the Actions tab in your repository and selecting the "Deploy to cPanel" workflow, then clicking "Run workflow".