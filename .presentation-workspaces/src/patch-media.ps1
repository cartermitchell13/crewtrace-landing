$ErrorActionPreference = "Stop"

$workspace = Resolve-Path "."
$pptxPath = Join-Path $workspace "output\output.pptx"
$logoPath = Resolve-Path "..\public\images\crew-trace-logo.png"
$geofencePath = Resolve-Path "..\public\images\geofencing\draw-boundary.png"

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::Open($pptxPath, [System.IO.Compression.ZipArchiveMode]::Update)
try {
    $replacements = @(
        @{ Entry = "ppt/media/image.png"; Source = $logoPath },
        @{ Entry = "ppt/media/image2.png"; Source = $geofencePath }
    )

    foreach ($replacement in $replacements) {
        $entry = $zip.GetEntry($replacement.Entry)
        if ($null -ne $entry) {
            $entry.Delete()
        }

        $newEntry = $zip.CreateEntry($replacement.Entry, [System.IO.Compression.CompressionLevel]::Optimal)
        $sourceStream = [System.IO.File]::OpenRead($replacement.Source)
        try {
            $targetStream = $newEntry.Open()
            try {
                $sourceStream.CopyTo($targetStream)
            } finally {
                $targetStream.Dispose()
            }
        } finally {
            $sourceStream.Dispose()
        }
    }
} finally {
    $zip.Dispose()
}

Write-Output $pptxPath
