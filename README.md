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

## Format of Git Commit Messages Of QuickLaunch

Follow these simple conventions:
```bash
# If you fixed a bug	
git commit -m "QL-BUG-001: [Feature]: Resolve app crash on startup"

# If you added a new feature
git commit -m "QL-FEAT-002: [Feature]: Add keyboard shortcuts"

# If you did maintenance work
git commit -m "QL-MAINT-001: [Maintenance]: Bump version to v*.*.*"

# If you updated the README
git commit -m "QL-DOCS-001: [Documentation]: Update README"

# If you refactored code
git commit -m "QL-REFACTOR-001: simplify search logic"
```

## How to Make a Release

Releases are automated with GitHub Actions! Just run a single command:

```bash
npm run release v1.0.8
```

This will automatically:
1. Bump version to `*.*.*` in all files (package.json, Cargo.toml, tauri.conf.json, index.html)
2. Stage all changes
3. Commit with message `'chore: bump version'`
4. Push changes to remote
5. Create tag `v*.*.*`
6. Push the tag to origin (This triggers the GitHub Actions release!)

**That's it!** GitHub Actions will automatically:
- Build the app
- Sign the installer
- Create `latest.json`
- Create a GitHub release with all files

**Monitor progress:** https://github.com/Lalitmax/quicklaunch/actions

**Release notes:** https://github.com/Lalitmax/quicklaunch/releases
