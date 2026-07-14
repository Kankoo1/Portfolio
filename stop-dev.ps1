$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $repoRoot '.dev-pids.json'

if (-not (Test-Path $pidFile)) {
    Write-Host 'No active dev PID file found. Nothing to stop.'
    exit 0
}

try {
    $content = Get-Content -Path $pidFile -Raw | ConvertFrom-Json
} catch {
    Write-Warning 'PID file is invalid. Deleting it.'
    Remove-Item -Path $pidFile -Force -ErrorAction SilentlyContinue
    exit 0
}

$processIds = @($content.backendPid, $content.frontendPid) | Where-Object { $_ }

foreach ($processId in $processIds) {
    try {
        $proc = Get-Process -Id $processId -ErrorAction Stop
        & taskkill /PID $proc.Id /T /F | Out-Null
        Write-Host "Stopped process tree for PID $($proc.Id) ($($proc.ProcessName))."
    } catch {
        Write-Host "Process $processId is not running."
    }
}

Remove-Item -Path $pidFile -Force -ErrorAction SilentlyContinue
Write-Host 'Dev services stopped.'
