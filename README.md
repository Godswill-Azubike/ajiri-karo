# A & K Wedding Website

Animated wedding invitation site (Next.js + Framer Motion + confetti).

## Edit the details
Everything lives in `src/config/wedding.ts`: names, date/time, venues, map links, love story,
dress-code colours (Pantone 222 / 2405 / 224 / 8024 + lilac), gift details, gallery photos and music.

- **Photos:** put them in `public/images/gallery/` and list them in `gallery`, e.g. `"/images/gallery/1.jpg"`.
- **Music:** plays from YouTube. Change `music.youtubeId` to any video ID (the part after `watch?v=`); the video must allow embedding. Set it to `""` to hide the music button.

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo → **Deploy** (no settings needed).

Or from this folder: `npx vercel` then `npx vercel --prod`.
