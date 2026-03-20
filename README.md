# QuickLaunch

A fast, modern launcher to open your favorite apps and websites in one click.

## Features

- Open apps and websites with a single click
- Add and remove apps and websites from the launcher
- Cross platform (Windows, macOS, Linux)


## Development

```bash
# Run in development mode
npm run tauri:dev

# Build the app locally
npm run tauri:build
```

## Git Commit Messages

Follow these simple conventions:

### Bug Fixes 🐛
```bash
git commit -m "fix: resolve app crash on startup"
```

### New Features ✨
```bash
git commit -m "feat: add keyboard shortcuts"
```

### Maintenance 🔧
```bash
git commit -m "chore: bump version to 1.0.2"
```

### Documentation 📚
```bash
git commit -m "docs: update README"
```

### UI/Styling 💄
```bash
git commit -m "style: improve button design"
```

### Code Refactoring ♻️
```bash
git commit -m "refactor: simplify search logic"
```

**Format:** `<type>: <short description>`

**Common types:** `fix`, `feat`, `chore`, `docs`, `style`, `refactor`, `test`

## How to Make a Release

Releases are automated with GitHub Actions! Just follow these steps:

### Step 1: Update Version
```bash
# This updates version in all 4 files automatically
npm run bump-version 1.0.2
```

### Step 2: Commit and Push
```bash
git add .
git commit -m "chore: bump version to 1.0.2"
git push
```

### Step 3: Create and Push Tag (This Triggers the Release!)
```bash
git tag v1.0.2
git push origin v1.0.2
```

**That's it!** GitHub Actions will automatically:
- Build the app
- Sign the installer
- Create `latest.json`
- Create a GitHub release with all files

**Monitor progress:** https://github.com/Lalitmax/quicklaunch/actions
**Release notes:** https://github.com/Lalitmax/quicklaunch/releases