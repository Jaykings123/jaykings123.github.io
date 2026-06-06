import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiInfo } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';

const PRESETS = [
    {
        q: "What is DocMatchNet-JEPA?",
        a: "DocMatchNet-JEPA is Jay's featured NLP research project. It is a multi-document summarization framework built using a Joint-Embedding Predictive Architecture (JEPA). It focuses on maintaining high semantic coherence and factual consistency across large document sets, solving hallucination problems common in autoregressive LLMs. You can view the paper code on GitHub!"
    },
    {
        q: "Tell me about his internships",
        a: "Jay has completed 3 internships: \n1. **Pucho.ai** (AI Automation Intern): Built RAG pipelines using Gemini/OpenAI, n8n workflows, and saved 60% manual time.\n2. **Intelivita** (AI/ML Intern): Engineered production pipelines and model hosting REST APIs.\n3. **Suvidha Foundation** (Research Intern): Evaluated 10+ NLP summarizers (BART, PEGASUS, T5)."
    },
    {
        q: "What RAG projects has he built?",
        a: "Jay has built several production-ready RAG architectures. His primary RAG pipeline uses n8n, OpenAI embeddings, and Pinecone vector databases to answer context-aware queries. He also built Angie, a voice-enabled personal assistant, and a visual Stock Analysis assistant using Claude and GPT-4 Vision."
    },
    {
        q: "How to contact Jay?",
        a: `You can reach Jay Viramgami at viramgamijay@gmail.com or call him at +91 816 091 7553. He is currently based in Ahmedabad, India, and is open to AI/ML Engineer roles starting in 2026. You can download his resume directly from the landing page.`
    }
];

export default function AIAgentBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: "Hi! I am Jay's AI Agent. Ask me anything about his research, RAG systems, or experience!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg = {
            sender: 'user',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate thinking and reply
        setTimeout(() => {
            let replyText = "";
            const cleanQuery = text.toLowerCase();

            // Find matching preset response or construct smart fallback
            const match = PRESETS.find(p => cleanQuery.includes(p.q.toLowerCase()) || p.q.toLowerCase().includes(cleanQuery));
            if (match) {
                replyText = match.a;
            } else if (cleanQuery.includes('resume') || cleanQuery.includes('cv')) {
                replyText = `Jay's resume is available for download at: ${personalInfo.resumeUrl}. You can click "Download Resume" in the hero section.`;
            } else if (cleanQuery.includes('skill') || cleanQuery.includes('tech') || cleanQuery.includes('stack')) {
                replyText = "Jay works primarily with Python, TensorFlow, PyTorch, LangChain, LangGraph, n8n vector databases (Pinecone), and LLM integrations (Gemini, Claude, GPT-4).";
            } else if (cleanQuery.includes('education') || cleanQuery.includes('college')) {
                replyText = "Jay is completing his Bachelor of Engineering in AI & ML from LD College of Engineering in 2026, maintaining a CGPA of 8.35/10.";
            } else {
                replyText = "I parsed your query. I recommend exploring Jay's internships at Pucho.ai, checking his DocMatchNet-JEPA research paper, or reviewing his RAG Pipeline in the portfolio playground below!";
            }

            const botMsg = {
                sender: 'bot',
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="ai-agent-container" style={{ position: 'fixed', right: '30px', bottom: '30px', zIndex: 9999 }}>
            {/* Bubble Button */}
            {!isOpen && (
                <button
                    className="ai-bubble-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Assistant"
                >
                    <FiMessageSquare className="chat-icon" />
                    <span className="pulse-indicator" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window glow-card">
                    <div className="chat-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="bot-avatar-glowing">
                                <FiCpu />
                            </div>
                            <div>
                                <h4>Jay's Core Agent</h4>
                                <span className="status-indicator">● Online</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">
                            <FiX />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message-bubble ${m.sender === 'user' ? 'user' : 'bot'}`}>
                                <div className="message-content">
                                    <p style={{ whiteSpace: 'pre-line' }}>{m.text}</p>
                                    <span className="timestamp">{m.timestamp}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-bubble bot">
                                <div className="message-content typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Presets Grid */}
                    <div className="chat-presets">
                        {PRESETS.map((p, i) => (
                            <button key={i} className="preset-chip" onClick={() => handleSend(p.q)}>
                                {p.q}
                            </button>
                        ))}
                    </div>

                    <form
                        className="chat-input-area"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(inputValue);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type a question..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" aria-label="Send message">
                            <FiSend />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
