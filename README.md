# QuickLaunch

A fast, modern launcher to open your favorite apps and websites in one click.

## Features

- Open apps and websites with a single click
- Add and remove apps and websites from the launcher
- Cross platform (Windows, macOS, Linux)


# Build and Sign
## Step 1: Build the app
npm run tauri:build

## Step 2: Sign the installer
npm run sign ./src-tauri/target/release/bundle/nsis/QuickLaunch_0.1.0_x64-setup.exe

## Step 3: Upload the installer to GitHub
git add .
git commit -m "Update"
git push
git tag v0.1.0
git push origin v0.1.0