# NightKind Collective - Static Website Copy

This is a static copy of the NightKind Collective website (https://nightkind-shadow-market.lovable.app/) downloaded for offline use and GitHub Pages hosting.

## 🌐 Live Demo

Once deployed to GitHub Pages, the website will be available at:
`https://[your-username].github.io/[repository-name]/`

## Files Included

- `index.html` - Main HTML file
- `index-B11PqZaG.js` - JavaScript bundle
- `index-CZEDu5tD.css` - CSS styles
- `fonts.css` - Google Fonts (Creepster and Courier Prime)
- `preview.png` - Website preview image

## 🚀 How to Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it something like `nightkind-collective-static`
   - Make it public
   - Don't initialize with README (we already have one)

2. **Push this code to GitHub**
   ```bash
   git remote add origin https://github.com/doinkadoink/NightKind.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/(root)" folder
   - Click "Save"

4. **The website will automatically deploy** when you push to the main branch!

### Option 2: Manual Deployment

1. Push the code to GitHub as above
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" branch → "/(root)" folder
4. Save and wait for deployment

## 🖥️ Local Development

### Using the Batch File (Windows)
1. Double-click `start-server.bat`
2. Open http://localhost:8000

### Using Node.js
```bash
npm start
# or
npx serve . -p 8000
```

### Using Python
```bash
python -m http.server 8000
```

## Notes

- This is a static copy, so any dynamic features (forms, backend interactions) will not work
- The website appears to be built with a modern JavaScript framework (likely React/Vue)
- All external dependencies have been downloaded and made local
- The Lovable development badge has been removed for a cleaner appearance
- GitHub Pages will automatically serve the website with proper MIME types

## Original Website

Original site: https://nightkind-shadow-market.lovable.app/ 