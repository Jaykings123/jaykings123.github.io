import { useState } from 'react';
import { FiArrowUpRight, FiLayers, FiGrid, FiChevronLeft, FiChevronRight, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { projects } from '../data/portfolio';

// Local STAR mapping for Jay's projects
const PROJECT_STAR_DETAILS = {
    "01": {
        situation: "Pucho.ai needed context-aware answers to user queries referencing a large repository of private knowledge bases and PDF documentation.",
        task: "Build a secure, scalable retrieval-augmented pipeline connecting raw documents to user chat interfaces with low latency.",
        action: "Designed an event-driven n8n workflow connecting document ingestion, chunking/embedding, Pinecone vector search, and Gemini/OpenAI prompts.",
        result: "Delivered context-accurate answers within 340ms, saving significant search time for engineers.",
        pipeline: ["User Prompt", "n8n Webhook", "Pinecone Match", "Context Loader", "Gemini API"]
    },
    "02": {
        situation: "Human-computer interfaces often require emotional awareness, but running large models on client machines leads to high CPU latency.",
        task: "Design and train a custom lightweight convolutional neural network (CNN) capable of real-time client-side classification.",
        action: "Trained a custom CNN on FER-2013, optimized the model weights in TensorFlow, and implemented an OpenCV video frame ingestion pipeline.",
        result: "Achieved 71% classification accuracy with an inference footprint of <40ms, rendering smoothly on web feeds.",
        pipeline: ["Camera Feed", "OpenCV Frame", "TensorFlow CNN", "Emotion Vector", "Overlay UI"]
    },
    "03": {
        situation: "Financial chart indicators (MACD, RSI) are complex and difficult for retail traders to interpret in real-time.",
        task: "Automate financial visual data processing and summarize technical configurations using Vision LLMs.",
        action: "Constructed an automated Telegram bot pipeline that routes user chart images, calls GPT-4 Vision, and formats insights.",
        result: "Provided instant trade analysis directly in chat with zero manual configuration.",
        pipeline: ["Chart Image", "Telegram Webhook", "GPT-4 Vision", "Technical Report", "Chat Notification"]
    },
    "04": {
        situation: "Asynchronous task orchestration across personal apps (reminders, scheduling, email) was fragmented.",
        task: "Create a voice-enabled autonomous agent capable of routing tasks and parsing complex instructions.",
        action: "Engineered Angie Assistant, utilizing Whisper API for speech-to-text, Gemini for intent routing, and n8n for triggering webhooks.",
        result: "Unified cross-platform scheduling and task logging under a single Telegram voice chat handle.",
        pipeline: ["Voice Command", "Whisper STT", "Gemini Router", "n8n Executor", "App Actions"]
    },
    "05": {
        situation: "Generating images via Stable Diffusion requires custom dependencies and differs heavily across GPU types (CUDA, Apple Silicon MPS).",
        task: "Build a cross-platform text-to-image application abstracting device-specific runtimes.",
        action: "Programmed a PyTorch backend using Hugging Face Diffusers, mapping tensor memory allocation to CUDA or MPS dynamically.",
        result: "Created an interactive Streamlit application with device-aware compile latency.",
        pipeline: ["Prompt Text", "Diffusers Loader", "MPS/CUDA Compile", "UNet Denoiser", "Image Render"]
    },
    "06": {
        situation: "Business intelligence analysts spent significant time writing Tally SQL queries for daily financial summaries.",
        task: "Automate SQL query formulation from natural language business inquiries.",
        action: "Engineered LLM system prompts equipped with SQL schemas, adding query validation steps to prevent destructive calls.",
        result: "Enabled instant reporting via natural-language text inputs, reducing average query time to under 1 second.",
        pipeline: ["User Ask", "LLM SQL Parser", "Safety Filter", "Relational Database", "Report JSON"]
    }
};

const CONFUSION_MATRIX = {
    labels: ["Happy", "Sad", "Angry", "Neutral"],
    matrix: [
        [425, 25, 15, 35],  // True: Happy. Pred: Happy, Sad, Angry, Neutral
        [28, 385, 42, 45],  // True: Sad
        [18, 55, 360, 27],  // True: Angry
        [32, 48, 22, 410]   // True: Neutral
    ]
};

export default function Work() {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'flow'
    const [current, setCurrent] = useState(0);
    const [expandedProject, setExpandedProject] = useState(null);
    const [selectedClassIndex, setSelectedClassIndex] = useState(0);

    const getMatrixMetrics = (idx) => {
        const tp = CONFUSION_MATRIX.matrix[idx][idx];
        const rowSum = CONFUSION_MATRIX.matrix[idx].reduce((a, b) => a + b, 0);
        let colSum = 0;
        for (let r = 0; r < 4; r++) {
            colSum += CONFUSION_MATRIX.matrix[r][idx];
        }
        const recall = tp / rowSum;
        const precision = tp / colSum;
        const f1 = 2 * (precision * recall) / (precision + recall);
        return {
            tp,
            precision: (precision * 100).toFixed(1),
            recall: (recall * 100).toFixed(1),
            f1: (f1 * 100).toFixed(1)
        };
    };

    const next = () => setCurrent((c) => (c + 1) % projects.length);
    const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);

    const activeProject = projects[current];
    const activeDetails = PROJECT_STAR_DETAILS[activeProject.num];

    return (
        <section id="work" className="work-section reveal">
            <div className="work-header">
                <h2 className="section-heading" style={{ marginBottom: 0 }}>MY WORK</h2>

                {/* View switcher */}
                <div className="view-switcher-tabs">
                    <button
                        className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <FiGrid /> CASE STUDIES
                    </button>
                    <button
                        className={`tab-btn ${viewMode === 'flow' ? 'active' : ''}`}
                        onClick={() => setViewMode('flow')}
                    >
                        <FiLayers /> ARCHITECTURE FLOWS
                    </button>
                </div>
            </div>

            {/* View 1: Bento Grid View */}
            {viewMode === 'grid' && (
                <div className="projects-bento-grid">
                    {projects.map((p) => {
                        const details = PROJECT_STAR_DETAILS[p.num];
                        const isExpanded = expandedProject === p.num;

                        return (
                            <div
                                key={p.num}
                                className={`project-bento-card glow-card ${isExpanded ? 'expanded' : ''}`}
                            >
                                <div className="card-topline">
                                    <span>PROJECT {p.num}</span>
                                    <span className="badge-outcome"><FiTrendingUp /> {p.outcome}</span>
                                </div>

                                <h3 className="project-title">{p.title}</h3>
                                <p className="project-category">{p.category}</p>
                                <p className="project-tools">{p.tools}</p>
                                <p className="project-desc">{p.description}</p>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <button
                                        className="btn-details-toggle"
                                        onClick={() => setExpandedProject(isExpanded ? null : p.num)}
                                    >
                                        {isExpanded ? "Hide Details" : "Show STAR Breakdown"}
                                    </button>
                                    {p.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-github-link"
                                        >
                                            Code <FiArrowUpRight />
                                        </a>
                                    ))}
                                </div>

                                {/* Expandable STAR methodology details */}
                                {isExpanded && (
                                    <div className="star-drawer">
                                        <div className="star-step">
                                            <span className="star-letter">S</span>
                                            <div>
                                                <strong>Situation:</strong>
                                                <p>{details.situation}</p>
                                            </div>
                                        </div>
                                        <div className="star-step">
                                            <span className="star-letter">T</span>
                                            <div>
                                                <strong>Task:</strong>
                                                <p>{details.task}</p>
                                            </div>
                                        </div>
                                        <div className="star-step">
                                            <span className="star-letter">A</span>
                                            <div>
                                                <strong>Action:</strong>
                                                <p>{details.action}</p>
                                            </div>
                                        </div>
                                        <div className="star-step">
                                            <span className="star-letter">R</span>
                                            <div>
                                                <strong>Result:</strong>
                                                <p>{details.result}</p>
                                            </div>
                                        </div>

                                        {/* Interactive Confusion Matrix for Facial Emotion Detection */}
                                        {p.num === '02' && (
                                            <div className="confusion-matrix-wrapper glow-card" style={{ marginTop: '24px', padding: '20px', border: '1px dashed var(--border-accent)', background: 'rgba(0,0,0,0.2)' }}>
                                                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '1px', marginBottom: '8px' }}>
                                                    MODEL PERFORMANCE EVALUATOR (CONFUSION MATRIX)
                                                </h4>
                                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                                    Click on any row label to calculate validation Precision, Recall, and F1 metrics dynamically.
                                                </p>

                                                <div className="confusion-matrix-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'center' }}>
                                                    {/* Heatmap Grid */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center', fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                                                            <span>Act \ Pred</span>
                                                            <span>Hap</span>
                                                            <span>Sad</span>
                                                            <span>Ang</span>
                                                            <span>Neu</span>
                                                        </div>
                                                        {CONFUSION_MATRIX.matrix.map((row, rIdx) => (
                                                            <div
                                                                key={rIdx}
                                                                style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', alignItems: 'center', cursor: 'pointer' }}
                                                                onClick={() => setSelectedClassIndex(rIdx)}
                                                            >
                                                                <span style={{ fontSize: '11px', fontWeight: selectedClassIndex === rIdx ? '600' : 'normal', color: selectedClassIndex === rIdx ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                                                                    {CONFUSION_MATRIX.labels[rIdx]}
                                                                </span>
                                                                {row.map((val, cIdx) => {
                                                                    const isTP = rIdx === cIdx;
                                                                    const isSelectedRow = selectedClassIndex === rIdx;
                                                                    return (
                                                                        <span
                                                                            key={cIdx}
                                                                            style={{
                                                                                padding: '8px 2px',
                                                                                textAlign: 'center',
                                                                                fontSize: '11px',
                                                                                fontFamily: 'var(--font-mono)',
                                                                                borderRadius: '4px',
                                                                                background: isTP
                                                                                    ? `rgba(0, 242, 254, ${isSelectedRow ? '0.25' : '0.12'})`
                                                                                    : `rgba(255, 255, 255, ${isSelectedRow ? '0.04' : '0.01'})`,
                                                                                border: isSelectedRow
                                                                                    ? '1px solid rgba(0, 242, 254, 0.4)'
                                                                                    : '1px solid transparent',
                                                                                color: isTP ? '#FFFFFF' : 'var(--text-secondary)'
                                                                            }}
                                                                        >
                                                                            {val}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Calculations Card */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                                                            METRIC SHEET: <span style={{ color: 'var(--accent)' }}>{CONFUSION_MATRIX.labels[selectedClassIndex].toUpperCase()}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                                            <span>Precision</span>
                                                            <strong style={{ color: '#00F2FE' }}>{getMatrixMetrics(selectedClassIndex).precision}%</strong>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                                            <span>Recall</span>
                                                            <strong style={{ color: 'var(--accent-warm)' }}>{getMatrixMetrics(selectedClassIndex).recall}%</strong>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                                            <span>F1-Score</span>
                                                            <strong style={{ color: '#10B981' }}>{getMatrixMetrics(selectedClassIndex).f1}%</strong>
                                                        </div>
                                                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', borderTop: '1px solid var(--border)', paddingTop: '4px', lineHeight: '1.3' }}>
                                                            TP: {getMatrixMetrics(selectedClassIndex).tp} / {CONFUSION_MATRIX.matrix[selectedClassIndex].reduce((a,b)=>a+b,0)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* View 2: Architecture Slider */}
            {viewMode === 'flow' && (
                <div className="work-carousel">
                    <div className="work-slide">
                        {/* Slide Details */}
                        <div className="slide-info">
                            <div className="slide-num">{activeProject.num}</div>
                            <h3 className="slide-title">{activeProject.title}</h3>
                            <p className="slide-category">{activeProject.category}</p>
                            <p className="slide-tools">{activeProject.tools}</p>
                            <p className="slide-desc">{activeProject.description}</p>

                            <div className="slide-outcome">
                                <strong>DEPLOYMENT SIGNAL</strong>
                                <p>{activeProject.outcome}</p>
                            </div>
                        </div>

                        {/* Slide Flow Visualizer */}
                        <div className="slide-image">
                            <div className="project-visual">
                                <div className="visual-header">
                                    <span>SYSTEM PATH {activeProject.num}</span>
                                    <span>{activeProject.category.split('/')[0].trim()}</span>
                                </div>

                                {/* Animated node flow */}
                                <div className="visual-network-flow">
                                    {activeDetails.pipeline.map((node, index) => (
                                        <div key={index} className="flow-step-container">
                                            <div className={`flow-step-node ${index === 0 ? 'input' : index === activeDetails.pipeline.length - 1 ? 'output' : 'middle'}`}>
                                                {node}
                                            </div>
                                            {index < activeDetails.pipeline.length - 1 && (
                                                <div className="flow-step-line">
                                                    <span className="glowing-flow-dot" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="visual-footer">
                                    {activeProject.tools.split('·').slice(0, 4).map((tool) => (
                                        <span key={tool}>{tool.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carousel navigation controls */}
                    <div className="carousel-nav">
                        <div style={{ display: 'flex', gap: 8 }}>
                            {projects.map((_, i) => (
                                <button
                                    key={i}
                                    className={`carousel-dot ${i === current ? 'active' : ''}`}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Go to project ${i + 1}`}
                                />
                            ))}
                        </div>
                        <div className="carousel-arrows">
                            <button className="carousel-arrow" onClick={prev} aria-label="Previous">
                                <FiChevronLeft />
                            </button>
                            <button className="carousel-arrow" onClick={next} aria-label="Next">
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
