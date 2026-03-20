#!/bin/bash

# Bash script to bump version across all files

# Check if version argument is provided
if [ -z "$1" ]; then
    echo "Error: Version argument required"
    echo "Usage: ./bump-version.sh 1.0.2"
    exit 1
fi

NEW_VERSION=$1

# Validate version format
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in format X.Y.Z (e.g., 1.0.2)"
    exit 1
fi

echo "Bumping version to $NEW_VERSION..."

# Update package.json
echo "1. Updating package.json..."
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update src-tauri/Cargo.toml
echo "2. Updating src-tauri/Cargo.toml..."
sed -i "s/version = \"[0-9]*\.[0-9]*\.[0-9]*\"/version = \"$NEW_VERSION\"/" src-tauri/Cargo.toml

# Update src-tauri/tauri.conf.json
echo "3. Updating src-tauri/tauri.conf.json..."
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" src-tauri/tauri.conf.json

# Update web/index.html (download links)
echo "4. Updating web/index.html..."
sed -i "s|download/v[0-9]*\.[0-9]*\.[0-9]*/QuickLaunch_[0-9]*\.[0-9]*\.[0-9]*_x64-setup.exe|download/v$NEW_VERSION/QuickLaunch_${NEW_VERSION}_x64-setup.exe|g" web/index.html

# Update the src-tauri/Cargo.lock (only the quicklaunch package version)
echo "5. Updating src-tauri/Cargo.lock..."
sed -i "/^name = \"quicklaunch\"$/{ n; s/version = \"[0-9]*\.[0-9]*\.[0-9]*\"/version = \"$NEW_VERSION\"/; }" src-tauri/Cargo.lock

echo "Version bumped to $NEW_VERSION successfully!"
echo ""