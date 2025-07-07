@echo off
echo Starting local server for NightKind Collective website...
echo.
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

powershell -Command "& { $Hso = New-Object Net.HttpListener; $Hso.Prefixes.Add('http://localhost:8000/'); $Hso.Start(); Write-Host 'Server running at http://localhost:8000/'; Write-Host 'Press Ctrl+C to stop'; while ($Hso.IsListening) { $HC = $Hso.GetContext(); $HRes = $HC.Response; $path = $HC.Request.Url.LocalPath; if ($path -eq '/') { $path = '/index.html' }; $filePath = (Get-Location).Path + $path; if (Test-Path $filePath) { $ext = [System.IO.Path]::GetExtension($filePath); switch ($ext) { '.html' { $contentType = 'text/html' } '.css' { $contentType = 'text/css' } '.js' { $contentType = 'application/javascript' } '.png' { $contentType = 'image/png' } '.jpg' { $contentType = 'image/jpeg' } '.jpeg' { $contentType = 'image/jpeg' } '.gif' { $contentType = 'image/gif' } '.svg' { $contentType = 'image/svg+xml' } default { $contentType = 'text/plain' } }; $HRes.Headers.Add('Content-Type', $contentType); $Buf = [System.IO.File]::ReadAllBytes($filePath); $HRes.ContentLength64 = $Buf.Length; $HRes.OutputStream.Write($Buf,0,$Buf.Length) } else { $HRes.StatusCode = 404 }; $HRes.Close() } }"

pause 