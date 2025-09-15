// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Background Music Controls
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isMusicPlaying = false;

// Auto-play music when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set music to loop
    backgroundMusic.loop = true;
    
    // Try to play music automatically
    const playMusic = () => {
        // Unmute the audio first
        backgroundMusic.muted = false;
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.textContent = '🔇 Stop Music';
        }).catch(e => {
            console.log('Autoplay prevented:', e);
            musicToggle.textContent = '🎵 Play Music';
            isMusicPlaying = false;
        });
    };
    
    // Try to play immediately
    playMusic();
    
    // If autoplay fails, try again after user interaction
    document.addEventListener('click', () => {
        if (!isMusicPlaying) {
            playMusic();
        }
    }, { once: true });
});

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '🎵 Play Music';
        isMusicPlaying = false;
    } else {
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(e => {
            console.log('Autoplay prevented:', e);
            musicToggle.textContent = '🎵 Music Unavailable';
        });
        musicToggle.textContent = '🔇 Stop Music';
        isMusicPlaying = true;
    }
});

// Parallax scrolling effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fact-card, .story-paragraph, .achievement');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Glowing cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor-glow';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(233, 30, 99, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor-glow');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.fact-card, .cta-button, .nav-link, .ability-list li, .gallery-item, .character-frame, .ability-tag');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Hero button functionality
document.addEventListener('DOMContentLoaded', () => {
    const primaryButton = document.querySelector('.cta-button.primary');
    const secondaryButton = document.querySelector('.cta-button.secondary');
    
    if (primaryButton) {
        primaryButton.addEventListener('click', () => {
            // Scroll to facts section
            const factsSection = document.querySelector('#facts');
            if (factsSection) {
                factsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Secondary button now links directly to YouTube trailer
    // No JavaScript needed - the link will work naturally
});

// Gallery lightbox functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-image');
            const overlay = item.querySelector('.gallery-overlay h3');
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                border: 3px solid #e91e63;
                box-shadow: 0 20px 60px rgba(233, 30, 99, 0.5);
            `;
            
            const lightboxTitle = document.createElement('h3');
            lightboxTitle.textContent = overlay.textContent;
            lightboxTitle.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: #e91e63;
                text-shadow: 0 0 20px #e91e63;
                font-size: 2rem;
                margin: 0;
            `;
            
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(lightboxTitle);
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
            
            // Close lightbox on escape key
            const closeLightbox = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(lightbox);
                    document.removeEventListener('keydown', closeLightbox);
                }
            };
            document.addEventListener('keydown', closeLightbox);
        });
    });
});

// Dynamic particle system
function createParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #8a2be2;
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        particleContainer.appendChild(particle);
    }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Add silk thread animations
function createSilkThreads() {
    const silkContainer = document.querySelector('.silk-threads');
    if (!silkContainer) return;
    
    for (let i = 0; i < 10; i++) {
        const thread = document.createElement('div');
        thread.className = 'silk-thread';
        thread.style.cssText = `
            position: absolute;
            width: 1px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, #8a2be2, transparent);
            left: ${Math.random() * 100}%;
            top: -100px;
            animation: silk-fall ${Math.random() * 10 + 15}s linear infinite;
            opacity: ${Math.random() * 0.3 + 0.1};
        `;
        silkContainer.appendChild(thread);
    }
}

// Initialize silk threads
document.addEventListener('DOMContentLoaded', createSilkThreads);

// Add CSS for silk thread animation
const style = document.createElement('style');
style.textContent = `
    @keyframes silk-fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        box-shadow: 0 0 10px #e91e63;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        // Toggle music with spacebar
        musicToggle.click();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16);

window.addEventListener('scroll', throttledScroll);

// Add glow effect to active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #e91e63 !important;
        text-shadow: 0 0 10px #e91e63 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Mini Game - Silk Thread Challenge
class SilkThreadGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Game state
        this.score = 0;
        this.combo = 0;
        this.lives = 3;
        this.gameSpeed = 2;
        
        // Player (Hornet)
        this.player = {
            x: this.canvas.width / 2 - 20,
            y: this.canvas.height - 60,
            width: 40,
            height: 50,
            speed: 5
        };
        
        // Threads array
        this.threads = [];
        this.threadSpawnRate = 0.02;
        
        // Load Hornet image
        this.hornetImage = new Image();
        this.hornetImage.src = 'Images/main character.png';
        this.imageLoaded = false;
        
        this.hornetImage.onload = () => {
            this.imageLoaded = true;
        };
        
        // Mouse tracking
        this.mouseX = this.player.x;
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left - this.player.width / 2;
        });
        
        // Game controls
        this.setupControls();
        
        // Start game loop
        this.gameLoop();
    }
    
    setupControls() {
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pauseGame').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('resetGame').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        document.getElementById('gameOverlay').classList.add('hidden');
        document.getElementById('startGame').disabled = true;
        document.getElementById('pauseGame').disabled = false;
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        document.getElementById('pauseGame').textContent = this.gamePaused ? 'Resume' : 'Pause';
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.combo = 0;
        this.lives = 3;
        this.threads = [];
        this.gameSpeed = 2;
        this.player.x = this.canvas.width / 2 - 20;
        
        document.getElementById('gameOverlay').classList.remove('hidden');
        document.getElementById('startGame').disabled = false;
        document.getElementById('pauseGame').disabled = true;
        document.getElementById('pauseGame').textContent = 'Pause';
        
        this.updateUI();
    }
    
    spawnThread() {
        if (Math.random() < this.threadSpawnRate) {
            const isGoodThread = Math.random() < 0.7; // 70% chance for good thread
            this.threads.push({
                x: Math.random() * (this.canvas.width - 10),
                y: -10,
                width: 8,
                height: 20,
                speed: this.gameSpeed + Math.random() * 2,
                isGood: isGoodThread,
                color: isGoodThread ? '#e91e63' : '#333'
            });
        }
    }
    
    updatePlayer() {
        // Smooth player movement towards mouse
        const targetX = Math.max(0, Math.min(this.mouseX, this.canvas.width - this.player.width));
        this.player.x += (targetX - this.player.x) * 0.1;
    }
    
    updateThreads() {
        for (let i = this.threads.length - 1; i >= 0; i--) {
            const thread = this.threads[i];
            thread.y += thread.speed;
            
            // Check collision with player
            if (this.checkCollision(this.player, thread)) {
                if (thread.isGood) {
                    this.score += 10 + this.combo * 2;
                    this.combo++;
                    this.gameSpeed += 0.01;
                } else {
                    this.combo = 0;
                    this.lives--;
                    if (this.lives <= 0) {
                        this.gameOver();
                        return;
                    }
                }
                this.threads.splice(i, 1);
                this.updateUI();
            } else if (thread.y > this.canvas.height) {
                this.threads.splice(i, 1);
            }
        }
    }
    
    checkCollision(player, thread) {
        return player.x < thread.x + thread.width &&
               player.x + player.width > thread.x &&
               player.y < thread.y + thread.height &&
               player.y + player.height > thread.y;
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('combo').textContent = this.combo;
        document.getElementById('lives').textContent = this.lives;
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('gameOverlay').classList.remove('hidden');
        document.getElementById('gameOverlay').innerHTML = `
            <div class="overlay-content">
                <h3>Game Over!</h3>
                <p>Final Score: ${this.score}</p>
                <p>Best Combo: ${this.combo}</p>
                <p>Click "Reset" to play again!</p>
            </div>
        `;
        document.getElementById('startGame').disabled = false;
        document.getElementById('pauseGame').disabled = true;
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background particles
        this.drawParticles();
        
        // Draw threads
        this.threads.forEach(thread => {
            this.ctx.fillStyle = thread.color;
            this.ctx.fillRect(thread.x, thread.y, thread.width, thread.height);
            
            // Add glow effect for good threads
            if (thread.isGood) {
                this.ctx.shadowColor = thread.color;
                this.ctx.shadowBlur = 10;
                this.ctx.fillRect(thread.x, thread.y, thread.width, thread.height);
                this.ctx.shadowBlur = 0;
            }
        });
        
        // Draw player (Hornet)
        this.drawPlayer();
        
        // Draw UI elements
        this.drawUI();
    }
    
    drawParticles() {
        for (let i = 0; i < 20; i++) {
            const x = (i * 50) % this.canvas.width;
            const y = (Date.now() * 0.01 + i * 30) % this.canvas.height;
            this.ctx.fillStyle = `rgba(233, 30, 99, ${0.1 + Math.sin(Date.now() * 0.001 + i) * 0.1})`;
            this.ctx.fillRect(x, y, 2, 2);
        }
    }
    
    drawPlayer() {
        if (this.imageLoaded) {
            // Draw Hornet image with glow effect
            this.ctx.shadowColor = '#e91e63';
            this.ctx.shadowBlur = 20;
            this.ctx.drawImage(
                this.hornetImage, 
                this.player.x, 
                this.player.y, 
                this.player.width, 
                this.player.height
            );
            this.ctx.shadowBlur = 0;
        } else {
            // Fallback: Draw simple character while image loads
            this.ctx.fillStyle = '#e91e63';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            
            // Add glow effect
            this.ctx.shadowColor = '#e91e63';
            this.ctx.shadowBlur = 15;
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            this.ctx.shadowBlur = 0;
            
            // Draw simple face
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(this.player.x + 8, this.player.y + 8, 4, 4); // Left eye
            this.ctx.fillRect(this.player.x + 18, this.player.y + 8, 4, 4); // Right eye
        }
    }
    
    drawUI() {
        // Draw score and combo in top corners
        this.ctx.fillStyle = '#e91e63';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 25);
        this.ctx.fillText(`Combo: ${this.combo}`, 10, 45);
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 80, 25);
    }
    
    gameLoop() {
        if (this.gameRunning && !this.gamePaused) {
            this.updatePlayer();
            this.spawnThread();
            this.updateThreads();
        }
        
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SilkThreadGame();
});
