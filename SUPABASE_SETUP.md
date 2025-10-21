# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your resume builder.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js installed (v20.19.0 or higher)

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Choose a name (e.g., "resume-builder")
   - **Database Password**: Generate a secure password
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, click on the **Settings** icon (gear) in the sidebar
2. Navigate to **API** under Project Settings
3. You'll find two important values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (a long JWT token)

## Step 3: Configure Environment Variables

1. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Configure Authentication Settings (Optional)

By default, Supabase requires email confirmation. For development, you may want to disable this:

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Click on **Email** provider
3. Disable "Confirm email" if you want to skip email verification during development
4. Click "Save"

**Note**: For production, keep email confirmation enabled for security.

## Step 5: Start the Development Server

```bash
npm run dev
```

Your app should now be running with authentication!

## Testing Authentication

1. Visit `http://localhost:5173` (or your dev server URL)
2. You'll be redirected to `/login`
3. Click "Sign up" and create a test account
4. After signup, you'll be redirected to the dashboard
5. Test the logout functionality from the account menu

## Routes

- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires auth)
- `/builder` - Protected resume builder (requires auth)
- `/` - Redirects to dashboard

## Features Implemented

✅ Email/password authentication with Supabase
✅ Protected routes that redirect to login
✅ Session persistence (stays logged in after refresh)
✅ Auto-refresh tokens
✅ Loading states during auth checks
✅ Friendly error messages
✅ Account menu with logout
✅ Dashboard with user email display

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure you created a `.env` file (not `.env.example`)
- Check that variable names start with `VITE_` prefix
- Restart the dev server after adding environment variables

### Can't sign up or login
- Check Supabase dashboard for any error logs
- Verify your API keys are correct
- Make sure your Supabase project is active

### Not staying logged in after refresh
- Check browser console for errors
- Verify localStorage is enabled in your browser
- Make sure `persistSession: true` is set in supabaseClient.ts

## Next Steps

- Set up email templates in Supabase (for password reset, etc.)
- Add password reset functionality
- Connect user resumes to their account in the database
- Add social authentication providers (Google, GitHub, etc.)
- Set up Row Level Security (RLS) policies for user data
