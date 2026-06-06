import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio';

export default function SocialSidebar() {
    return (
        <div className="social-sidebar">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
            </a>
            <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
            </a>
        </div>
    );
}
