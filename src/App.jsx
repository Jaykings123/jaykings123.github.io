import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loading from './components/Loading';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Landing from './components/Landing';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Career from './components/Career';
import Work from './components/Work';
import TechStack from './components/TechStack';
import Research from './components/Research';
import Contact from './components/Contact';
import AIAgentBot from './components/AIAgentBot';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);

  const onLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Global mouse position tracker for CSS border glow effects
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    // Animate all .reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    });

    // Refresh ScrollTrigger after everything is rendered
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loading]);

  return (
    <>
      {loading && <Loading onComplete={onLoadComplete} />}
      <Cursor />
      <Navbar />
      <SocialSidebar />
      <main>
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStack />
        <Research />
        <Contact />
      </main>
      <AIAgentBot />
    </>
  );
}
