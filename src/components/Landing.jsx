import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight, FiDownload, FiTerminal, FiCpu, FiDatabase, FiSettings } from 'react-icons/fi';
import { heroProof, personalInfo } from '../data/portfolio';
import NeuralNetworkCanvas from './NeuralNetworkCanvas';

export default function Landing() {
    const sectionRef = useRef(null);
    const terminalEndRef = useRef(null);
    const inputRef = useRef(null);

    const [terminalHistory, setTerminalHistory] = useState([
        { type: 'info', text: 'Jay OS v1.0.0 (Neural Command Center)' },
        { type: 'info', text: 'Type "help" to view available AI commands.' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [gpuLoad, setGpuLoad] = useState(88);
    const [vramUsage, setVramUsage] = useState(12.4);

    // Auto scroll terminal to bottom
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [terminalHistory]);

    // GSAP Entry animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-left .greeting', { opacity: 0, y: 20, duration: 0.6, delay: 1 });
            gsap.from('.hero-left .name', { opacity: 0, y: 40, duration: 0.8, delay: 1.2 });
            gsap.from('.hero-summary', { opacity: 0, y: 24, duration: 0.7, delay: 1.35 });
            gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.6, delay: 1.5 });
            gsap.from('.ai-console', { opacity: 0, scale: 0.94, duration: 0.9, delay: 1.3, ease: 'power2.out' });
            gsap.from('.proof-card', { opacity: 0, y: 18, duration: 0.5, delay: 1.6, stagger: 0.08 });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Simulated GPU status fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setGpuLoad(prev => Math.min(100, Math.max(75, +(prev + (Math.random() - 0.5) * 6).toFixed(0))));
            setVramUsage(prev => Math.min(16.0, Math.max(10.2, +(prev + (Math.random() - 0.5) * 0.4).toFixed(1))));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = inputValue.trim().toLowerCase();
        if (!cmd) return;

        let response = [];
        const newHistory = [...terminalHistory, { type: 'cmd', text: `jay@neural-core:~$ ${inputValue}` }];

        if (cmd === 'help') {
            response = [
                { type: 'output', text: 'Available commands:' },
                { type: 'output', text: '  about      - Display brief bio and focus areas.' },
                { type: 'output', text: '  projects   - List key AI/ML projects built.' },
                { type: 'output', text: '  train      - Trigger simulated LLM training epoch.' },
                { type: 'output', text: '  clear      - Clear the console screen.' }
            ];
        } else if (cmd === 'about') {
            response = [
                { type: 'output', text: 'Jay Viramgami | AI/ML Engineer' },
                { type: 'output', text: 'Graduating LD College of Engineering in 2026.' },
                { type: 'output', text: 'Specialist in Agentic Workflows, RAG pipelines, and NLP research.' },
                { type: 'output', text: 'Built automation workflows reducing manual work by 60%.' }
            ];
        } else if (cmd === 'projects') {
            response = [
                { type: 'output', text: 'Active Deployments:' },
                { type: 'output', text: '  1. DocMatchNet-JEPA - Multi-doc summarization research.' },
                { type: 'output', text: '  2. RAG Chatbot       - Enterprise Pinecone vector search.' },
                { type: 'output', text: '  3. Facial Emotion CV - Real-time emotion classification.' },
                { type: 'output', text: '  4. Stock Analysis    - GPT-4 Vision chart insights.' }
            ];
        } else if (cmd === 'train') {
            setTerminalHistory([...newHistory,
                { type: 'output', text: 'Initializing LLM Fine-Tuning pipeline...' },
                { type: 'output', text: 'Loading LoRA weights into adapter matrices...' }
            ]);
            setInputValue('');

            // Sequence simulated training epochs
            let currentEpoch = 1;
            const trainInterval = setInterval(() => {
                if (currentEpoch <= 5) {
                    const loss = (0.85 / currentEpoch + Math.random() * 0.05).toFixed(4);
                    const acc = (0.75 + (currentEpoch * 0.04) + Math.random() * 0.01).toFixed(3);
                    setTerminalHistory(prev => [
                        ...prev,
                        { type: 'output-accent', text: `Epoch ${currentEpoch}/5 - loss: ${loss} - acc: ${acc}` }
                    ]);
                    currentEpoch++;
                } else {
                    clearInterval(trainInterval);
                    setTerminalHistory(prev => [
                        ...prev,
                        { type: 'output', text: 'Training completed successfully.' },
                        { type: 'output', text: 'Saving checkpoint: model_best_weights.bin' }
                    ]);
                }
            }, 800);
            return;
        } else if (cmd === 'clear') {
            setTerminalHistory([]);
            setInputValue('');
            return;
        } else {
            response = [{ type: 'error', text: `Command not found: "${cmd}". Type "help" for a list of commands.` }];
        }

        setTerminalHistory([...newHistory, ...response]);
        setInputValue('');
    };

    return (
        <section id="home" className="hero" ref={sectionRef}>
            <NeuralNetworkCanvas />
            <div className="hero-inner">
                <div className="hero-left">
                    <p className="greeting">Hello! I'm</p>
                    <h1 className="name">JAY<br />VIRAMGAMI</h1>
                    <p className="hero-summary">
                        AI/ML Engineer building production automation, RAG pipelines,
                        NLP systems, and computer vision models that move from prototype
                        to deployed workflow.
                    </p>
                    <div className="hero-actions">
                        <a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-accent"
                        >
                            Download Resume <FiDownload />
                        </a>
                        <a href="#work" className="btn-outline">
                            View AI Work <FiArrowUpRight />
                        </a>
                    </div>
                </div>

                <div className="hero-right" aria-label="AI systems command center">
                    <div className="ai-console glow-card" onClick={focusInput}>
                        {/* Terminal Header */}
                        <div className="console-topbar">
                            <div className="terminal-dots">
                                <span className="dot dot-red" />
                                <span className="dot dot-yellow" />
                                <span className="dot dot-green" />
                            </div>
                            <div className="terminal-title">
                                <FiTerminal style={{ marginRight: '6px' }} /> terminal - sh
                            </div>
                            <div className="system-status">
                                <span className="status-dot green-pulse" /> CORE ACTIVE
                            </div>
                        </div>

                        {/* Terminal Workstation Split Layout */}
                        <div className="terminal-workspace">
                            {/* Left Console shell */}
                            <div className="terminal-shell">
                                <div className="terminal-log">
                                    {terminalHistory.map((line, index) => (
                                        <div key={index} className={`terminal-line ${line.type}`}>
                                            {line.text}
                                        </div>
                                    ))}
                                    <div ref={terminalEndRef} />
                                </div>
                                <form onSubmit={handleCommand} className="terminal-prompt-line">
                                    <span className="prompt-label">jay@neural-core:~$</span>
                                    <input
                                        type="text"
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="prompt-input"
                                        placeholder="Type command..."
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        spellCheck="false"
                                    />
                                </form>
                            </div>

                            {/* Right Status Sidebar */}
                            <div className="terminal-sidebar">
                                <div className="sidebar-group">
                                    <span className="sidebar-title"><FiCpu /> COMPUTATION</span>
                                    <div className="sidebar-stat">
                                        <div className="stat-label">GPU Load</div>
                                        <div className="stat-bar-container">
                                            <div className="stat-bar" style={{ width: `${gpuLoad}%` }}></div>
                                        </div>
                                        <div className="stat-value">{gpuLoad}%</div>
                                    </div>
                                    <div className="sidebar-stat">
                                        <div className="stat-label">VRAM Usage</div>
                                        <div className="stat-bar-container">
                                            <div className="stat-bar warm" style={{ width: `${(vramUsage / 16.0) * 100}%` }}></div>
                                        </div>
                                        <div className="stat-value">{vramUsage} / 16.0 GB</div>
                                    </div>
                                </div>

                                <div className="sidebar-group">
                                    <span className="sidebar-title"><FiDatabase /> STORAGE</span>
                                    <div className="sidebar-info-row">
                                        <span>Vector DB</span>
                                        <strong className="text-glow">Pinecone</strong>
                                    </div>
                                    <div className="sidebar-info-row">
                                        <span>Embeddings</span>
                                        <strong>Ada-002 / Text-3</strong>
                                    </div>
                                </div>

                                <div className="sidebar-group">
                                    <span className="sidebar-title"><FiSettings /> RUNTIME</span>
                                    <div className="sidebar-info-row">
                                        <span>Orchestrator</span>
                                        <strong className="text-glow-green">n8n active</strong>
                                    </div>
                                    <div className="sidebar-info-row">
                                        <span>Model Latency</span>
                                        <strong>34ms avg</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-proof">
                {heroProof.map((item) => (
                    <div className="proof-card glow-card" key={item.label}>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
