# After the Sirens

A browser-based, choice-driven zombie survival story.

## Run locally

Open `index.html` in a modern browser. The game uses browser speech synthesis and local storage for narration and saved games. Visuals, audio, the story idea bank, and the ZombieBrain engine are in `assets/`.

Older saves are migrated into the versioned ZombieBrain state without replacing the existing character or story data. Stable choice events, NPC memories and trust, and zombie alertness persist with the run.

Run the automated engine and encounter tests from the repository root with:

```sh
node --test tests/zombie-brain.test.cjs
```

## Publish with GitHub Pages

1. Upload `index.html`, `README.md`, the `assets/` directory, and the `tests/` directory to the repository root.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. GitHub Pages will provide a URL in the form `https://YOUR-USERNAME.github.io/after-the-sirens/`.

The game does not require a build step or API key.

