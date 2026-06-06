import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMouseMove = (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25 });
        };

        const onMouseEnter = () => {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        };

        const onMouseLeave = () => {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        };

        window.addEventListener('mousemove', onMouseMove);

        const interactives = document.querySelectorAll('a, button, .whatido-card, .carousel-arrow, .carousel-dot');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </>
    );
}
