$ErrorActionPreference = "SilentlyContinue"
Set-Location "C:\Users\TSC\Desktop\Nothing\AII\iai"

# Define consolidated AI tools with proper tags
$aiTools = @{
  # AI Coding Agents
  "claude-code" = @{title="Claude Code"; tags="ai,coding,agent,cli,anthropic"}
  "cursor" = @{title="Cursor"; tags="ai,coding,agent,ide,editor"}
  "copilot" = @{title="GitHub Copilot"; tags="ai,coding,agent,ide,microsoft"}
  "copilot-workspace" = @{title="Copilot Workspace"; tags="ai,coding,agent,cloud,microsoft"}
  "github-spark" = @{title="GitHub Spark"; tags="ai,coding,agent,cloud,microsoft"}
  "devin" = @{title="Devin"; tags="ai,coding,agent,cloud,autonomous"}
  "windsurf" = @{title="Windsurf"; tags="ai,coding,agent,ide,editor"}
  "openclaw" = @{title="OpenClaw"; tags="ai,coding,agent,open-source"}
  "opencode" = @{title="OpenCode"; tags="ai,coding,agent,open-source,cli"}
  "deepseek" = @{title="DeepSeek Coder"; tags="ai,coding,agent,api,china"}
  "aws-kiro" = @{title="AWS Kiro"; tags="ai,coding,agent,cloud,aws"}
  "jetbrains-junie" = @{title="JetBrains Junie"; tags="ai,coding,agent,ide,jetbrains"}
  "amazon-q" = @{title="Amazon Q Developer"; tags="ai,coding,agent,cloud,aws"}
  "microsoft-ai-dev" = @{title="Microsoft AI Dev"; tags="ai,coding,agent,cloud,microsoft"}
  "chrome-devtools-ai" = @{title="Chrome DevTools AI"; tags="ai,coding,agent,browser,google"}
  "aider" = @{title="Aider"; tags="ai,coding,agent,cli,open-source"}
  "cline" = @{title="Cline"; tags="ai,coding,agent,vscode,open-source"}
  "roo-code" = @{title="Roo Code"; tags="ai,coding,agent,vscode,open-source"}
  "continue" = @{title="Continue"; tags="ai,coding,agent,ide,open-source"}
  "replit-agent" = @{title="Replit Agent"; tags="ai,coding,agent,cloud,autonomous"}
  "vercel-v0" = @{title="Vercel v0"; tags="ai,coding,agent,cloud,generative,ui"}
  "bolt-new" = @{title="Bolt.new"; tags="ai,coding,agent,cloud,generative,web"}
  "lovable" = @{title="Lovable"; tags="ai,coding,agent,cloud,generative,full-stack"}
  "base44" = @{title="Base44"; tags="ai,coding,agent,cloud,generative,no-code"}
  "augment-code" = @{title="Augment Code"; tags="ai,coding,agent,enterprise,ide"}
  "sourcegraph-cody" = @{title="Sourcegraph Cody"; tags="ai,coding,agent,codebase,ide"}
  "amazon-q-cli" = @{title="Amazon Q CLI"; tags="ai,coding,agent,cli,aws"}
  "gemini-cli" = @{title="Gemini CLI"; tags="ai,coding,agent,cli,google"}
  "openai-codex" = @{title="OpenAI Codex"; tags="ai,coding,agent,api,openai"}
  # AI Chat/Assistants
  "chatgpt" = @{title="ChatGPT"; tags="ai,chat,cloud,openai"}
  "chatgpt-desktop" = @{title="ChatGPT Desktop"; tags="ai,chat,desktop,openai"}
  "claude-desktop" = @{title="Claude Desktop"; tags="ai,chat,desktop,anthropic"}
  "gemini" = @{title="Google Gemini"; tags="ai,chat,cloud,google,multimodal"}
  "google-ai-studio" = @{title="Google AI Studio"; tags="ai,chat,cloud,google,playground"}
  "perplexity" = @{title="Perplexity"; tags="ai,search,cloud,assistant"}
  "phind" = @{title="Phind"; tags="ai,search,cloud,developer"}
  "you-com" = @{title="You.com"; tags="ai,search,cloud,assistant"}
  "arc-search" = @{title="Arc Search"; tags="ai,search,browser,assistant"}
  "brave-leo" = @{title="Brave Leo"; tags="ai,search,browser,assistant"}
  "kagi" = @{title="Kagi"; tags="ai,search,cloud,premium"}
  "mem" = @{title="Mem"; tags="ai,search,cloud,notes"}
  "obsidian-llm" = @{title="Obsidian LLM"; tags="ai,chat,local,notes"}
  # AI Creative
  "midjourney" = @{title="Midjourney"; tags="ai,creative,image,cloud,generative"}
  "dalle" = @{title="DALL-E"; tags="ai,creative,image,cloud,openai,generative"}
  "stable-diffusion" = @{title="Stable Diffusion"; tags="ai,creative,image,open-source,generative"}
  "leonardo" = @{title="Leonardo AI"; tags="ai,creative,image,cloud,generative"}
  "runway" = @{title="Runway ML"; tags="ai,creative,video,cloud,generative"}
  "sora" = @{title="Sora"; tags="ai,creative,video,cloud,openai,generative"}
  "pika-labs" = @{title="Pika Labs"; tags="ai,creative,video,cloud,generative"}
  "kaiber" = @{title="Kaiber"; tags="ai,creative,video,cloud,generative"}
  "soundraw" = @{title="Soundraw"; tags="ai,creative,audio,cloud,generative"}
  "melobytes" = @{title="Melobytes"; tags="ai,creative,audio,cloud,generative"}
  "elevenlabs" = @{title="ElevenLabs"; tags="ai,creative,voice,cloud,generative"}
  # AI Productivity
  "notion-ai" = @{title="Notion AI"; tags="ai,productivity,cloud,writing"}
  "jasper" = @{title="Jasper AI"; tags="ai,productivity,cloud,writing"}
  "heygen" = @{title="HeyGen"; tags="ai,productivity,video,cloud"}
  "ai21-studio" = @{title="AI21 Studio"; tags="ai,productivity,cloud,writing"}
  # AI Voice/Audio
  "coqui-tts" = @{title="Coqui TTS"; tags="ai,voice,tts,open-source"}
  "mozilla-tts" = @{title="Mozilla TTS"; tags="ai,voice,tts,open-source"}
  "riffusion" = @{title="Riffusion"; tags="ai,voice,music,open-source"}
  "vocode" = @{title="Vocode"; tags="ai,voice,phone,open-source"}
  "resemble-ai" = @{title="Resemble AI"; tags="ai,voice,cloud,tts"}
  "silero" = @{title="Silero"; tags="ai,voice,open-source,tts"}
  "descript-overdub" = @{title="Descript Overdub"; tags="ai,voice,cloud,tts"}
  "descript" = @{title="Descript"; tags="ai,voice,cloud,editing"}
  # Local AI / Runtimes
  "ollama" = @{title="Ollama"; tags="ai,local,runtime,llm,open-source"}
  "lm-studio" = @{title="LM Studio"; tags="ai,local,runtime,llm,gui"}
  "jan" = @{title="Jan"; tags="ai,local,runtime,llm,open-source"}
  "anything-llm" = @{title="AnythingLLM"; tags="ai,local,runtime,llm,docker"}
  "open-webui" = @{title="Open WebUI"; tags="ai,local,runtime,llm,web"}
  "localai" = @{title="LocalAI"; tags="ai,local,runtime,llm,api"}
  "llama-cpp" = @{title="llama.cpp"; tags="ai,local,runtime,llm,cpp"}
  "ggml" = @{title="GGML"; tags="ai,local,runtime,llm,library"}
  "koboldcpp" = @{title="KoboldCpp"; tags="ai,local,runtime,llm,story"}
  "llamafile" = @{title="llamafile"; tags="ai,local,runtime,llm,portable"}
  "gpt4all" = @{title="GPT4All"; tags="ai,local,runtime,llm,chat"}
  "msty" = @{title="Msty"; tags="ai,local,runtime,llm,gui"}
  "enchant" = @{title="Enchant"; tags="ai,local,runtime,llm,macos"}
  "text-generation-webui" = @{title="Text Generation WebUI"; tags="ai,local,runtime,llm,web"}
  "hugging-face-tgi" = @{title="Hugging Face TGI"; tags="ai,local,runtime,llm,inference"}
  "privategpt" = @{title="PrivateGPT"; tags="ai,local,runtime,rag,privacy"}
  "vllm" = @{title="vLLM"; tags="ai,local,runtime,llm,inference,fast"}
  "triton" = @{title="Triton Inference"; tags="ai,local,runtime,llm,nvidia"}
  # AI Agents Frameworks
  "langchain" = @{title="LangChain"; tags="ai,agent,framework,python,rag"}
  "langgraph" = @{title="LangGraph"; tags="ai,agent,framework,python,stateful"}
  "llamaindex" = @{title="LlamaIndex"; tags="ai,agent,framework,python,rag"}
  "haystack" = @{title="Haystack"; tags="ai,agent,framework,python,rag"}
  "autogen" = @{title="AutoGen"; tags="ai,agent,framework,python,multi-agent"}
  "crewai" = @{title="CrewAI"; tags="ai,agent,framework,python,multi-agent"}
  "dify" = @{title="Dify"; tags="ai,agent,platform,llm,open-source"}
  "flowise" = @{title="Flowise"; tags="ai,agent,platform,visual,open-source"}
  "langflow" = @{title="Langflow"; tags="ai,agent,platform,visual,open-source"}
  "smolagents" = @{title="Smolagents"; tags="ai,agent,framework,python,lightweight"}
  "mastra" = @{title="Mastra"; tags="ai,agent,framework,typescript"}
  "open-interpreter" = @{title="Open Interpreter"; tags="ai,agent,local,code-execution"}
  "openhands" = @{title="OpenHands"; tags="ai,agent,local,code-execution"}
  "memgpt" = @{title="MemGPT"; tags="ai,agent,local,memory,llm"}
  "dspy" = @{title="DSPy"; tags="ai,agent,framework,optimization"}
  # AI APIs/Services
  "openai-api" = @{title="OpenAI API"; tags="ai,api,cloud,gpt,openai"}
  "anthropic-api" = @{title="Anthropic API"; tags="ai,api,cloud,claude"}
  "mistral-api" = @{title="Mistral API"; tags="ai,api,cloud,mistral"}
  "deepseek-api" = @{title="DeepSeek API"; tags="ai,api,cloud,deepseek"}
  "xai-grok-api" = @{title="xAI Grok API"; tags="ai,api,cloud,grok"}
  "groq" = @{title="Groq"; tags="ai,api,cloud,fast,inference"}
  "openrouter" = @{title="OpenRouter"; tags="ai,api,cloud,aggregator"}
  "replicate" = @{title="Replicate"; tags="ai,api,cloud,hosted"}
  "together" = @{title="Together AI"; tags="ai,api,cloud,inference"}
  "fireworks-ai" = @{title="Fireworks AI"; tags="ai,api,cloud,inference"}
  "cerebras-inference" = @{title="Cerebras Inference"; tags="ai,api,cloud,fast"}
  "hugging-face-inference" = @{title="HF Inference Endpoints"; tags="ai,api,cloud,huggingface"}
  # AI Search/Research
  "metaphor" = @{title="Metaphor"; tags="ai,search,api,research"}
  "clip-interrogator" = @{title="Clip Interrogator"; tags="ai,search,image,open-source"}
  # AI Multimodal
  "diffusers" = @{title="Diffusers (HF)"; tags="ai,multimodal,image,open-source"}
  "automatic1111" = @{title="AUTOMATIC1111"; tags="ai,multimodal,image,webui"}
  "comfyui" = @{title="ComfyUI"; tags="ai,multimodal,image,nodes"}
  "invokeai" = @{title="InvokeAI"; tags="ai,multimodal,image,gui"}
  "controlnet" = @{title="ControlNet"; tags="ai,multimodal,image,control"}
  "novelai-webui" = @{title="NovelAI WebUI"; tags="ai,multimodal,image,anime"}
  "whisper" = @{title="Whisper"; tags="ai,multimodal,audio,transcription"}
  "faster-whisper" = @{title="Faster Whisper"; tags="ai,multimodal,audio,transcription"}
  # AI Evaluation/Benchmarking
  "lmsys-arena" = @{title="LMSYS Arena"; tags="ai,evaluation,benchmark,leaderboard"}
  "lm-eval" = @{title="LM Evaluation Harness"; tags="ai,evaluation,benchmark,open-source"}
  "deepeval" = @{title="DeepEval"; tags="ai,evaluation,testing,llm"}
  "ragas" = @{title="Ragas"; tags="ai,evaluation,rag,metrics"}
  "promptfoo" = @{title="Promptfoo"; tags="ai,evaluation,prompt,testing"}
  "langsmith" = @{title="LangSmith"; tags="ai,evaluation,tracing,debugging"}
  "arize-phoenix" = @{title="Arize Phoenix"; tags="ai,evaluation,observability,tracing"}
  "open-llm-leaderboard" = @{title="Open LLM Leaderboard"; tags="ai,evaluation,benchmark,huggingface"}
  "helm" = @{title="HELM"; tags="ai,evaluation,benchmark,stanford"}
  "big-bench" = @{title="Big-Bench"; tags="ai,evaluation,benchmark,google"}
  "mmlu" = @{title="MMLU"; tags="ai,evaluation,benchmark,knowledge"}
  "human-eval" = @{title="HumanEval"; tags="ai,evaluation,benchmark,coding"}
  "gpqa" = @{title="GPQA"; tags="ai,evaluation,benchmark,expert"}
  # AI Embeddings
  "sentence-transformers" = @{title="Sentence Transformers"; tags="ai,embeddings,nlp,open-source"}
  "openai-embeddings" = @{title="OpenAI Embeddings"; tags="ai,embeddings,api,text"}
  "cohere-embeddings" = @{title="Cohere Embeddings"; tags="ai,embeddings,api,multilingual"}
  "voyage-ai" = @{title="Voyage AI"; tags="ai,embeddings,api,finance"}
  "jina-embeddings" = @{title="Jina Embeddings"; tags="ai,embeddings,api,multilingual"}
  "nomic-embed" = @{title="Nomic Embed"; tags="ai,embeddings,open-source,text"}
  # AI Fine-tuning
  "axolotl" = @{title="Axolotl"; tags="ai,fine-tuning,llm,training"}
  "unsloth" = @{title="Unsloth"; tags="ai,fine-tuning,fast,low-memory"}
  "trl" = @{title="TRL"; tags="ai,fine-tuning,transformers,rlhf"}
  "peft" = @{title="PEFT"; tags="ai,fine-tuning,lora,adapters"}
  "ludwig" = @{title="Ludwig"; tags="ai,fine-tuning,no-code,declarative"}
  "autotrain" = @{title="AutoTrain"; tags="ai,fine-tuning,automated,huggingface"}
  # AI Model Hubs
  "huggingface" = @{title="Hugging Face Hub"; tags="ai,model-hub,open-source,ml"}
  "civitai" = @{title="Civitai"; tags="ai,model-hub,ai-art,community"}
  "modelscope" = @{title="ModelScope"; tags="ai,model-hub,alibaba,china"}
  "tensorflow-hub" = @{title="TensorFlow Hub"; tags="ai,model-hub,tensorflow,google"}
  "pytorch-hub" = @{title="PyTorch Hub"; tags="ai,model-hub,pytorch,meta"}
  # AI Vector Databases
  "chroma" = @{title="Chroma"; tags="ai,vector-db,open-source,embeddings"}
  "faiss" = @{title="Faiss"; tags="ai,vector-db,facebook,similarity"}
  "qdrant" = @{title="Qdrant"; tags="ai,vector-db,rust,filtering"}
  "milvus" = @{title="Milvus"; tags="ai,vector-db,scalable,cloud"}
  "weaviate" = @{title="Weaviate"; tags="ai,vector-db,graphql,cloud"}
  "pinecone" = @{title="Pinecone"; tags="ai,vector-db,managed,serverless"}
  # AI RAG Frameworks
  "ragflow" = @{title="RAGFlow"; tags="ai,rag,open-source,document"}
  # AI Observability
  "helicone" = @{title="Helicone"; tags="ai,observability,proxy,open-source"}
  "openlit" = @{title="OpenLIT"; tags="ai,observability,opentelemetry"}
  # AI Security
  "guardrails" = @{title="Guardrails AI"; tags="ai,security,validation,output"}
  "neMo-guardrails" = @{title="NeMo Guardrails"; tags="ai,security,nvidia,llm"}
  # AI Infrastructure
  "modal" = @{title="Modal"; tags="ai,infrastructure,serverless,python"}
  "runpod" = @{title="RunPod"; tags="ai,infrastructure,gpu,serverless"}
  "lambda-cloud" = @{title="Lambda Cloud"; tags="ai,infrastructure,gpu,training"}
  "aws-sagemaker" = @{title="AWS SageMaker"; tags="ai,infrastructure,ml,aws"}
  "azure-ml" = @{title="Azure ML"; tags="ai,infrastructure,ml,microsoft"}
  "gcp-vertex" = @{title="GCP Vertex AI"; tags="ai,infrastructure,ml,google"}
  "colab" = @{title="Google Colab"; tags="ai,infrastructure,notebook,free-gpu"}
  "hf-spaces" = @{title="Hugging Face Spaces"; tags="ai,infrastructure,hosting,ml"}
}

# Create consolidated ai-tools directory
$targetDir = "src\content\ai-tools"
if (!(Test-Path $targetDir)) {
  New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$count = 0
foreach ($slug in $aiTools.Keys) {
  $tool = $aiTools[$slug]
  $dir = "$targetDir\$slug"
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    $tagsFormatted = ($tool.tags -split ',' | ForEach-Object { "`"$_`"" }) -join ', '
    $content = @"
---
title: "$($tool.title)"
category: "ai-tools"
icon: "brain"
difficulty: "beginner"
tags: [$tagsFormatted]
---

## Tổng quan

<Note type="info">
**$($tool.title)** là công cụ AI. Xem tài liệu chính thức để biết chi tiết.
</Note>

## Liên kết

- [$($tool.title)](https://$slug.com)
"@
    Set-Content -Path "$dir\index.mdx" -Value $content -Encoding UTF8
    $count++
  }
}

Write-Host "Created $count consolidated AI tool files"

# Remove old duplicate directories
$oldDirs = @("src\content\ai-tools-new", "src\content\local-ai", "src\content\ai-agents")
foreach ($dir in $oldDirs) {
  if (Test-Path $dir) {
    Remove-Item -Path $dir -Recurse -Force
    Write-Host "Removed $dir"
  }
}
