import { personalInfo } from '../data/portfolio';
import { FiMail, FiMapPin, FiBookOpen, FiShare2, FiFileText } from 'react-icons/fi';

export default function Contact() {
    return (
        <>
            <section id="contact" className="contact-section reveal">
                <h2 className="section-heading">CONTACT</h2>

                <div className="contact-grid-custom">
                    {/* Card 1: Email */}
                    <div className="contact-card-item glow-card">
                        <div className="card-icon"><FiMail /></div>
                        <p className="col-label">EMAIL</p>
                        <a href={`mailto:${personalInfo.email}`} className="col-value">
                            {personalInfo.email}
                        </a>
                    </div>

                    {/* Card 2: Education */}
                    <div className="contact-card-item glow-card">
                        <div className="card-icon"><FiBookOpen /></div>
                        <p className="col-label">EDUCATION</p>
                        <p className="col-value">B.E. AI &amp; ML · CGPA 8.35</p>
                    </div>

                    {/* Card 3: Location */}
                    <div className="contact-card-item glow-card">
                        <div className="card-icon"><FiMapPin /></div>
                        <p className="col-label">LOCATION</p>
                        <p className="col-value">{personalInfo.location}</p>
                    </div>

                    {/* Card 4: Socials */}
                    <div className="contact-card-item glow-card">
                        <div className="card-icon"><FiShare2 /></div>
                        <p className="col-label">SOCIAL LINKS</p>
                        <div className="social-links-custom">
                            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
                                Github
                            </a>
                            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                        </div>
                    </div>

                    {/* Card 5: Resume */}
                    <div className="contact-card-item glow-card">
                        <div className="card-icon"><FiFileText /></div>
                        <p className="col-label">RESUME</p>
                        <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="col-value download-link">
                            Download latest PDF
                        </a>
                    </div>
                </div>
            </section>

            <footer className="footer-custom">
                <p className="credit">
                    Designed and Developed by{' '}
                    <a href="#home">Jay Viramgami</a>
                </p>
                <p>&copy; 2026 · AI Engineer Portfolio</p>
            </footer>
        </>
    );
}
