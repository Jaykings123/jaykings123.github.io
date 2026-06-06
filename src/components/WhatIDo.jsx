import { whatIDo } from '../data/portfolio';
import Playground from './Playground';

export default function WhatIDo() {
    return (
        <section className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            <div className="whatido-grid">
                <div className="whatido-heading">
                    <div className="line1">WHAT</div>
                    <div className="line2">I DO</div>
                </div>

                <div className="whatido-cards">
                    {whatIDo.map((item, i) => (
                        <div className="whatido-card" key={i}>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-subtitle">{item.subtitle}</p>
                            <p className="card-desc">{item.description}</p>
                            <div className="tags">
                                {item.tags.map((tag) => (
                                    <span className="tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Compiler and Playground */}
            <Playground />
        </section>
    );
}
