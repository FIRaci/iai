#!/usr/bin/env python3
"""
Content filler for empty MDX pages.
Generates Install, Usage, and Tips sections for tools based on their name/category.
Sections order: Tổng quan → Cài đặt → Sử dụng → Tips → Liên kết
"""

import re
import sys
from pathlib import Path

# Tool database with known install commands and usage patterns
# Overview should NOT start with tool name - script adds it automatically
TOOL_DB = {
    "ai21-studio": {
        "overview": "là nền tảng AI của AI21 Labs, cung cấp Jurassic-2 LLM cho text generation, summarization, và text improvement. API mạnh mẽ cho enterprise applications.",
        "install": "pip install ai21",
        "usage": """import ai21
ai21.api_key = "your-api-key"
response = ai21.Completion.execute(
    prompt="Write a short story about AI",
    model="j2-ultra"
)
print(response.completions[0].data.text)""",
        "tips": "**API Key:** Đăng ký tại studio.ai21.com để lấy API key miễn phí.",
        "links": ["AI21 Studio|https://studio.ai21.com", "API Docs|https://docs.ai21.com"]
    },
    "aider": {
        "overview": "là AI pair programming tool chạy trong terminal. Chat với AI để edit code files, commit changes tự động vào Git. Hỗ trợ nhiều ngôn ngữ lập trình.",
        "install": "pip install aider-chat",
        "usage": """aider file1.py file2.py
# Trong terminal:
# /add file3.py
# Implement a function to sort users by name""",
        "tips": "**Git integration:** Aider tự động commit changes sau mỗi edit.",
        "links": ["Aider|https://aider.chat", "GitHub|https://github.com/paul-gauthier/aider"]
    },
    "amazon-q": {
        "overview": "là AI assistant của AWS dành cho developers. Giúp viết code, debug, và optimize applications trong AWS ecosystem.",
        "install": "npm install -g @aws-amplify/cli",
        "usage": """amplify configure
# Sau đó:
amplify add api
amplify push""",
        "tips": "**AWS Integration:** Kết nối trực tiếp với AWS services như Lambda, DynamoDB, S3.",
        "links": ["Amazon Q|https://aws.amazon.com/q", "AWS Docs|https://docs.aws.amazon.com/amazonq"]
    },
    "amazon-q-cli": {
        "overview": "là command-line interface cho Amazon Q AI assistant. Tương tác với AWS services qua natural language commands.",
        "install": "pip install amazon-q-cli",
        "usage": """q configure
q "List my EC2 instances"
q "Create a new S3 bucket named my-bucket" """,
        "tips": "**IAM Roles:** Đảm bảo IAM user có đủ permissions cho các AWS services cần truy cập.",
        "links": ["Amazon Q CLI|https://aws.amazon.com/q/developer", "AWS CLI Docs|https://docs.aws.amazon.com/cli"]
    },
    "anthropic-api": {
        "overview": "cung cấp quyền truy cập vào Claude models cho text generation, analysis, và coding. Known for safety và constitutional AI approach.",
        "install": "pip install anthropic",
        "usage": """import anthropic
client = anthropic.Anthropic(api_key="your-key")
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}]
)
print(message.content[0].text)""",
        "tips": "**Rate Limits:** Free tier có giới hạn requests/phút. Upgrade để tăng limits.",
        "links": ["Anthropic API|https://docs.anthropic.com", "Console|https://console.anthropic.com"]
    },
    "anything-llm": {
        "overview": "là all-in-one AI chatbot platform. Chat với documents, websites, và custom knowledge bases. Self-hosted hoặc cloud deployment.",
        "install": "docker pull mintplexlabs/anythingllm\ndocker run -p 3001:3001 anythingllm",
        "usage": """# Truy cập http://localhost:3001
# 1. Tạo workspace mới
# 2. Upload documents (PDF, TXT, MD)
# 3. Chat với documents của bạn""",
        "tips": "**Vector DB:** Sử dụng built-in vector database hoặc kết nối với Pinecone/Chroma.",
        "links": ["AnythingLLM|https://anythingllm.com", "GitHub|https://github.com/Mintplex-Labs/anything-llm"]
    },
    "arc-search": {
        "overview": "là AI-powered search engine từ The Browser Company. Tự động browse và summarize multiple web pages thành một trang duy nhất.",
        "install": "# iOS App - Tải từ App Store",
        "usage": """# Trên iOS:
# 1. Mở Arc Search app
# 2. Gõ query vào search bar
# 3. Arc tự động browse và tạo "Build a Page" summary""",
        "tips": "**Build a Page:** Feature tự động compile thông tin từ nhiều sources thành một trang dễ đọc.",
        "links": ["Arc Search|https://arc.net/search", "The Browser Company|https://thebrowser.company"]
    },
    "arize-phoenix": {
        "overview": "là open-source LLM observability platform. Trace, evaluate, và monitor AI applications. Hỗ trợ prompt engineering và model debugging.",
        "install": "pip install arize-phoenix",
        "usage": """import phoenix as px
px.launch_app()
# Truy cập http://localhost:6006
# Upload traces hoặc connect với LLM application""",
        "tips": "**OpenTelemetry:** Tích hợp với OTel để auto-trace LLM calls trong production.",
        "links": ["Arize Phoenix|https://docs.arize.com/phoenix", "GitHub|https://github.com/Arize-ai/phoenix"]
    },
    "augment-code": {
        "overview": "là AI coding assistant cung cấp code completions, refactoring suggestions, và automated code reviews. Tích hợp với VS Code và JetBrains.",
        "install": "# Cài extension từ VS Code Marketplace hoặc JetBrains Plugin Repository",
        "usage": """# Trong VS Code:
# 1. Cài Augment Code extension
# 2. Sign in với API key
# 3. Bắt đầu code - AI sẽ tự động suggest completions""",
        "tips": "**Context Awareness:** Augment hiểu toàn bộ codebase, không chỉ file hiện tại.",
        "links": ["Augment Code|https://augment.dev", "VS Code Extension|https://marketplace.visualstudio.com/augment"]
    },
    "autogen": {
        "overview": "là framework của Microsoft để build multi-agent AI applications. Các agents có thể conversation với nhau để solve complex tasks.",
        "install": "pip install pyautogen",
        "usage": """from autogen import AssistantAgent, UserProxyAgent
config_list = [{"model": "gpt-4", "api_key": "your-key"}]
assistant = AssistantAgent("assistant", llm_config={"config_list": config_list})
user_proxy = UserProxyAgent("user_proxy")
user_proxy.initiate_chat(assistant, message="Write a Python script to analyze CSV data")""",
        "tips": "**Multi-Agent:** Sử dụng nhiều agents với different roles cho complex workflows.",
        "links": ["AutoGen|https://microsoft.github.io/autogen", "GitHub|https://github.com/microsoft/autogen"]
    },
    "automatic1111": {
        "overview": "(Stable Diffusion WebUI) là giao diện web phổ biến nhất cho Stable Diffusion. Generate, edit images với AI models.",
        "install": "git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui\ncd stable-diffusion-webui\n./webui.sh  # hoặc webui.bat trên Windows",
        "usage": """# Truy cập http://localhost:7860
# 1. Nhập prompt mô tả image muốn tạo
# 2. Chọn model (checkpoint)
# 3. Click Generate""",
        "tips": "**Extensions:** Cài đặt extensions như ControlNet, ADetailer để nâng cao khả năng.",
        "links": ["Automatic1111|https://github.com/AUTOMATIC1111/stable-diffusion-webui", "Wiki|https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki"]
    },
    "autotrain": {
        "overview": "là Hugging Face tool để auto-train ML models mà không cần code. Hỗ trợ text classification, NER, image classification.",
        "install": "pip install autotrain-advanced",
        "usage": """autotrain --config config.yaml
# Hoặc sử dụng AutoTrain UI trên Hugging Face Spaces""",
        "tips": "**Hugging Face Integration:** Push trained models trực tiếp lên Hugging Face Hub.",
        "links": ["AutoTrain|https://huggingface.co/autotrain", "GitHub|https://github.com/huggingface/autotrain-advanced"]
    },
    "aws-kiro": {
        "overview": "là AI-powered development tool từ AWS. Giúp developers viết code, debug, và optimize applications nhanh hơn.",
        "install": "npm install -g @aws/kiro",
        "usage": """kiro init
kiro generate "Create a REST API for user management"
kiro deploy""",
        "tips": "**AWS Integration:** Kết nối với AWS services để deploy và test applications.",
        "links": ["AWS Kiro|https://aws.amazon.com/kiro", "AWS Docs|https://docs.aws.amazon.com/kiro"]
    },
    "aws-sagemaker": {
        "overview": "là fully managed ML platform của AWS. Build, train, và deploy ML models ở scale.",
        "install": "pip install sagemaker",
        "usage": """import sagemaker
from sagemaker import get_execution_role
role = get_execution_role()
# Tạo training job
estimator = sagemaker.estimator.Estimator(...)
estimator.fit({'train': 's3://bucket/train-data'})""",
        "tips": "**Spot Instances:** Sử dụng spot training để giảm 70% chi phí training.",
        "links": ["SageMaker|https://aws.amazon.com/sagemaker", "SDK Docs|https://sagemaker.readthedocs.io"]
    },
    "axolotl": {
        "overview": "là tool để fine-tune LLMs (Llama, Mistral, v.v.) dễ dàng. Hỗ trợ LoRA, QLoRA, full fine-tuning.",
        "install": "pip install axolotl",
        "usage": """accelerate launch -m axolotl.cli.train config.yaml
# Config file định nghĩa model, dataset, training params""",
        "tips": "**QLoRA:** Sử dụng QLoRA để fine-tune models lớn trên GPU nhỏ.",
        "links": ["Axolotl|https://github.com/OpenAccess-AI-Collective/axolotl", "Docs|https://axolotl-ai.github.io"]
    },
    "azure-ml": {
        "overview": "là cloud platform của Microsoft để build, train, và deploy ML models. Tích hợp với Azure ecosystem.",
        "install": "pip install azure-ai-ml",
        "usage": """from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
ml_client = MLClient(credential, subscription_id, resource_group, workspace_name)""",
        "tips": "**Azure CLI:** Sử dụng `az ml` commands để quản lý workspace từ terminal.",
        "links": ["Azure ML|https://azure.microsoft.com/products/machine-learning", "SDK Docs|https://learn.microsoft.com/azure/machine-learning"]
    },
    "base44": {
        "overview": "là nền tảng AI để build applications không cần code. Natural language to app generation.",
        "install": "# Truy cập web app tại base44.ai",
        "usage": """# 1. Truy cập base44.ai
# 2. Mô tả application muốn build
# 3. AI tự động generate và deploy""",
        "tips": "**No-Code:** Phù hợp cho non-technical users muốn tạo apps nhanh.",
        "links": ["Base44|https://base44.ai"]
    },
    "big-bench": {
        "overview": "(Beyond the Imitation Game Benchmark) là benchmark suite để đánh giá khả năng của LLMs qua nhiều tasks khác nhau.",
        "install": "pip install big-bench",
        "usage": """python -m bigbench benchmark --tasks all --models gpt-4
# Kết quả được lưu và so sánh với các models khác""",
        "tips": "**Custom Tasks:** Có thể định nghĩa tasks riêng để benchmark models cụ thể.",
        "links": ["BIG-Bench|https://github.com/google/BIG-bench", "Papers|https://arxiv.org/abs/2206.04615"]
    },
    "bolt-new": {
        "overview": "là AI-powered web development tool. Generate full-stack applications từ natural language descriptions.",
        "install": "# Truy cập web app tại bolt.new",
        "usage": """# 1. Truy cập bolt.new
# 2. Mô tả web app muốn tạo
# 3. AI generate code và preview ngay trong browser""",
        "tips": "**Export Code:** Có thể export generated code để deploy riêng.",
        "links": ["Bolt.new|https://bolt.new", "StackBlitz|https://stackblitz.com"]
    },
    "brave-leo": {
        "overview": "là AI assistant tích hợp trong Brave browser. Trả lời câu hỏi, summarize pages, và search web mà không cần rời browser.",
        "install": "# Cài Brave browser từ brave.com",
        "usage": """# 1. Mở Brave browser
# 2. Click Leo icon trong sidebar
# 3. Hỏi câu hỏi hoặc yêu cầu summarize page""",
        "tips": "**Privacy:** Leo không lưu trữ conversations hoặc chia sẻ data với third parties.",
        "links": ["Brave Leo|https://brave.com/leo", "Brave Browser|https://brave.com"]
    },
}

def generate_generic_content(tool_name, category):
    """Generate generic content for unknown tools."""
    display_name = tool_name.replace("-", " ").title()
    
    category_overviews = {
        "ai-tools": "là công cụ AI hỗ trợ developers trong workflow. Cung cấp các tính năng thông minh để tăng năng suất phát triển phần mềm.",
        "other-tools": "là developer tool hữu ích. Xem tài liệu chính thức để biết chi tiết về tính năng và cách sử dụng.",
        "frontend": "là frontend tool/library cho React/JavaScript applications. Giúp xây dựng UI components nhanh hơn.",
        "backend": "là backend tool/framework. Hỗ trợ xây dựng APIs, databases, và server-side logic.",
        "frameworks": "là framework phát triển ứng dụng. Cung cấp cấu trúc và best practices cho projects.",
        "libraries": "là thư viện code hữu ích. Cung cấp reusable functions và utilities.",
        "cli-tools": "là command-line tool. Chạy trong terminal để thực hiện các tác vụ phát triển.",
        "devops": "là DevOps tool. Hỗ trợ CI/CD, deployment, và infrastructure management.",
        "databases": "là database tool/system. Hỗ trợ lưu trữ và query dữ liệu hiệu quả.",
        "testing": "là testing tool/framework. Giúp viết và chạy automated tests.",
        "security": "là security tool. Hỗ trợ bảo mật applications và infrastructure.",
        "monitoring": "là monitoring/observability tool. Theo dõi performance và health của systems.",
        "apis": "là API service. Cung cấp endpoints cho developers tích hợp vào applications.",
        "cloud": "là cloud platform/service. Hỗ trợ deployment và scaling applications.",
        "documentation": "là documentation tool. Giúp tạo và quản lý tài liệu projects.",
        "productivity": "là productivity tool. Tăng hiệu suất làm việc cho developers.",
        "automation": "là automation tool. Tự động hóa các tác vụ lặp lại trong development.",
        "data-processing": "là data processing tool. Xử lý và transform dữ liệu hiệu quả.",
        "visualization": "là data visualization tool. Tạo charts và graphs từ data.",
        "video": "là video processing tool. Xử lý, edit, và generate videos.",
        "voice-audio": "là audio/voice tool. Xử lý âm thanh và speech recognition.",
        "search": "là search tool/engine. Tìm kiếm và index dữ liệu.",
        "rag": "là RAG (Retrieval-Augmented Generation) tool. Kết hợp retrieval với LLMs.",
        "vector-db": "là vector database. Lưu trữ và search vector embeddings.",
        "vector-databases": "là vector database system. Hỗ trợ similarity search cho AI applications.",
        "embeddings": "là embedding tool/service. Chuyển đổi text/data thành vector embeddings.",
        "fine-tuning": "là fine-tuning platform. Train và customize AI models cho specific use cases.",
        "evaluation": "là evaluation tool. Đo lường và đánh giá performance của AI models.",
        "model-hubs": "là model hub/repository. Chia sẻ và download AI models.",
        "mlops": "là MLOps platform. Quản lý ML lifecycle từ development đến production.",
        "llm-runtimes": "là LLM runtime engine. Chạy và serve LLM models efficiently.",
        "notebooks": "là notebook environment. Interactive coding và data analysis.",
        "datasets": "là dataset repository. Cung cấp datasets cho training và testing.",
        "benchmarking": "là benchmarking tool. Đo lường và so sánh performance.",
        "ide-plugins": "là IDE plugin/extension. Tích hợp vào VS Code hoặc JetBrains.",
        "editors": "là code editor. Môi trường soạn thảo code với nhiều tính năng.",
        "git-tools": "là Git tool. Hỗ trợ version control và collaboration.",
        "terminals": "là terminal emulator. Giao diện command-line hiện đại.",
        "dev-infra": "là development infrastructure tool. Hỗ trợ build và manage dev environments.",
        "observability": "là observability platform. Monitor và debug applications.",
        "windows-setup": "là Windows setup/configuration tool. Tối ưu development environment trên Windows.",
        "package-managers": "là package manager. Quản lý dependencies và packages.",
        "ai-coding": "là AI coding assistant. Hỗ trợ viết code, debug, và refactor với AI.",
        "multimodal": "là multimodal AI tool. Xử lý text, images, audio trong cùng một model.",
        "image-generation": "là image generation tool. Tạo và edit images với AI.",
        "utilities": "là utility tool. Các chức năng hữu ích cho developers.",
        "dev-tools": "là developer tool. Hỗ trợ development workflow.",
        "comparisons": "là comparison tool/service. So sánh các solutions và tools.",
        "pages": "là page/component. Xem tài liệu để biết chi tiết.",
    }
    
    overview = category_overviews.get(category, "là công cụ hữu ích. Xem tài liệu chính thức để biết chi tiết.")
    
    install_commands = {
        "ai-tools": "pip install tool-name",
        "other-tools": "# Xem tài liệu chính thức để biết cách cài đặt",
        "frontend": "npm install tool-name",
        "backend": "pip install tool-name",
        "frameworks": "npm install tool-name",
        "libraries": "npm install tool-name",
        "cli-tools": "npm install -g tool-name",
        "devops": "npm install -g tool-name",
        "databases": "# Tải từ trang chủ hoặc sử dụng package manager",
        "testing": "npm install --save-dev tool-name",
        "security": "npm install tool-name",
        "monitoring": "npm install tool-name",
        "apis": "# Đăng ký API key từ trang chủ",
        "cloud": "# Tạo account và sử dụng qua web console hoặc CLI",
        "documentation": "npm install tool-name",
        "productivity": "# Tải từ trang chủ hoặc app store",
        "automation": "npm install tool-name",
        "data-processing": "pip install tool-name",
        "visualization": "npm install tool-name",
        "video": "pip install tool-name",
        "voice-audio": "pip install tool-name",
        "search": "npm install tool-name",
        "rag": "pip install tool-name",
        "vector-db": "pip install tool-name",
        "vector-databases": "pip install tool-name",
        "embeddings": "pip install tool-name",
        "fine-tuning": "pip install tool-name",
        "evaluation": "pip install tool-name",
        "model-hubs": "# Truy cập trang web để download models",
        "mlops": "pip install tool-name",
        "llm-runtimes": "pip install tool-name",
        "notebooks": "pip install jupyter",
        "datasets": "# Download datasets từ trang chủ",
        "benchmarking": "pip install tool-name",
        "ide-plugins": "# Cài extension từ IDE marketplace",
        "editors": "# Tải từ trang chủ",
        "git-tools": "npm install -g tool-name",
        "terminals": "# Tải từ trang chủ hoặc Microsoft Store",
        "dev-infra": "npm install -g tool-name",
        "observability": "pip install tool-name",
        "windows-setup": "# Tải installer từ trang chủ",
        "package-managers": "# Tải installer từ trang chủ hoặc sử dụng winget",
        "ai-coding": "pip install tool-name",
        "multimodal": "pip install tool-name",
        "image-generation": "pip install tool-name",
        "utilities": "npm install tool-name",
        "dev-tools": "npm install tool-name",
        "comparisons": "# Truy cập trang web để sử dụng",
        "pages": "# Xem tài liệu để biết cách sử dụng",
    }
    
    install = install_commands.get(category, "# Xem tài liệu chính thức để biết cách cài đặt")
    
    usage = """# 1. Cài đặt và cấu hình theo tài liệu chính thức
# 2. Bắt đầu sử dụng

# Xem documentation để biết chi tiết usage examples"""
    
    tips = "**Documentation:** Luôn tham khảo tài liệu chính thức để biết thông tin mới nhất."
    
    links = [f"{display_name}|https://{tool_name}.com", f"GitHub|https://github.com/{tool_name}"]
    
    return {
        "overview": overview,
        "install": install,
        "usage": usage,
        "tips": tips,
        "links": links
    }

def process_file(file_path):
    """Process a single MDX file and add missing sections."""
    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    # Check which sections exist
    has_install = "## Cài đặt" in original
    has_usage = "## Sử dụng" in original
    
    if has_install and has_usage:
        return False  # Already complete
    
    # Extract frontmatter
    frontmatter_match = re.match(r'(---\n.*?\n---\n)', original, re.DOTALL)
    if not frontmatter_match:
        return False
    
    frontmatter = frontmatter_match.group(1)
    body = original[frontmatter_match.end():]
    
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', frontmatter)
    category_match = re.search(r'category:\s*["\']([^"\']+)["\']', frontmatter)
    
    if not title_match or not category_match:
        return False
    
    title = title_match.group(1)
    category = category_match.group(1)
    tool_name = Path(file_path).parent.name
    
    if tool_name in TOOL_DB:
        generated = TOOL_DB[tool_name]
    else:
        generated = generate_generic_content(tool_name, category)
    
    # Build new body from scratch with correct order
    new_sections = []
    
    # 1. Tổng quan
    new_sections.append("## Tổng quan\n\n<Note type=\"info\">\n**" + title + "** " + generated['overview'] + "\n</Note>\n")
    
    # 2. Cài đặt
    new_sections.append("## Cài đặt\n\n<CodeBlock language=\"powershell\" code={`" + generated['install'] + "`} />\n")
    
    # 3. Sử dụng
    new_sections.append("## Sử dụng\n\n<CodeBlock language=\"powershell\" code={`" + generated['usage'] + "`} />\n")
    
    # 4. Tips
    new_sections.append("## Tips\n\n<Note type=\"tip\">\n" + generated['tips'] + "\n</Note>\n")
    
    # 5. Liên kết (keep existing or add new)
    has_links = "## Liên kết" in original
    if has_links:
        # Extract existing links
        links_match = re.search(r'## Liên kết\n(.*?)(?=\n##|\Z)', body, re.DOTALL)
        if links_match:
            existing_links = links_match.group(1).strip()
            new_sections.append("## Liên kết\n\n" + existing_links + "\n")
        else:
            links_md = "\n".join(["- [" + l.split("|")[0] + "](" + l.split("|")[1] + ")" for l in generated['links']])
            new_sections.append("## Liên kết\n\n" + links_md + "\n")
    else:
        links_md = "\n".join(["- [" + l.split("|")[0] + "](" + l.split("|")[1] + ")" for l in generated['links']])
        new_sections.append("## Liên kết\n\n" + links_md + "\n")
    
    # Combine
    new_body = "\n".join(new_sections)
    new_content = frontmatter + "\n" + new_body
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python content-filler.py <directory>")
        sys.exit(1)
    
    content_dir = Path(sys.argv[1])
    
    if not content_dir.exists():
        print(f"Directory not found: {content_dir}")
        sys.exit(1)
    
    processed = 0
    skipped = 0
    
    for mdx_file in sorted(content_dir.rglob("*.mdx")):
        result = process_file(mdx_file)
        if result:
            processed += 1
            print(f"[OK] Updated: {mdx_file.relative_to(content_dir)}")
        else:
            skipped += 1
    
    print(f"\nDone! Processed: {processed}, Skipped: {skipped}")

if __name__ == "__main__":
    main()
