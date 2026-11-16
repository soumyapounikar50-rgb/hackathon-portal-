# Auto-Push Watcher for Hackathon Portal
# Automatically detects changes, commits, and pushes to GitHub

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🚀 GitHub Auto-Push Watcher is Running!" -ForegroundColor Green
Write-Host "Monitoring: $PSScriptRoot" -ForegroundColor Yellow
Write-Host "Any saved file changes will be automatically pushed to GitHub." -ForegroundColor Gray
Write-Host "Press Ctrl + C anytime to stop." -ForegroundColor Gray
Write-Host "=================================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot

while ($true) {
    # Check if there are modified or untracked files (ignoring node_modules and .next)
    $status = git status --porcelain
    
    if ($status) {
        Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] 📝 Detected changes in project files..." -ForegroundColor Yellow
        
        # Short wait to let any multi-file saves settle
        Start-Sleep -Seconds 3
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 📦 Staging & committing files..." -ForegroundColor Gray
        git add .
        
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto-sync changes: $timestamp" -q
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 🚀 Pushing to GitHub (main branch)..." -ForegroundColor Cyan
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ Successfully synced with GitHub!" -ForegroundColor Green
        } else {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⚠️ Push had an issue. Will retry on next change." -ForegroundColor Red
        }
    }
    
    # Check every 4 seconds
    Start-Sleep -Seconds 4
}
