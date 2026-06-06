import { FiFileText, FiGithub } from 'react-icons/fi';
import { research } from '../data/portfolio';

export default function Research() {
    return (
        <section className="reveal">
            <h2 className="section-heading">RESEARCH &amp; PUBLICATIONS</h2>
            <div className="research-cards">
                {research.map((paper, i) => (
                    <div className={`research-card ${paper.featured ? 'featured' : ''}`} key={i}>
                        <div>
                            <p className="card-label">
                                {paper.featured ? 'FEATURED PAPER' : 'RESEARCH PAPER'}
                            </p>
                            <h3 className="card-title">{paper.title}</h3>
                            <p className="card-desc">{paper.description}</p>
                        </div>
                        <div className="card-links">
                            <a
                                href={paper.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`research-link ${paper.featured ? '' : 'secondary'}`}
                            >
                                <FiFileText /> Read Paper
                            </a>
                            {paper.githubUrl && (
                                <a
                                    href={paper.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="research-link secondary"
                                >
                                    <FiGithub /> View Code
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
