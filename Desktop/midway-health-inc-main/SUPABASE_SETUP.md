# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create an account
4. Click "New Project"
5. Fill in:
   - **Name**: `midway-health-inc`
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine to start
6. Click "Create new project"
7. Wait 2-3 minutes for project to be created

---

## Step 2: Run SQL Migration

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click "New query"
3. Open the file `supabase_migration.sql` in your project
4. **Copy the entire contents**
5. **Paste into the SQL Editor**
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. You should see: "Success. No rows returned"

This creates all 7 tables, indexes, and RLS policies.

---

## Step 3: Set Up Storage Buckets

### Blog Images Bucket (Public)

1. Click **Storage** in the left sidebar
2. Click "Create a new bucket"
3. Fill in:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **CHECKED**
4. Click "Create bucket"
5. Click on the `blog-images` bucket
6. Click "Upload file" and test with any image
7. Click "Policies" tab
8. The public read policy should already exist from SQL migration

### Resumes Bucket (Private)

1. Click "New bucket"
2. Fill in:
   - **Name**: `resumes`
   - **Public bucket**: ❌ **UNCHECKED** (keep private)
3. Click "Create bucket"
4. Policies are already set from SQL migration (admin-only access)

---

## Step 4: Create Admin User

1. Click **Authentication** in the left sidebar
2. Click **Users** tab
3. Click "Add user" → "Create new user"
4. Fill in:
   - **Email**: `admin@midwayhealth.com` (or your preferred admin email)
   - **Password**: (create a strong password - save it!)
   - **Auto Confirm User**: ✅ **CHECKED**
5. Click "Create user"

**Save these credentials securely!** You'll use them to log into the admin dashboard.

---

## Step 5: Get API Keys

1. Click **Project Settings** (gear icon) in the left sidebar
2. Click **API** in the settings menu
3. You'll see two important values:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this entire URL

### Anon/Public Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY...
```
Copy this entire key (it's very long)

---

## Step 6: Configure Environment Variables

1. In your project root, create a file called `.env.local`
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file
4. **NEVER commit this file to Git** (it's already in .gitignore)

---

## Step 7: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Open browser console (F12)
3. You should NOT see any Supabase errors
4. If you see "Missing Supabase environment variables" - check your `.env.local` file

---

## Step 8: Verify Database

1. Go back to Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. You should see all 7 tables:
   - ✅ blog_posts
   - ✅ services (with 10 pre-loaded services)
   - ✅ contact_messages
   - ✅ consultations
   - ✅ appointments
   - ✅ job_applications
   - ✅ newsletter

4. Click on `services` table
5. You should see 10 rows (Skilled Nursing, Personal Care, etc.)

---

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in project root
- Make sure variable names start with `VITE_`
- Restart dev server after creating `.env.local`

### "Failed to fetch"
- Check Project URL is correct
- Check you're online
- Check Supabase project is running (green status)

### "Row Level Security policy violation"
- Make sure you ran the ENTIRE SQL migration
- Check RLS policies in Supabase dashboard → Authentication → Policies

### Can't log into admin dashboard
- Make sure you created the admin user in Step 4
- Use the exact email and password you set
- Check for typos

---

## Next Steps

Once setup is complete:
1. ✅ Test the consultation form (`/consultation`)
2. ✅ Test the contact form
3. ✅ Log into admin dashboard (`/admin/login`)
4. ✅ Verify you can see submitted forms

---

## Quick Reference

**Supabase Dashboard**: https://supabase.com/dashboard  
**SQL Migration File**: `supabase_migration.sql`  
**Environment File**: `.env.local` (create this)  
**Admin Login**: `/admin/login`  

**Admin Credentials**:
- Email: (the one you created in Step 4)
- Password: (the one you created in Step 4)
