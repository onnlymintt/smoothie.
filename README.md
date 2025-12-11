# Alice-in-Wonderland Themed Portfolio (Complete Starter)

This bundle includes:
- A static site (index.html, styles.css, script.js) enhanced with GSAP animations.
- A single editable data.json where you can insert your profile photo and project links/images.
- A Vite + React starter (in `react-vite/`) with a matching `src/data.js` you can fill.
- A GitHub Actions workflow (.github/workflows/pages.yml) that builds and deploys the static site to GitHub Pages.

What to edit (quick):
- For the static site: open `data.json` and replace:
  - `profilePhoto` → your photo URL (e.g., a hosted image or GitHub raw URL)
  - `projects[].image` → thumbnail URLs for each project
  - `projects[].link` → URL to the live project or repo
  - `name`, `title`, `subtitle`, `lead` → update to your own copy

- For the React starter: edit `react-vite/src/data.js` and replace the same fields.

Where to host photos:
- You can upload images to:
  - GitHub repo (use the raw file URL: https://raw.githubusercontent.com/<owner>/<repo>/<branch>/path/to/image.jpg)
  - Cloud storage (Imgur, Cloudinary, or your CDN)
  - Any image host that serves direct image URLs (HTTPS).

How to preview locally (static):
- Open `index.html` in your browser OR run a local static server:
  - Python: `python -m http.server 8000`
  - Node: `npx serve .`
  - Visit http://localhost:8000

How to preview React (Vite):
- cd react-vite
- npm install
- npm run dev
- Open the local dev URL shown by Vite

Deploy to GitHub Pages (automatic workflow included):
1. Push the repo to GitHub.
2. The included workflow builds the root static site and deploys to GitHub Pages.
   - Branches: workflow runs on pushes to main (update if you use different branch).
   - Make sure GitHub Pages is configured to use "GitHub Actions" in repository settings → Pages.
3. If you prefer to deploy the React app instead, adapt the workflow to `react-vite` build output.

Notes & tips:
- The static `data.json` is intentionally simple so you can use the same JSON pattern in the React starter (`react-vite/src/data.js`).
- If you want to store private images, use a private storage and update CORS settings if needed or use GitHub repo raw URLs.
- For advanced animations, I included GSAP (CDN). If you want more complex character animation (Cheshire grin, White Rabbit path), tell me which characters you want and I’ll add specific SVGs and GSAP timelines.
- If you want me to create a repo and push all these files and enable Pages for you, give me the GitHub owner/repo name and confirm you want me to create it; I’ll then prepare the push (I’ll ask for repo owner before any write operation).

Enjoy! If you want, I can:
- convert the React starter into SvelteKit instead,
- add polished SVG characters + GSAP timelines,
- or push everything to a new GitHub repo and enable automatic Pages deployment (I’ll need repo owner/name).
