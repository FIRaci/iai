# PowerShell script to generate missing MDX placeholder files
# Run from project root: .claude/scripts/generate-placeholders.ps1

$ErrorActionPreference = "Stop"

# Define categories and their missing items
$categories = @{
    "ai-creative" = @(
        "automatic1111", "bark", "blip", "clip", "clip-interrogator", "coqui-tts",
        "comfyui", "controlnet", "descript", "descript-overdub", "diffusers", "edge-tts",
        "faster-whisper", "flux", "florence-2", "invokeai", "kaiber", "kandinsky",
        "llava", "melobytes", "mozilla-tts", "novelai-webui", "pika-labs", "playground",
        "resemble-ai", "riffusion", "silero", "silero-vad", "sora", "soundraw", "vocode",
        "whisper", "whisper-cpp"
    )
    "ml-training" = @(
        "accelerate", "autotrain", "axolotl", "bentoml", "bitsandbytes", "catalyst",
        "clearml", "coreml", "deepspeed-chat", "dvc", "flash-attention", "gradio",
        "kserve", "kubeflow", "litgpt", "ludwig", "mlflow", "modal", "neptune",
        "onnx", "peft", "pytorch-lightning", "seldon", "streamlit", "tensorboard",
        "tfx", "tflite", "trl", "unsloth", "wandb", "wandb-sweeps"
    )
}

$basePath = "src/content"

foreach ($cat in $categories.Keys) {
    $items = $categories[$cat]
    $catPath = Join-Path $basePath $cat

    if (-not (Test-Path $catPath)) {
        New-Item -ItemType Directory -Force -Path $catPath | Out-Null
    }

    foreach ($item in $items) {
        $itemPath = Join-Path $catPath $item
        if (-not (Test-Path $itemPath)) {
            New-Item -ItemType Directory -Force -Path $itemPath | Out-Null
        }

        $mdxPath = Join-Path $itemPath "index.mdx"
        if (-not (Test-Path $mdxPath)) {
            $title = ($item -replace '-', ' ' -replace '\b\w', { $_.Value.ToUpper() })
            $content = @"
---
title: "$title"
category: "$cat"
icon: "code"
difficulty: "beginner"
tags: ["$cat"]
---

## Tổng quan

<Note type="info">
**$title** là công cụ trong nhóm $cat. Xem tài liệu chính thức để biết chi tiết.
</Note>

## Liên kết

- [$title Official](https://google.com/search?q=$item)

"@
            Set-Content -Path $mdxPath -Value $content -Encoding UTF8
            Write-Host "Created: $mdxPath"
        }
    }
}

Write-Host "Done! Generated placeholder files for ai-creative and ml-training."
