$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $repoRoot 'backend'
$frontendDir = Join-Path $repoRoot 'angular'
$pidFile = Join-Path $repoRoot '.dev-pids.json'
$logsDir = Join-Path $repoRoot '.dev-logs'
$envFile = Join-Path $repoRoot '.env.dev.local'

if (-not (Test-Path $logsDir)) {
    New-Item -ItemType Directory -Path $logsDir | Out-Null
}

$backendLog = Join-Path $logsDir 'backend.log'
$backendErrLog = Join-Path $logsDir 'backend.err.log'
$frontendLog = Join-Path $logsDir 'frontend.log'
$frontendErrLog = Join-Path $logsDir 'frontend.err.log'

if (Test-Path $backendLog) { Remove-Item $backendLog -Force }
if (Test-Path $backendErrLog) { Remove-Item $backendErrLog -Force }
if (Test-Path $frontendLog) { Remove-Item $frontendLog -Force }
if (Test-Path $frontendErrLog) { Remove-Item $frontendErrLog -Force }

function Ensure-Command {
    param(
        [string]$CommandName,
        [string]$Hint
    )

    if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
        throw "$CommandName is required. $Hint"
    }
}

function Load-EnvFile {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        return
    }

    Write-Host "Loading environment variables from $Path"

    foreach ($line in Get-Content -Path $Path) {
        $trimmed = $line.Trim()
        if (-not $trimmed -or $trimmed.StartsWith('#')) {
            continue
        }

        $parts = $trimmed -split '=', 2
        if ($parts.Length -ne 2) {
            continue
        }

        $name = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
    }
}

Ensure-Command -CommandName 'java' -Hint 'Install Java 21+ and add it to PATH.'
Ensure-Command -CommandName 'node' -Hint 'Install Node.js and add it to PATH.'
Ensure-Command -CommandName 'npm' -Hint 'Install Node.js (npm included) and add it to PATH.'

Load-EnvFile -Path $envFile

if (-not (Test-Path (Join-Path $backendDir 'mvnw.cmd'))) {
    throw 'backend\mvnw.cmd was not found. Run this script from the repository root.'
}

if (-not (Test-Path (Join-Path $frontendDir 'package.json'))) {
    throw 'angular\package.json was not found. Run this script from the repository root.'
}

if (Test-Path $pidFile) {
    Write-Host 'A previous dev session PID file exists. Attempting cleanup first...'
    & (Join-Path $repoRoot 'stop-dev.ps1') | Out-Null
}

Write-Host 'Starting Spring Boot backend on http://localhost:8080/api ...'
$backend = Start-Process -FilePath 'cmd.exe' `
    -ArgumentList '/c', 'mvnw.cmd spring-boot:run' `
    -WorkingDirectory $backendDir `
    -RedirectStandardOutput $backendLog `
    -RedirectStandardError $backendErrLog `
    -PassThru

Write-Host 'Starting Angular frontend on http://localhost:4200 ...'
$frontend = Start-Process -FilePath 'cmd.exe' `
    -ArgumentList '/c', 'npm run start -- --port 4200 --poll 2000' `
    -WorkingDirectory $frontendDir `
    -RedirectStandardOutput $frontendLog `
    -RedirectStandardError $frontendErrLog `
    -PassThru

$pids = @{
    backendPid = $backend.Id
    frontendPid = $frontend.Id
    startedAt = (Get-Date).ToString('o')
} | ConvertTo-Json

Set-Content -Path $pidFile -Value $pids -Encoding utf8

function Wait-Url {
    param(
        [string]$Url,
        [int]$TimeoutSeconds,
        [string]$Name
    )

    $start = Get-Date
    do {
        try {
            $null = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 5
            Write-Host "$Name is ready: $Url"
            return $true
        } catch {
            Start-Sleep -Seconds 2
        }
    } while (((Get-Date) - $start).TotalSeconds -lt $TimeoutSeconds)

    Write-Warning "$Name did not become ready within $TimeoutSeconds seconds."
    return $false
}

$backendReady = Wait-Url -Url 'http://localhost:8080/api/profile' -TimeoutSeconds 90 -Name 'Backend'
$frontendReady = Wait-Url -Url 'http://localhost:4200' -TimeoutSeconds 90 -Name 'Frontend'

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host "Backend logs: $backendLog"
Write-Host "Backend errors: $backendErrLog"
Write-Host "Frontend logs: $frontendLog"
Write-Host "Frontend errors: $frontendErrLog"
if ($backendReady -and $frontendReady) {
    Write-Host 'Dev services started and healthy.'
} else {
    Write-Warning 'Dev services started, but one or more health checks failed. Check log files.'
}
Write-Host 'Use .\stop-dev.ps1 to stop both.'
