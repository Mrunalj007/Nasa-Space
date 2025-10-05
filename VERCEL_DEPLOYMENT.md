# Deploying Urban Insight to Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (Optional): Install globally with `npm install -g vercel`
3. **GitHub Repository** (Recommended): Push your code to GitHub for automatic deployments

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables
In the Vercel dashboard, add these environment variables:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Your Google Gemini API Key |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

### Step 4: Deploy
Click **"Deploy"** and wait for the build to complete.

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# From your project root directory
cd "c:\Users\mruna\OneDrive\Desktop\web dev\hackathon\Nasa_Space_app\UrbanInsight\UrbanInsight"

# First deployment (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Step 4: Set Environment Variables
```bash
vercel env add GEMINI_API_KEY
# Enter your API key when prompted

vercel env add NODE_ENV
# Enter: production

vercel env add PORT
# Enter: 5000
```

---

## Important Configuration Files Created

✅ **vercel.json** - Deployment configuration
- Defines build commands
- Sets up API routing
- Configures serverless functions

✅ **.vercelignore** - Excludes unnecessary files
- Prevents deployment of node_modules, .env, logs, etc.

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] API endpoints are accessible (`/api/nasa/metrics`)
- [ ] Environment variables are set
- [ ] Map functionality works
- [ ] AI insights are generated (requires Gemini API key)
- [ ] Custom domain configured (optional)

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `NODE_ENV` is set correctly
- Review build logs in Vercel dashboard

### API Routes Not Working
- Verify `vercel.json` routing configuration
- Check that serverless functions are deployed
- Ensure environment variables are set

### Environment Variables
- Add them in Project Settings > Environment Variables
- Redeploy after adding new variables

### Database Issues
- If using a database, ensure connection string is configured
- Check that database is accessible from Vercel's servers

---

## Continuous Deployment

Once connected to GitHub:
- **Automatic Deployments**: Every push to `main` branch deploys to production
- **Preview Deployments**: Pull requests get preview URLs
- **Rollback**: Easy to rollback to previous deployments

---

## Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

---

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Remove a deployment
vercel rm [deployment-url]

# Link local project to Vercel project
vercel link
```

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

---

## Quick Deploy Command

For fastest deployment:

```bash
vercel --prod
```

Your app will be live at: `https://your-project-name.vercel.app`

🎉 **Congratulations!** Your Urban Insight application is now deployed!
