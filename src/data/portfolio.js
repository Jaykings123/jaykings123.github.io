export const personalInfo = {
    name: "Jay Viramgami",
    title: "AI/ML Engineer",
    phone: "+91 816 091 7553",
    location: "Ahmedabad, India",
    email: "viramgamijay@gmail.com",
    website: "jayviramgami.site",
    resumeUrl: "/files/Jay_Viramgami_AI_ML_Resume_2026.pdf",
    social: {
        github: "https://github.com/Jaykings123",
        linkedin: "https://linkedin.com/in/jay-viramgami",
        twitter: "https://x.com/jayviramgami075",
    },
};

export const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Career", href: "#career" },
    { label: "Contact", href: "#contact" },
];

export const aboutText = {
    heading: "ABOUT ME",
    statement:
        "AI/ML Engineer building production automation, RAG systems, and deep learning applications.",
    description:
        "I am graduating from LD College of Engineering in 2026 with hands-on experience across AI automation, ML deployment, NLP research, and workflow integrations. I like turning messy business workflows into reliable systems powered by models, APIs, and clean engineering.",
};

export const heroProof = [
    { value: "3", label: "AI internships" },
    { value: "60%", label: "manual time reduced" },
    { value: "10+", label: "NLP models implemented" },
    { value: "8.35", label: "CGPA in AI & ML" },
];

export const whatIDo = [
    {
        title: "PRODUCTION AI AUTOMATION",
        subtitle: "Agentic workflows, APIs, and deployment-ready systems",
        description:
            "I design event-driven automations with LLM APIs, REST integrations, webhooks, and workflow orchestration for real business use cases.",
        tags: ["n8n", "OpenAI", "Gemini", "REST APIs", "Webhooks"],
    },
    {
        title: "RAG & NLP SYSTEMS",
        subtitle: "Context-aware assistants and research pipelines",
        description:
            "I build retrieval pipelines, summarization systems, embeddings workflows, and chatbot architectures that connect knowledge to useful answers.",
        tags: ["RAG", "Pinecone", "LangChain", "Transformers", "Summarization"],
    },
    {
        title: "DEEP LEARNING & CV",
        subtitle: "Models that move from notebook to product",
        description:
            "I work across CNNs, computer vision, model evaluation, and deployment pipelines with a focus on measurable latency and accuracy.",
        tags: ["TensorFlow", "PyTorch", "OpenCV", "Keras", "MLOps"],
    },
];

export const career = [
    {
        year: "2026",
        title: "AI Automation Intern",
        company: "Pucho.ai",
        description:
            "Engineered AI automation workflows, built RAG pipelines with OpenAI and Google Gemini, designed Tally SQL automation, and reduced manual processing time by 60%.",
    },
    {
        year: "2026",
        title: "AI/ML Intern",
        company: "Intelivita Private Limited",
        description:
            "Developed production ML models, built training-to-deployment pipelines, versioned models through REST API integrations, and improved prediction quality with feature engineering.",
    },
    {
        year: "2025",
        title: "AI/ML Research Intern",
        company: "Suvidha Foundation",
        description:
            "Implemented 10+ NLP models including PRIMERA, BART, PEGASUS, T5, and Longformer for multi-document summarization. Fine-tuned TG-MultiSum and Absformer with ROUGE evaluation.",
    },
    {
        year: "2026",
        title: "B.E. in AI & ML",
        company: "LD College of Engineering",
        description:
            "B.E. in Artificial Intelligence and Machine Learning. CGPA: 8.35/10.0. Coursework includes Deep Learning, Neural Networks, Computer Vision, DBMS, and DSA.",
    },
];

export const certifications = [
    {
        issuer: "Coursera - DeepLearning.AI",
        title: "Deep Learning Specialization",
        description:
            "Mastered CNNs, RNNs, & Transformers. Achieved 95%+ accuracy on benchmarks.",
    },
    {
        issuer: "Coursera - Andrew Ng",
        title: "Advanced Learning Algorithms",
        description:
            "Supervised/Unsupervised algorithms, Hyperparameter tuning & Model selection.",
    },
    {
        issuer: "Microsoft",
        title: "AI with Python",
        description:
            "Foundational Python for ML & Real-world AI project implementation.",
    },
];

export const projects = [
    {
        num: "01",
        title: "RAG Pipeline & Intelligent Chatbot",
        category: "Production AI / Knowledge Retrieval",
        tools: "n8n · OpenAI API · Pinecone · LangChain",
        description:
            "Production chatbot for context-aware real-time Q&A using retrieval, embeddings, vector search, and automation workflows.",
        outcome: "Context-aware answers from private knowledge",
        links: [],
    },
    {
        num: "02",
        title: "Facial Emotion Detection",
        category: "Computer Vision / Deep Learning",
        tools: "Python · TensorFlow · Keras · OpenCV",
        description:
            "Custom CNN trained on FER-2013 for real-time facial emotion recognition with optimized inference.",
        outcome: "71% accuracy and <40ms inference latency",
        links: [{ label: "GitHub", href: "https://github.com/Jaykings123" }],
    },
    {
        num: "03",
        title: "Stock Analysis Assistant",
        category: "Vision LLM / Financial Automation",
        tools: "Telegram API · Claude AI · GPT-4 Vision · n8n",
        description:
            "Automated chart analysis pipeline that reads stock visuals, generates insights, and delivers responses through Telegram.",
        outcome: "Real-time AI analysis delivered in chat",
        links: [],
    },
    {
        num: "04",
        title: "Angie Personal AI Assistant",
        category: "Voice AI / Workflow Automation",
        tools: "Telegram API · OpenAI API · Gemini · n8n",
        description:
            "Voice and text assistant with NLP, intelligent reminders, task management, and multi-platform workflow automation.",
        outcome: "Personal assistant experience inside Telegram",
        links: [],
    },
    {
        num: "05",
        title: "Stable Diffusion Image App",
        category: "Generative AI / Applied ML",
        tools: "PyTorch · Streamlit · Hugging Face Diffusers",
        description:
            "Text-to-image generation app with cross-platform support for CPU, CUDA, and Apple Silicon MPS.",
        outcome: "Interactive generative AI app with device-aware runtime",
        links: [{ label: "GitHub", href: "https://github.com/Jaykings123" }],
    },
    {
        num: "06",
        title: "Tally SQL Automation",
        category: "AI Automation / Data Systems",
        tools: "LLMs · SQL · REST APIs · Webhooks",
        description:
            "AI-assisted query generation and automated financial data processing workflow built during production automation work.",
        outcome: "Faster business reporting through natural-language queries",
        links: [],
    },
];

export const research = [
    {
        featured: true,
        title:
            "DocMatchNet-JEPA: Multi-Document Summarization via Joint-Embedding Predictive Architecture",
        description:
            "A novel approach to multi-document summarization using Joint-Embedding Predictive Architecture for improved coherence and factual accuracy across large document sets.",
        pdfUrl: "/files/docmatchnet_jepa.pdf",
        githubUrl:
            "https://github.com/Jaykings123/DocMatchNet-Research/tree/Train_branch-2",
    },
    {
        featured: false,
        title: "AI's Influence on Human Cognition",
        description:
            "An exploration of how artificial intelligence systems are reshaping human cognitive processes, decision-making patterns, and the broader implications for society.",
        pdfUrl: "/files/AIs_Influence_On_Human_Cognition.pdf",
        githubUrl: null,
    },
];

export const techStack = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "Hugging Face",
    "OpenAI API",
    "Gemini API",
    "LangChain",
    "LangGraph",
    "n8n",
    "Keras",
    "Scikit-learn",
    "Transformers",
    "Pinecone",
    "Diffusers",
    "Streamlit",
    "REST APIs",
    "Webhooks",
    "GCP",
    "Java",
    "SQL",
    "Git",
    "Jupyter",
    "MySQL",
];
