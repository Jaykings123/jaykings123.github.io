import { useEffect, useRef } from 'react';

class Particle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 1.2;
    }

    update(width, height, mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0 && distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                this.x += (dx / distance) * force * 0.5;
                this.y += (dy / distance) * force * 0.5;
            }
        }
    }
}

export default function NeuralNetworkCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const particles = [];
        const particleCount = Math.min(100, Math.floor((width * height) / 10000)); // Adaptive particle count
        const maxDistance = 110; // Connection distance limit
        const mouse = { x: null, y: null, radius: 180 };

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(width, height));
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw neural connections
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(width, height, mouse);
                ctx.beginPath();
                ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00F2FE';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        // Opacity fades as distance increases
                        const alpha = (maxDistance - distance) / maxDistance;
                        ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.15})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect mouse to nearby particles
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - particles[i].x;
                    const dy = mouse.y - particles[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const alpha = (mouse.radius - distance) / mouse.radius;
                        ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.18})`;
                        ctx.lineWidth = 1.0;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(particles[i].x, particles[i].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listeners
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            // Re-populate if resizing changes scale heavily
            particles.length = 0;
            const newCount = Math.min(100, Math.floor((width * height) / 10000));
            for (let i = 0; i < newCount; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }
        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.65
            }}
        />
    );
}
