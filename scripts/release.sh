#!/bin/bash

# Bash script to handle the complete release process
# Usage: ./release.sh v*.*.*

# Check if version tag argument is provided
if [ -z "$1" ]; then
    echo "Error: Version tag argument required"
    echo "Usage: ./release.sh v1.0.8"
    exit 1
fi

VERSION_TAG=$1

# Extract version number from tag (remove 'v' prefix)
if [[ $VERSION_TAG =~ ^v([0-9]+\.[0-9]+\.[0-9]+)$ ]]; then
    VERSION=${BASH_REMATCH[1]}
else
    echo "Error: Version tag must be in format vX.Y.Z (e.g., v1.0.8)"
    exit 1
fi

echo "Starting release process for $VERSION_TAG..."
echo ""

# Step 1: Bump version
echo "Step 1: Bumping version to $VERSION..."
bash scripts/bump-version.sh $VERSION

if [ $? -ne 0 ]; then
    echo "Error: Version bump failed"
    exit 1
fi

echo ""

# Step 2: Git add
echo "Step 2: Staging changes..."
git add .

if [ $? -ne 0 ]; then
    echo "Error: Git add failed"
    exit 1
fi

# Step 3: Git commit
echo "Step 3: Committing changes..."
git commit -m "chore: bump version"

if [ $? -ne 0 ]; then
    echo "Error: Git commit failed"
    exit 1
fi

# Step 4: Git push
echo "Step 4: Pushing changes..."
git push

if [ $? -ne 0 ]; then
    echo "Error: Git push failed"
    exit 1
fi

# Step 5: Create tag
echo "Step 5: Creating tag $VERSION_TAG..."
git tag $VERSION_TAG

if [ $? -ne 0 ]; then
    echo "Error: Git tag creation failed"
    exit 1
fi

# Step 6: Push tag
echo "Step 6: Pushing tag $VERSION_TAG..."
git push origin $VERSION_TAG

if [ $? -ne 0 ]; then
    echo "Error: Git tag push failed"
    exit 1
fi

echo ""
echo "Release $VERSION_TAG completed successfully!"
echo ""
echo "Summary:"
echo "  - Version bumped to $VERSION"
echo "  - Changes committed and pushed"
echo "  - Tag $VERSION_TAG created and pushed"

