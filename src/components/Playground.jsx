import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiRefreshCw, FiSliders, FiCpu, FiLayers, FiActivity, FiServer, FiCheckCircle, FiDatabase, FiSettings } from 'react-icons/fi';

// Simple hashing function for token IDs
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const MLOPS_MODELS = [
    {
        id: 'jepa',
        name: 'DocMatchNet-JEPA',
        registry: 'jayviramgami/docmatchnet-jepa:v1.0.0',
        status: 'Healthy',
        port: '8080',
        type: 'FastAPI + PyTorch Docker',
        baseLatency: 320,
        baseVram: 4.8
    },
    {
        id: 'emotion',
        name: 'FacialExpressionNet',
        registry: 'jayviramgami/emotion-detect:v2.1.0',
        status: 'Healthy',
        port: '8081',
        type: 'TFLite + OpenCV runtime',
        baseLatency: 38,
        baseVram: 0.8
    },
    {
        id: 'angie',
        name: 'Angie Voice Assistant Core',
        registry: 'jayviramgami/angie-core:v1.2.0',
        status: 'Idle',
        port: '5678',
        type: 'NodeJS + n8n webhook worker',
        baseLatency: 110,
        baseVram: 1.2
    }
];

export default function Playground() {
    const [mode, setMode] = useState('rag'); // 'rag', 'tune', 'tokenize', 'mlops'
    const [isRunning, setIsRunning] = useState(false);

    // RAG States
    const [ragConfig, setRagConfig] = useState({
        retriever: 'dense',
        vectordb: 'pinecone',
        llm: 'gemini'
    });
    const [ragStep, setRagStep] = useState(0); // 0: Idle, 1: Embed, 2: Fetch, 3: Rerank, 4: Prompt, 5: Done
    const [ragLog, setRagLog] = useState([]);

    // Fine-Tuning States
    const [tuneConfig, setTuneConfig] = useState({
        model: 'llama3',
        method: 'lora',
        dataset: 'codeqa'
    });
    const [epochs, setEpochs] = useState([]);
    const [currentEpoch, setCurrentEpoch] = useState(0);

    // Tokenizer States
    const [tokenizerText, setTokenizerText] = useState('AI automation reduces manual workflow time by 60 percent.');
    const [tokens, setTokens] = useState([]);
    const [tokenIds, setTokenIds] = useState([]);

    // MLOps Telemetry States
    const [activeModelId, setActiveModelId] = useState('jepa');
    const [activeModel, setActiveModel] = useState(MLOPS_MODELS[0]);
    const [latencyHistory, setLatencyHistory] = useState([320, 315, 324, 328, 318, 321, 335, 322, 319, 320]);
    const [requestsMin, setRequestsMin] = useState(48);
    const [gpuMemory, setGpuMemory] = useState(4.8);

    const canvasRef = useRef(null);
    const telemetryCanvasRef = useRef(null);

    // 1. Drawing Live Chart for Fine-Tuning
    useEffect(() => {
        if (mode !== 'tune' || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background grid
        ctx.strokeStyle = '#FFFFFF08';
        ctx.lineWidth = 1;
        const gridGap = 30;
        for (let x = 0; x < canvas.width; x += gridGap) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridGap) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.fillStyle = '#64748B';
        ctx.font = '10px monospace';
        ctx.fillText('Loss', 8, 15);
        ctx.fillText('Accuracy', canvas.width - 55, 15);
        ctx.fillText('Epochs', canvas.width / 2 - 20, canvas.height - 5);

        if (epochs.length > 1) {
            // Plot Loss (neon yellow/gold)
            ctx.strokeStyle = '#f7c873';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#f7c87340';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            epochs.forEach((e, i) => {
                const x = 30 + (i / 10) * (canvas.width - 60);
                const y = canvas.height - 30 - (e.loss * (canvas.height - 60));
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Plot Accuracy (neon cyan)
            ctx.strokeStyle = '#00F2FE';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = '#00F2FE40';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            epochs.forEach((e, i) => {
                const x = 30 + (i / 10) * (canvas.width - 60);
                const y = canvas.height - 30 - (e.acc * (canvas.height - 60));
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            ctx.shadowBlur = 0;
        }

        // Draw axes lines
        ctx.strokeStyle = '#FFFFFF15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, canvas.height - 25);
        ctx.lineTo(canvas.width - 20, canvas.height - 25);
        ctx.moveTo(30, 20);
        ctx.lineTo(30, canvas.height - 25);
        ctx.stroke();

    }, [epochs, mode]);

    // 2. Tokenizer Parse Logic
    useEffect(() => {
        if (mode !== 'tokenize') return;
        const words = tokenizerText.split(/(\s+)/);
        const parsedTokens = [];
        const parsedIds = [];

        words.forEach((w) => {
            if (!w || w.trim().length === 0) return;
            const cleanW = w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            if (!cleanW) return;

            // Simulating BPE Subwords split
            if (cleanW.length > 7 && cleanW.toLowerCase() !== 'viramgami') {
                const root = cleanW.slice(0, 4);
                const suffix = "##" + cleanW.slice(4);

                parsedTokens.push({ text: root, cat: Math.abs(hashString(root)) % 4 });
                parsedTokens.push({ text: suffix, cat: Math.abs(hashString(suffix)) % 4 });

                parsedIds.push(Math.abs(hashString(root)) % 12000);
                parsedIds.push(Math.abs(hashString(suffix)) % 12000);
            } else {
                parsedTokens.push({ text: cleanW, cat: Math.abs(hashString(cleanW)) % 4 });
                parsedIds.push(Math.abs(hashString(cleanW)) % 12000);
            }
        });

        setTokens(parsedTokens);
        setTokenIds(parsedIds);
    }, [tokenizerText, mode]);

    // 3. MLOps Telemetry Loop & Live Graphing
    useEffect(() => {
        const selected = MLOPS_MODELS.find(m => m.id === activeModelId) || MLOPS_MODELS[0];
        setActiveModel(selected);

        // Load initial history based on selected model
        const initHistory = Array.from({ length: 10 }).map(() =>
            selected.baseLatency + Math.floor((Math.random() - 0.5) * (selected.baseLatency * 0.1))
        );
        setLatencyHistory(initHistory);
        setRequestsMin(selected.id === 'angie' ? 12 : 55 + Math.floor(Math.random() * 20));
        setGpuMemory(selected.baseVram);

    }, [activeModelId]);

    // Fluctuate telemetry values
    useEffect(() => {
        if (mode !== 'mlops') return;

        const interval = setInterval(() => {
            setLatencyHistory(prev => {
                const nextVal = Math.max(1, activeModel.baseLatency + Math.floor((Math.random() - 0.5) * (activeModel.baseLatency * 0.12)));
                return [...prev.slice(1), nextVal];
            });
            setRequestsMin(prev => Math.max(0, prev + Math.floor((Math.random() - 0.5) * 8)));
            setGpuMemory(prev => Math.min(16, Math.max(0.1, +(prev + (Math.random() - 0.5) * 0.1).toFixed(2))));
        }, 1500);

        return () => clearInterval(interval);
    }, [mode, activeModel]);

    // Drawing Telemetry Live Graph
    useEffect(() => {
        if (mode !== 'mlops' || !telemetryCanvasRef.current) return;
        const canvas = telemetryCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background grid
        ctx.strokeStyle = '#FFFFFF08';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw Line Chart
        if (latencyHistory.length > 1) {
            ctx.strokeStyle = '#00F2FE';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#00F2FE35';
            ctx.shadowBlur = 6;
            ctx.beginPath();

            // Map values to canvas
            const maxVal = Math.max(...latencyHistory) * 1.1;
            const minVal = Math.min(...latencyHistory) * 0.9;
            const range = maxVal - minVal || 1;

            latencyHistory.forEach((val, i) => {
                const x = 30 + (i / 9) * (canvas.width - 50);
                const y = canvas.height - 25 - ((val - minVal) / range) * (canvas.height - 40);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw current latency metric value
            ctx.fillStyle = '#94A3B8';
            ctx.font = '10px monospace';
            ctx.fillText(`Max: ${maxVal.toFixed(0)}ms`, 10, 15);
            ctx.fillText(`Min: ${minVal.toFixed(0)}ms`, 10, canvas.height - 5);
        }

        // Axes
        ctx.strokeStyle = '#FFFFFF15';
        ctx.beginPath();
        ctx.moveTo(10, canvas.height - 20);
        ctx.lineTo(canvas.width - 10, canvas.height - 20);
        ctx.stroke();

    }, [latencyHistory, mode]);

    // RAG Pipeline Simulation Trigger
    const startRagPipeline = () => {
        if (isRunning) return;
        setIsRunning(true);
        setRagStep(1);
        setRagLog(['[SYSTEM] Initializing retriever request...']);

        const steps = [
            { text: 'Generating text embeddings via OpenAI Ada-002... Done.', delay: 800, step: 2 },
            { text: `Searching Vector Store (${ragConfig.vectordb}) for dense chunks... Done.`, delay: 1500, step: 3 },
            { text: `Applying hybrid weights and re-ranking matches... Done.`, delay: 2200, step: 4 },
            { text: `Constructing context prompt structure... Deployed to LLM.`, delay: 2900, step: 5 },
            { text: `[Gemini Output] Response parsed. Generation complete in 314ms.`, delay: 3800, step: 6 }
        ];

        steps.forEach((s) => {
            setTimeout(() => {
                setRagStep(s.step);
                setRagLog(prev => [...prev, s.text]);
                if (s.step === 6) {
                    setIsRunning(false);
                }
            }, s.delay);
        });
    };

    // Fine-Tuning Simulation Trigger
    const startFineTuning = () => {
        if (isRunning) return;
        setIsRunning(true);
        setEpochs([]);
        setCurrentEpoch(0);

        let epoch = 0;
        const totalEpochs = 10;

        const runEpoch = () => {
            if (epoch < totalEpochs) {
                const loss = Math.max(0.04, 0.9 / (epoch + 1) + (Math.random() - 0.5) * 0.05);
                const acc = Math.min(0.99, 0.72 + (epoch * 0.028) + (Math.random() - 0.5) * 0.02);

                setEpochs(prev => [...prev, { loss, acc }]);
                setCurrentEpoch(epoch + 1);
                epoch++;
                setTimeout(runEpoch, 600);
            } else {
                setIsRunning(false);
            }
        };

        runEpoch();
    };

    return (
        <div className="playground-container glow-card">
            {/* Control Panel Header */}
            <div className="playground-header">
                <div className="header-info">
                    <h3><FiSliders /> AI COMPILER &amp; PLAYGROUND</h3>
                    <p>Simulate production architectures and LoRA fine-tuning in real-time</p>
                </div>
                <div className="playground-toggles">
                    <button
                        className={`toggle-btn ${mode === 'rag' ? 'active' : ''}`}
                        onClick={() => { setMode('rag'); setIsRunning(false); }}
                    >
                        RAG PIPELINE
                    </button>
                    <button
                        className={`toggle-btn ${mode === 'tune' ? 'active' : ''}`}
                        onClick={() => { setMode('tune'); setIsRunning(false); }}
                    >
                        FINE-TUNING (LoRA)
                    </button>
                    <button
                        className={`toggle-btn ${mode === 'tokenize' ? 'active' : ''}`}
                        onClick={() => { setMode('tokenize'); setIsRunning(false); }}
                    >
                        TOKENIZER
                    </button>
                    <button
                        className={`toggle-btn ${mode === 'mlops' ? 'active' : ''}`}
                        onClick={() => { setMode('mlops'); setIsRunning(false); }}
                    >
                        MLOPS TELEMETRY
                    </button>
                </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="playground-body">
                {/* Mode 1: RAG Pipeline */}
                {mode === 'rag' && (
                    <div className="rag-workbench">
                        <div className="workbench-selectors">
                            <div className="selector-group">
                                <label>Retriever Model</label>
                                <select
                                    value={ragConfig.retriever}
                                    onChange={(e) => setRagConfig(prev => ({ ...prev, retriever: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="dense">Dense Semantic Retriever</option>
                                    <option value="hybrid">Hybrid Dense/Sparse</option>
                                    <option value="rerank">Cohere Rerank v3</option>
                                </select>
                            </div>

                            <div className="selector-group">
                                <label>Vector DB</label>
                                <select
                                    value={ragConfig.vectordb}
                                    onChange={(e) => setRagConfig(prev => ({ ...prev, vectordb: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="pinecone">Pinecone Vector Index</option>
                                    <option value="chroma">ChromaDB Local SQLite</option>
                                </select>
                            </div>

                            <div className="selector-group">
                                <label>Target LLM</label>
                                <select
                                    value={ragConfig.llm}
                                    onChange={(e) => setRagConfig(prev => ({ ...prev, llm: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="gemini">Google Gemini 1.5 Pro</option>
                                    <option value="gpt4">OpenAI GPT-4o</option>
                                    <option value="claude">Claude 3.5 Sonnet</option>
                                </select>
                            </div>

                            <button
                                className="run-playground-btn"
                                onClick={startRagPipeline}
                                disabled={isRunning}
                            >
                                <FiPlay /> {isRunning ? "RUNNING..." : "RUN PIPELINE"}
                            </button>
                        </div>

                        <div className="workbench-diagram">
                            <div className="flow-nodes">
                                <div className={`flow-node ${ragStep >= 1 ? 'active' : ''}`}>
                                    <span>Query input</span>
                                </div>
                                <div className={`flow-line ${ragStep >= 1 ? 'active pulse' : ''}`} />
                                <div className={`flow-node ${ragStep >= 2 ? 'active' : ''}`}>
                                    <span>Embeddings</span>
                                </div>
                                <div className={`flow-line ${ragStep >= 2 ? 'active pulse' : ''}`} />
                                <div className={`flow-node db-node ${ragStep >= 3 ? 'active' : ''}`}>
                                    <FiServer />
                                    <span>{ragConfig.vectordb.toUpperCase()}</span>
                                </div>
                                <div className={`flow-line ${ragStep >= 3 ? 'active pulse' : ''}`} />
                                <div className={`flow-node ${ragStep >= 4 ? 'active' : ''}`}>
                                    <span>Prompt Context</span>
                                </div>
                                <div className={`flow-line ${ragStep >= 4 ? 'active pulse' : ''}`} />
                                <div className={`flow-node llm-node ${ragStep >= 5 ? 'active' : ''}`}>
                                    <FiCpu />
                                    <span>{ragConfig.llm.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="diagram-logs">
                                <div className="logs-header">Execution logs</div>
                                <div className="logs-content">
                                    {ragLog.length === 0 && <span className="log-empty">Click "Run Pipeline" to visualize context augmented generation.</span>}
                                    {ragLog.map((log, i) => (
                                        <div key={i} className="log-entry">&gt; {log}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode 2: Fine-Tuning */}
                {mode === 'tune' && (
                    <div className="tune-workbench">
                        <div className="workbench-selectors">
                            <div className="selector-group">
                                <label>Base LLM</label>
                                <select
                                    value={tuneConfig.model}
                                    onChange={(e) => setTuneConfig(prev => ({ ...prev, model: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="llama3">Llama-3-8B-Instruct</option>
                                    <option value="mistral">Mistral-7B-v0.2</option>
                                </select>
                            </div>

                            <div className="selector-group">
                                <label>PEFT Method</label>
                                <select
                                    value={tuneConfig.method}
                                    onChange={(e) => setTuneConfig(prev => ({ ...prev, method: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="lora">LoRA (Rank = 8, Alpha = 16)</option>
                                    <option value="qlora">QLoRA (NF4 Quantized)</option>
                                    <option value="full">Full Parameter Fine-Tuning</option>
                                </select>
                            </div>

                            <div className="selector-group">
                                <label>Dataset</label>
                                <select
                                    value={tuneConfig.dataset}
                                    onChange={(e) => setTuneConfig(prev => ({ ...prev, dataset: e.target.value }))}
                                    disabled={isRunning}
                                >
                                    <option value="codeqa">Code-QA (5,000 instruct pairs)</option>
                                    <option value="math">Reasoning-Math (2,000 steps)</option>
                                </select>
                            </div>

                            <button
                                className="run-playground-btn"
                                onClick={startFineTuning}
                                disabled={isRunning}
                            >
                                <FiRefreshCw className={isRunning ? "spinning" : ""} /> {isRunning ? "TUNING..." : "START TUNING"}
                            </button>
                        </div>

                        <div className="tune-visuals">
                            <div className="chart-container">
                                <canvas
                                    ref={canvasRef}
                                    width={420}
                                    height={220}
                                    style={{ width: '100%', height: '100%', background: '#0F172440', borderRadius: '8px' }}
                                />
                            </div>

                            <div className="telemetry-panel">
                                <h4>TUNING STATUS</h4>
                                <div className="telemetry-grid">
                                    <div className="telemetry-box">
                                        <span className="label">EPOCH</span>
                                        <strong>{currentEpoch} / 10</strong>
                                    </div>
                                    <div className="telemetry-box">
                                        <span className="label">TRAINING LOSS</span>
                                        <strong className="text-glow-orange">
                                            {epochs.length > 0 ? epochs[epochs.length - 1].loss.toFixed(4) : "0.0000"}
                                        </strong>
                                    </div>
                                    <div className="telemetry-box">
                                        <span className="label">EVAL ACCURACY</span>
                                        <strong className="text-glow-cyan">
                                            {epochs.length > 0 ? `${(epochs[epochs.length - 1].acc * 100).toFixed(1)}%` : "0.0%"}
                                        </strong>
                                    </div>
                                    <div className="telemetry-box">
                                        <span className="label">TRAINABLE PARAMS</span>
                                        <span>{tuneConfig.method === 'lora' ? '12.4M (LoRA A/B)' : '8.03B (All)'}</span>
                                    </div>
                                </div>
                                <div className="adapters-viz">
                                    <div className="label">Adapter Weights Active Matrix A/B</div>
                                    <div className="matrix-blocks">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className={`matrix-pixel ${isRunning ? 'glowing' : ''}`}
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode 3: Tokenizer */}
                {mode === 'tokenize' && (
                    <div className="tokenize-workbench">
                        <div className="workbench-selectors">
                            <div className="selector-group" style={{ height: '100%' }}>
                                <label>Prompt Input</label>
                                <textarea
                                    className="tokenizer-textarea glow-card"
                                    value={tokenizerText}
                                    onChange={(e) => setTokenizerText(e.target.value)}
                                    placeholder="Type prompt here..."
                                    style={{
                                        width: '100%',
                                        height: '140px',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '6px',
                                        padding: '12px',
                                        color: '#FFFFFF',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                />
                            </div>
                            <div className="tokenizer-info-box">
                                <div className="info-badge">
                                    <span>Tokens</span>
                                    <strong>{tokens.length}</strong>
                                </div>
                                <div className="info-badge">
                                    <span>Bytes</span>
                                    <strong>{tokenizerText.length}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="tokenizer-result-panel">
                            {/* Color-coded Chip Array */}
                            <div className="tokenizer-visual-screen glow-card">
                                <div className="screen-header">Tokenized Segment Visualizer</div>
                                <div className="tokens-container">
                                    {tokens.map((t, i) => (
                                        <span
                                            key={i}
                                            className={`token-chip color-${t.cat}`}
                                            title={`BPE ID: ${tokenIds[i]}`}
                                        >
                                            {t.text}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* BPE Array */}
                            <div className="tokenizer-bpe-screen glow-card">
                                <div className="screen-header">Byte-Pair Encoding ID array</div>
                                <div className="bpe-ids-list">
                                    [ {tokenIds.join(', ')} ]
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mode 4: MLOps Telemetry */}
                {mode === 'mlops' && (
                    <div className="mlops-workbench">
                        {/* Registry Grid list */}
                        <div className="workbench-selectors" style={{ gap: '12px' }}>
                            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                                MODEL REGISTRY CONTAINER INDEX
                            </label>
                            {MLOPS_MODELS.map((model) => (
                                <div
                                    key={model.id}
                                    className={`mlops-model-item glow-card ${activeModelId === model.id ? 'active' : ''}`}
                                    onClick={() => setActiveModelId(model.id)}
                                    style={{
                                        padding: '16px',
                                        cursor: 'pointer',
                                        border: activeModelId === model.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                                        background: activeModelId === model.id ? 'rgba(0, 242, 254, 0.03)' : 'rgba(11,15,25,0.4)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '13.5px' }}>{model.name}</strong>
                                        <span className="telemetry-status-chip">
                                            <span className="status-dot green-pulse" /> {model.status}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                                        {model.registry}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Monitor stats and dynamic graph */}
                        <div className="mlops-monitor-panel">
                            {/* Analytics numbers */}
                            <div className="mlops-metrics-grid">
                                <div className="metric-box">
                                    <span>Requests Rate</span>
                                    <strong>{requestsMin} / min</strong>
                                </div>
                                <div className="metric-box">
                                    <span>VRAM Footprint</span>
                                    <strong>{gpuMemory.toFixed(2)} GB</strong>
                                </div>
                                <div className="metric-box">
                                    <span>Container Runtime</span>
                                    <strong>{activeModel.type}</strong>
                                </div>
                                <div className="metric-box">
                                    <span>Port Host</span>
                                    <strong>localhost:{activeModel.port}</strong>
                                </div>
                            </div>

                            {/* Canvas telemetry chart */}
                            <div className="telemetry-chart-wrapper glow-card" style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                                    <span>LIVE INFERENCE LATENCY TIMELINE (ms)</span>
                                    <span style={{ color: 'var(--accent)' }}>Active: {latencyHistory[latencyHistory.length - 1]}ms</span>
                                </div>
                                <div style={{ height: '140px' }}>
                                    <canvas
                                        ref={telemetryCanvasRef}
                                        width={440}
                                        height={140}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
