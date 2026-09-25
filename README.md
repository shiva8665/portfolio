# Shivdarshan Jha — Portfolio

A responsive React + Vite portfolio built from Shivdarshan's supplied resume and photographs.

## Local development

1. Install Node.js 18+.
2. Run `npm install` and `npm run dev`.
3. Visit the local URL printed by Vite.
4. Run `npm run build` before publishing.

## Update your content

- Edit `src/data/portfolio.js` for profile, projects, skills, awards, links and experience.
- Replace `public/profile-formal.jpg` (hero) and `public/profile-casual.jpg` (About).
- Replace `public/Shivdarshan_Jha_Resume.pdf` to update the downloadable CV.
- Change layout in `src/main.jsx` and styling in `src/style.css`.

## Deploy to GitHub + Vercel

1. Create or use your GitHub repository `shiva8665/portfolio`. If it already has content, back it up or reconcile changes before replacing it.
2. From this project folder run `git init`, `git add .`, `git commit -m "Initial portfolio"`, `git branch -M main`, `git remote add origin https://github.com/shiva8665/portfolio.git`, then `git push -u origin main`. If a remote already exists, use `git remote set-url origin ...` instead.
3. Sign in to Vercel, choose **Add New → Project**, import this GitHub repository, and deploy with Vite defaults. Vercel assigns the actual public URL when deployment succeeds.
4. Future pushes to the production branch trigger redeployment, preserving the same project URL.

## Enable real visitor counter

The counter is intentionally **not fake**. It uses the `api/visit.js` serverless function and a persistent Upstash Redis database. Until configured, the page says “Visitor counter pending setup”.

1. Create an Upstash Redis database (or use a Vercel Marketplace Upstash integration).
2. In Vercel project **Settings → Environment Variables**, set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your database's REST credentials. Do not commit secrets to GitHub.
3. Redeploy. The first visit increments the counter, and the same browser is counted at most once per 24 hours using a cookie. This is an approximate visit count, not verified unique people; clearing cookies or using another browser may count again.
4. The counter endpoint is a public write endpoint, so it is not resistant to scripted/artificial traffic. Add rate limiting or bot protection for higher-trust analytics.

## Privacy and accuracy

The public email and LinkedIn are supplied by the owner. Delhi is taken from the resume; remove it in `src/data/portfolio.js` if desired. Project summaries are paraphrased from the resume. No unsupported numerical performance claims are added.
