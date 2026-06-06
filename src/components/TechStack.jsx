import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { techStack } from '../data/portfolio';

const SKILL_CATEGORIES = [
    { id: 'all', label: 'ALL SKILLS' },
    { id: 'languages', label: 'LANGUAGES' },
    { id: 'ml', label: 'ML & DEEP LEARNING' },
    { id: 'agents', label: 'AGENTS & ORCHESTRATION' },
    { id: 'data', label: 'DATA & STORAGE' }
];

// Mapping each tech stack item to its category
const SKILL_CATEGORY_MAP = {
    "Python": "languages",
    "Java": "languages",
    "SQL": "languages",
    "Git": "languages",
    "REST APIs": "languages",
    "Webhooks": "languages",

    "TensorFlow": "ml",
    "PyTorch": "ml",
    "OpenCV": "ml",
    "Keras": "ml",
    "Scikit-learn": "ml",
    "Transformers": "ml",
    "Diffusers": "ml",

    "OpenAI API": "agents",
    "Gemini API": "agents",
    "LangChain": "agents",
    "LangGraph": "agents",
    "n8n": "agents",
    "Streamlit": "agents",

    "Pinecone": "data",
    "GCP": "data",
    "Jupyter": "data",
    "MySQL": "data"
};

export default function TechStack() {
    const [activeCategory, setActiveCategory] = useState('all');

    const isHighlighted = (skill) => {
        if (activeCategory === 'all') return true;
        return SKILL_CATEGORY_MAP[skill] === activeCategory;
    };

    return (
        <section className="techstack-section reveal">
            <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '32px' }}>
                TECHNICAL SKILLS
            </h2>

            {/* Category tabs */}
            <div className="techstack-tabs">
                {SKILL_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        className={`tech-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Live scrolling marquee with active state highlighting */}
            <div className="marquee-strip-custom">
                <Marquee speed={35} gradient={false} pauseOnHover>
                    {techStack.map((t, i) => {
                        const highlighted = isHighlighted(t);
                        return (
                            <span
                                key={i}
                                className={`marquee-item-wrapper ${highlighted ? 'highlighted' : 'dimmed'}`}
                            >
                                <span className="marquee-item-name">{t}</span>
                                <span className="marquee-item-dot">·</span>
                            </span>
                        );
                    })}
                </Marquee>
            </div>

            {/* Static grid showing all chips, interactive glows on selection */}
            <div className="skills-chip-grid">
                {techStack.map((t, i) => {
                    const highlighted = isHighlighted(t);
                    const category = SKILL_CATEGORY_MAP[t] || 'other';
                    return (
                        <div
                            key={i}
                            className={`skill-chip ${highlighted ? 'active-glow' : 'inactive-dim'} cat-${category}`}
                        >
                            {t}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
