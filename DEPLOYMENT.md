# Production Deployment Guide (Vercel)

This project is fully optimized for Next.js 14 App Router and is ready for a zero-configuration deployment to Vercel.

## Step-by-Step Deployment

1. **Push to GitHub**
   Ensure your local repository is pushed to a fresh GitHub repository. The `.gitignore` has been secured to prevent `.env` file leaks.

2. **Connect to Vercel**
   - Log into your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New** -> **Project**.
   - Import the GitHub repository you just created.
   - Vercel will automatically detect the Next.js framework.

3. **Configure Environment Variables**
   Before clicking "Deploy", expand the **Environment Variables** section. You *must* copy the following 4 variables exactly as they appear in your local `.env.local` file:

   | Variable Name | Description |
   | ------------- | ----------- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon/Public Key |
   | `ADMIN_USER` | The username for the `/admin` dashboard HTTP Basic Auth |
   | `ADMIN_PASS` | The password for the `/admin` dashboard HTTP Basic Auth |

4. **Deploy**
   - Click **Deploy**.
   - Vercel will run `npm run build`. The aggressive Next.js caching algorithms, Server Actions, and React Suspense boundaries will instantly compile into a highly optimized edge-ready production build.

5. **Post-Deployment SEO Finalization**
   Once your `.vercel.app` domain is generated (or you attach a custom domain), update the `NEXT_PUBLIC_SITE_URL` environment variable in the Vercel Settings to match the live URL. This guarantees your OpenGraph and WhatsApp sharing images render correctly.
