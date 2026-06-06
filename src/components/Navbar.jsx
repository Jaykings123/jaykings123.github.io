import { useState, useEffect, useCallback } from 'react';
import { navLinks, personalInfo } from '../data/portfolio';

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        setHidden(y > lastY && y > 100);
        setLastY(y);
    }, [lastY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <nav className={`navbar ${hidden ? 'hidden' : ''}`}>
                <a href="#home" className="logo">JV</a>
                <div className="nav-links">
                    {navLinks.map((l) => (
                        <a key={l.href} href={l.href}>{l.label}</a>
                    ))}
                </div>
                <a href={`mailto:${personalInfo.email}`} className="nav-email">
                    {personalInfo.email}
                </a>
                <button
                    className="menu-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            <div className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}>
                {navLinks.map((l) => (
                    <a key={l.href} href={l.href} onClick={closeMobile}>{l.label}</a>
                ))}
                <a href={`mailto:${personalInfo.email}`} onClick={closeMobile}>
                    {personalInfo.email}
                </a>
            </div>
        </>
    );
}
