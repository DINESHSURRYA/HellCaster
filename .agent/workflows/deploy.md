---
description: Deploy the application to GitHub Pages
---

1. Ensure all changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   ```

2. (First time only) Add your remote repository:
   ```bash
   git remote add origin https://github.com/DINESHSURRYA/<your-repo-name>.git
   ```

// turbo
3. Build and deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

4. Verify the deployment status on GitHub:
   Open `https://github.com/DINESHSURRYA/<your-repo-name>/settings/pages` in your browser.
