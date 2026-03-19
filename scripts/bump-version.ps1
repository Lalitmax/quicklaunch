# PowerShell script to bump version across all files
param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion
)

# Validate version format
if ($NewVersion -notmatch '^\d+\.\d+\.\d+$') {
    Write-Host "❌ Error: Version must be in format X.Y.Z (e.g., 1.0.2)" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 Bumping version to $NewVersion..." -ForegroundColor Cyan

# Update package.json
Write-Host "📝 Updating package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$packageJson.version = $NewVersion
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

# Update src-tauri/Cargo.toml
Write-Host "📝 Updating src-tauri/Cargo.toml..." -ForegroundColor Yellow
$cargoToml = Get-Content "src-tauri/Cargo.toml" -Raw
$cargoToml = $cargoToml -replace 'version = "\d+\.\d+\.\d+"', "version = `"$NewVersion`""
$cargoToml | Set-Content "src-tauri/Cargo.toml"

# Update src-tauri/tauri.conf.json
Write-Host "📝 Updating src-tauri/tauri.conf.json..." -ForegroundColor Yellow
$tauriConf = Get-Content "src-tauri/tauri.conf.json" -Raw | ConvertFrom-Json
$tauriConf.version = $NewVersion
$tauriConf | ConvertTo-Json -Depth 10 | Set-Content "src-tauri/tauri.conf.json"

Write-Host "✅ Version bumped to $NewVersion successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the changes: git diff" -ForegroundColor White
Write-Host "2. Commit: git add . && git commit -m 'chore: bump version to $NewVersion'" -ForegroundColor White
Write-Host "3. Push: git push" -ForegroundColor White
Write-Host "4. Tag: git tag v$NewVersion && git push origin v$NewVersion" -ForegroundColor White
Write-Host ""
Write-Host "Or run this command to do it all:" -ForegroundColor Yellow
Write-Host "git add . && git commit -m 'chore: bump version to $NewVersion' && git push && git tag v$NewVersion && git push origin v$NewVersion" -ForegroundColor Green

