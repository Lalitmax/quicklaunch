#!/bin/bash

# Bash script to bump version across all files

# Check if version argument is provided
if [ -z "$1" ]; then
    echo "❌ Error: Version argument required"
    echo "Usage: ./bump-version.sh 1.0.2"
    exit 1
fi

NEW_VERSION=$1

# Validate version format
if ! [[ $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ Error: Version must be in format X.Y.Z (e.g., 1.0.2)"
    exit 1
fi

echo "🔄 Bumping version to $NEW_VERSION..."

# Update package.json
echo "📝 Updating package.json..."
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" package.json

# Update src-tauri/Cargo.toml
echo "📝 Updating src-tauri/Cargo.toml..."
sed -i "s/version = \"[0-9]*\.[0-9]*\.[0-9]*\"/version = \"$NEW_VERSION\"/" src-tauri/Cargo.toml

# Update src-tauri/tauri.conf.json
echo "📝 Updating src-tauri/tauri.conf.json..."
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" src-tauri/tauri.conf.json

echo "✅ Version bumped to $NEW_VERSION successfully!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Commit: git add . && git commit -m 'chore: bump version to $NEW_VERSION'"
echo "3. Push: git push"
echo "4. Tag: git tag v$NEW_VERSION && git push origin v$NEW_VERSION"
echo ""
echo "Or run this command to do it all:"
echo "git add . && git commit -m 'chore: bump version to $NEW_VERSION' && git push && git tag v$NEW_VERSION && git push origin v$NEW_VERSION"