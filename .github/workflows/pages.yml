name: Build and deploy site to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies (root)
        run: |
          # If you maintain a root package.json, install here. Otherwise skip.
          if [ -f package.json ]; then npm ci; fi
      - name: Build static site (if any)
        run: |
          # If you use a static generator or have a build step in root, run it.
          # For this static starter we don't need a build step; if you want to build React app, build it below.
          echo "No root build step"
      - name: Build React app (react-vite) if folder exists
        run: |
          if [ -d react-vite ]; then
            cd react-vite
            npm ci
            npm run build
            # Move build output to ./out for Pages action
            mkdir -p ../out
            cp -r dist/* ../out/
            cd ..
          else
            # If using the static root site (index.html) copy files to out
            mkdir -p out
            cp -r ./* out/ || true
          fi

      - name: Upload artifact for GitHub Pages
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v1
