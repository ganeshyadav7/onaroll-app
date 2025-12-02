
On A Roll Bristol - Web App Assets
==================================

This folder contains logo and PWA assets for your Vite + React app.

How to use with your onaroll-app project
----------------------------------------

1. Copy ALL files from this ZIP into your project's `public/` folder:

   onaroll-app/public/
       apple-touch-icon.png
       favicon.ico
       icon-192x192.png
       icon-512x512.png
       logo-256.png
       logo-512.png
       logo-1024.png
       maskable-icon.png
       manifest.webmanifest

2. Ensure your `vite.config.js` is configured with `vite-plugin-pwa`
   and that the manifest icons match these filenames.

3. Rebuild and redeploy your app:

       npm run build
       git add .
       git commit -m "Add logo & PWA assets"
       git push

4. On a phone, open your site in the browser and use "Add to Home Screen".
   It should show this new logo as the app icon.
