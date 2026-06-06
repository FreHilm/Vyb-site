# Vyb promo site

A single-page, zero-build landing page for Vyb. Plain HTML/CSS/JS — no
dependencies, no compile step.

```
site/
├── index.html        # the page
├── styles.css        # Catppuccin Mocha + the flame gradient
├── script.js         # scroll-reveal + video fallback
└── assets/
    ├── logo.png       # the Vyb mark (already copied in)
    ├── vyb-demo.mp4   # ← DROP YOUR VIDEO HERE
    ├── vyb-demo.webm  # ← optional, smaller/wider browser support
    └── vyb-poster.jpg # ← optional first-frame still
```

## The demo video

The centerpiece is a self-hosted file at `site/assets/vyb.mp4`, played inline
via the `<video>` in `index.html` (autoplay + muted + loop, controls on hover).
If the file is missing, `script.js` swaps in a tidy placeholder.

To swap in a different video, replace `assets/vyb.mp4` (or change the
`<source src>`). If the new clip has a different shape, update the
`aspect-ratio` on `.demo-video` in `styles.css` so it fills the frame with no
black bars — the current value (`3450 / 2078`) matches this video.

Note: the file is ~45 MB. That's fine for local/most hosts, but for a snappy
first load you may want to compress it (e.g. an H.264/H.265 MP4 around
1080p) before deploying.

## Preview locally

Serve over HTTP (not `file://`) — the YouTube embed rejects file-origin pages.

**Docker (recommended):** from inside `site/`:

```bash
docker compose up        # → http://localhost:8080  (Ctrl-C to stop)
```

The folder is bind-mounted, so editing the HTML/CSS/JS and refreshing the
browser shows changes immediately — no rebuild. To run it as a self-contained
image instead (e.g. to mirror a deploy):

```bash
docker build -t vyb-site site
docker run --rm -p 8080:80 vyb-site
```

Or, without Docker, any static server works:

```bash
npx serve site          # or: python3 -m http.server -d site 8080
```

Then open the printed URL.

## Host it (free options)

- **GitHub Pages** — push the repo, then in Settings → Pages set the source to
  the `main` branch and `/site` folder. Done.
- **Netlify / Vercel / Cloudflare Pages** — point at the repo, set the publish
  directory to `site`, no build command.

## Tweaks

- Colors live in the `:root` block of `styles.css` (`--flame` is the brand
  gradient).
- All copy is in `index.html`. Links point at `github.com/FreHilm/Vyb` and its
  `/releases` page.
# Vyb-site
