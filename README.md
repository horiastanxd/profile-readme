# Profile README Generator

Generate a clean GitHub profile README without the emoji confetti, GIF headers, and neon badge soup. Live preview, copy the markdown, paste into your `username/username` repo.

Try it: <https://horiastanxd.github.io/profile-readme/>

## Why another one

Most profile README generators optimise for "look at all the things you can add". The result is profiles that read like a MySpace page. This one defaults to nothing and lets you add sections one at a time.

- No emoji by default (toggle on if you want them)
- No visitor counters, no GIF banners, no trophy walls
- Presets go from "just your name" to "full stats page"
- Share your config with a URL
- Runs in the browser, nothing uploaded

## What it generates

Plain markdown with:

- Header (name, tagline, location)
- Bio paragraph
- Current work / learning / open-to bullets
- Tech stack as shields.io badges
- Contact links
- GitHub stats cards (via [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) and [streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats))

Each section appears only if you fill it in. No forced scaffolding.

## Running locally

Three static files. Open `index.html` in a browser or serve the folder:

```bash
python3 -m http.server
```

## License

MIT
