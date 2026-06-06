import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Loading({ onComplete }) {
    const screenRef = useRef(null);
    const nameRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(screenRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete,
                });
            },
        });

        tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
            .to(barRef.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '+=0.2')
            .to(nameRef.current, { opacity: 0, y: -20, duration: 0.4 }, '-=0.3');
    }, [onComplete]);

    return (
        <div className="loading-screen" ref={screenRef}>
            <div className="name" ref={nameRef}>JV</div>
            <div className="bar-container">
                <div className="bar" ref={barRef}></div>
            </div>
        </div>
    );
}
