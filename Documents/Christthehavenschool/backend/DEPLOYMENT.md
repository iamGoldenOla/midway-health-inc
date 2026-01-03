# Deployment Guide for cPanel

This document provides instructions for deploying the backend application to a traditional web host via cPanel.

## Prerequisites

- Node.js 20+ installed on the hosting server
- Access to cPanel
- Supabase project set up with database and authentication

## Deployment Steps

### 1. Prepare the Application

1. Build the application:
   ```bash
   npm run build
   ```

2. Ensure all dependencies are listed in `package.json`

### 2. Upload Files via cPanel

1. Compress the backend directory (excluding `node_modules` and `dist` if they're large)
2. Use cPanel's File Manager to upload the compressed file to your domain's directory
3. Extract the compressed file in the desired location (e.g., `/backend/`)

### 3. Install Dependencies

1. Access the server via SSH or cPanel's terminal
2. Navigate to the backend directory:
   ```bash
   cd /path/to/your/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### 4. Configure Environment Variables

Create a `.env` file in the backend root with the following variables:

```env
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
CORS_ORIGIN=https://your-frontend-domain.com
```

### 5. Set Up Process Manager (PM2)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application using the ecosystem config:
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

3. Set PM2 to start on server reboot:
   ```bash
   pm2 startup
   pm2 save
   ```

### 6. Configure cPanel Application (if supported)

If your cPanel supports Node.js applications:

1. Go to "Setup Node.js App" in cPanel
2. Set the application root to your backend directory
3. Set the environment to "production"
4. Set the startup file to `dist/index.js`
5. Start the application

### 7. Configure Domain/Subdomain

1. Set up a subdomain (e.g., `api.yourdomain.com`) pointing to the backend directory
2. Or use a reverse proxy if running on the same domain as the frontend

### 8. SSL Configuration

1. Use cPanel's SSL certificate manager to install an SSL certificate
2. Ensure your application redirects HTTP to HTTPS

## Environment Variables Reference

- `NODE_ENV`: Set to `production` for production environments
- `PORT`: Port on which the application will run (default: 3000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key (for client-side operations)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)
- `JWT_SECRET`: Secret key for JWT token signing
- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGIN`: Frontend domain for CORS configuration

## Monitoring and Logs

1. Check application status:
   ```bash
   pm2 status
   ```

2. View logs:
   ```bash
   pm2 logs christthehavenschool-backend
   ```

3. Monitor resource usage:
   ```bash
   pm2 monit
   ```

## Troubleshooting

- If the application fails to start, check the logs in the `logs/` directory
- Ensure all environment variables are properly set
- Verify that the database connection is working
- Check that the port is not already in use

## Updating the Application

1. Upload new files to the server
2. Run `npm install` to install any new dependencies
3. Build the application: `npm run build`
4. Restart the application: `pm2 restart christthehavenschool-backend`