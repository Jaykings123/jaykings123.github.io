// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
        const boxTop = element.getBoundingClientRect().top;
        if(boxTop < triggerBottom) {
            element.classList.add('active');
        }
    });
};

// Initial check
checkReveal();
window.addEventListener('scroll', checkReveal);

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Progress Bar
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// Parallax/Tilt Effect for Cards (Subtle)
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});