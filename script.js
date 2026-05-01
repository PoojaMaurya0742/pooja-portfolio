// Custom Cursor with Trail Effect
cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

trail = document.createElement('div');
trail.className = 'cursor-trail';
document.body.appendChild(trail);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill-item, .stat').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Smooth scrolling for navigation links
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

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    }
});

// Animate elements on scroll with text reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            // Reset transform based on element type
            if (entry.target.classList.contains('skill-category')) {
                entry.target.style.transform = 'translateX(0) rotateY(0)';
            } else if (entry.target.classList.contains('honor-card')) {
                entry.target.style.transform = 'translateX(0) rotateY(0)';
            } else if (entry.target.classList.contains('cert-card')) {
                entry.target.style.transform = 'translateY(0) rotateX(0)';
            } else if (entry.target.classList.contains('stat')) {
                entry.target.style.transform = 'scale(1) translateY(0)';
            } else if (entry.target.classList.contains('project-card')) {
                entry.target.style.transform = 'translateY(0) scale(1)';
            } else {
                entry.target.style.transform = 'translateY(0)';
            }
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation with staggered delays and varied effects
document.querySelectorAll('.skill-category, .project-card, .stat, .resume-section, .section-title, .honor-card, .cert-card, .coursework-item').forEach((el, index) => {
    el.style.opacity = '0';
    
    // Varied entrance animations based on element type
    if (el.classList.contains('project-card')) {
        el.style.transform = 'translateY(60px) scale(0.9)';
        el.style.transition = 'opacity 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else if (el.classList.contains('skill-category')) {
        el.style.transform = 'translateX(-40px) rotateY(-15deg)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else if (el.classList.contains('stat')) {
        el.style.transform = 'scale(0.8) translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else if (el.classList.contains('honor-card')) {
        el.style.transform = 'translateX(50px) rotateY(10deg)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else if (el.classList.contains('cert-card')) {
        el.style.transform = 'translateY(40px) rotateX(10deg)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    } else {
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Add staggered delay based on sibling position
    const parent = el.parentElement;
    if (parent) {
        const siblings = Array.from(parent.children).filter(child => child !== el);
        const siblingIndex = Array.from(parent.children).indexOf(el);
        el.style.transitionDelay = (siblingIndex * 0.12) + 's';
    }
    
    observer.observe(el);
});

// Add animated section dividers
document.querySelectorAll('section').forEach(section => {
    if (section.id === 'home') return;
    const divider = document.createElement('div');
    divider.className = 'section-divider';
    section.appendChild(divider);
});

// Add floating particles to all sections
function createFloatingParticle(section) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    section.style.position = 'relative';
    section.appendChild(particle);
}

document.querySelectorAll('section').forEach(section => {
    if (section.id === 'home') return;
    for (let i = 0; i < 8; i++) {
        createFloatingParticle(section);
    }
});

// Card hover effects are initialized in initEnhancedHovers() below

// Multi-line typing effect for hero subtitle
const typedOutput = document.getElementById('typed-output');
const typingLines = [
    'IT Undergraduate | Full-Stack Developer',
    'AI Enthusiast | Problem Solver',
    'Building the Future with Code'
];
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentLine = typingLines[lineIndex];
    
    if (!isDeleting) {
        typedOutput.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60 + Math.random() * 40;
        
        if (charIndex === currentLine.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        }
    } else {
        typedOutput.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
        
        if (charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % typingLines.length;
            typingSpeed = 400; // Pause before new line
        }
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 800);
});

// Counter animation for stats
function animateCounters() {
    document.querySelectorAll('.stat h3').forEach(counter => {
        const target = counter.textContent;
        const num = parseInt(target);
        const suffix = target.replace(/[0-9]/g, '');
        let current = 0;
        const increment = Math.ceil(num / 40);
        const duration = 1500;
        const stepTime = duration / (num / increment);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                counter.textContent = num + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = current + suffix;
            }
        }, stepTime);
    });
}

// Observe about section to trigger counter animation
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    counterObserver.observe(aboutSection);
}

// Scroll parallax effect for section backgrounds
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.about, .skills, .projects, .resume, .honors, .contact');
            
            parallaxElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const speed = 0.3 + (index * 0.05);
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.style.backgroundPositionY = (scrolled * speed) + 'px';
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced hover effects with magnetic tilt for cards
function initEnhancedHovers() {
    // Project cards - 3D tilt + magnetic
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            const magnetX = (x - centerX) * 0.02;
            const magnetY = (y - centerY) * 0.02;
            
            card.style.transform = `translate(${magnetX}px, ${magnetY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Other cards - lift + magnetic
    document.querySelectorAll('.honor-card, .cert-card, .skill-category, .stat').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;
            const magnetX = x * 0.03;
            const magnetY = y * 0.03;
            
            card.style.transform = `translate(${magnetX}px, ${magnetY - 10}px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Initialize enhanced hover effects
window.addEventListener('load', initEnhancedHovers);

// Contact form submission via mail client
const contactForm = document.querySelector('#contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:pooja.devhub@gmail.com?subject=${subject}&body=${body}`;
});

// Scroll to top button with enhanced styling
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(45deg, #00d4ff, #00ff88);
    color: #121212;
    border: none;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    font-size: 1.2rem;
`;

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1) translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Three.js Particle Background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        particlesMesh.rotation.x += mouseY * 0.01;
        particlesMesh.rotation.y += mouseX * 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', initParticles);

// Preloader functionality
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});