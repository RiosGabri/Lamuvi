# Script opcional para instalar Node.js no Windows via winget

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Error "winget não está disponível neste sistema. Instale manualmente ou use o site nodejs.org."
  exit 1
}

winget install --id OpenJS.NodeJS --exact --accept-package-agreements --accept-source-agreements

# Atualiza o PATH na sessão atual
$nodePath = 'C:\Program Files\nodejs'
if (Test-Path $nodePath) {
  $env:Path = "$env:Path;$nodePath"
  Write-Output "Node instalado em $nodePath"
  node -v
  npm -v
} else {
  Write-Error "Não encontrou Node em $nodePath"
}
