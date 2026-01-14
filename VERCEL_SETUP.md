# Legalese.ai - Vercel Deployment

## Critical: Root Directory Setting

**You MUST set the Root Directory in Vercel:**

1. Go to: https://vercel.com/dashboard
2. Click your `Legalese.ai` project
3. Go to **Settings** (top navigation)
4. Scroll to **Root Directory**
5. Click **Edit**
6. Enter: `frontend`
7. Click **Save**
8. Go to **Deployments** → Click **Redeploy**

## Why This Is Required

Your Next.js app is in the `frontend/` subdirectory, not the root. Without setting the Root Directory, Vercel looks for `package.json` in the root and finds nothing, causing a 404.

## Verify It's Set Correctly

In Vercel Settings → General, you should see:
```
Root Directory: frontend
```

If it says `./` or is empty, the deployment will fail with 404.

## After Setting Root Directory

The deployment should succeed and you'll get a live URL like:
```
https://legalese-ai.vercel.app
```
