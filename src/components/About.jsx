import { useEffect, useState, useRef } from 'react';
import { aboutText } from '../data/portfolio';
import { FiClock, FiActivity, FiUser, FiAward } from 'react-icons/fi';

const LOG_TEMPLATES = [
    "Connected to Pinecone cluster (region: us-east-1)",
    "Indexing DocMatchNet paper... chunk size: 512, overlap: 64",
    "Loaded joint-embedding weights for JEPA encoder",
    "Embedding query: 'How does JEPA compare to autoregressive models?'",
    "Vector search completed in 18ms - found 4 matches",
    "Running ROUGE evaluation on summarized chunks",
    "Triggering n8n financial automation webhook",
    "System status: VRAM footprint stable, Core temp 44°C",
    "Compiling facial expression feature matrix",
    "Optimizing OpenCV video feed frame rate - average 40fps",
    "Synced stock chart visual analysis to Telegram bot API"
];

export default function About() {
    const [currentTime, setCurrentTime] = useState('');
    const [synapticLogs, setSynapticLogs] = useState([
        `[INFO] Initialized Jay's Synaptic Core...`,
        `[INFO] Connecting RAG nodes...`,
        `[SUCCESS] Online`
    ]);
    const logScrollRef = useRef(null);

    // Dynamic Clock
    useEffect(() => {
        const updateClock = () => {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(time);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Synaptic Log Appender
    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const randomLog = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
            const prefixes = ['[INFO]', '[DEBUG]', '[SUCCESS]', '[MONITOR]'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

            setSynapticLogs(prev => {
                const updated = [...prev, `[${time}] ${prefix} ${randomLog}`];
                // Keep last 15 logs
                return updated.slice(-15);
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Keep log scrolled to bottom
    useEffect(() => {
        if (logScrollRef.current) {
            logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
        }
    }, [synapticLogs]);

    return (
        <section id="about" className="about-section reveal">
            <h2 className="section-heading">ABOUT ME</h2>

            <div className="about-bento-grid">
                {/* 1. Portrait Card */}
                <div className="bento-card bento-photo glow-card">
                    <div className="photo-wrapper">
                        <img src="/images/profile.jpg" alt="Jay Viramgami Portrait" />
                        <div className="scanner-line" />
                    </div>
                    <div className="photo-info">
                        <h3>Jay Viramgami</h3>
                        <p>AI/ML Engineer</p>
                    </div>
                </div>

                {/* 2. Statement / Bio Card */}
                <div className="bento-card bento-bio glow-card">
                    <div className="card-header-icon">
                        <FiUser /> <span>MISSION PROFILE</span>
                    </div>
                    <p className="statement">{aboutText.statement}</p>
                    <p className="description">{aboutText.description}</p>

                    <div className="time-badge-container">
                        <div className="info-chip">
                            <FiClock /> <span>{currentTime || "Ahmedabad, IN"}</span>
                        </div>
                        <div className="info-chip pulse-container">
                            <span className="pulse-dot green" /> <span>Available for Roles</span>
                        </div>
                    </div>
                </div>

                {/* 3. Statistics Grid Card */}
                <div className="bento-card bento-stats glow-card">
                    <div className="card-header-icon">
                        <FiAward /> <span>PERFORMANCE METRICS</span>
                    </div>
                    <div className="bento-stats-grid">
                        <div className="bento-stat-box">
                            <strong>3</strong>
                            <span>Internships completed</span>
                        </div>
                        <div className="bento-stat-box">
                            <strong>60%</strong>
                            <span>Manual process reduction</span>
                        </div>
                        <div className="bento-stat-box">
                            <strong>10+</strong>
                            <span>NLP models deployed</span>
                        </div>
                        <div className="bento-stat-box">
                            <strong>8.35</strong>
                            <span>AI & ML CGPA</span>
                        </div>
                    </div>
                </div>

                {/* 4. Synaptic Action Logs */}
                <div className="bento-card bento-logs glow-card">
                    <div className="card-header-icon">
                        <FiActivity /> <span>SYNAPTIC CORE TELEMETRY</span>
                    </div>
                    <div className="synaptic-log-screen" ref={logScrollRef}>
                        {synapticLogs.map((log, i) => (
                            <div key={i} className="log-line">
                                <span className="log-arrow">&gt;</span> {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
