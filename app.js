// Planet Data
const planetData = {
    matrix: {
        title: "Matrix - Cyber Security Commands Generator",
        description: "Generate pentest commands instantly with an intuitive command generator"
    },
    linkedin: {
        title: "LinkedIn - Professional Profile",
        description: "Connect with me professionally and explore my career journey"
    },
    blog: {
        title: "Cyber Security Blog - Medium Articles",
        description: "Read my insights and articles on cybersecurity, pentesting, and technology"
    }
};

// Mouse Tracking
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initDustParticles();
    initAsteroids();
    initPlanetInteractions();
    initMouseParallax();
    initDraggablePlanets();
});

// Initialize Starfield
function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 400;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
            color: getStarColor(),
            layer: Math.floor(Math.random() * 3) // 0, 1, 2 for parallax layers
        };
        stars.push(star);
    }
    
    function getStarColor() {
        const rand = Math.random();
        if (rand < 0.7) return '#ffffff';
        if (rand < 0.85) return '#c7d8ff';
        return '#fff4e6';
    }
    
    // Create shooting stars
    const shootingStars = [];
    
    function createShootingStar() {
        if (Math.random() < 0.3) { // 30% chance
            shootingStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.3,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 8 + 4,
                angle: Math.random() * Math.PI / 4 + Math.PI / 6,
                opacity: 1
            });
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            // Twinkling effect
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
            
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity * twinkle;
            
            // Apply parallax offset based on layer
            const parallaxX = (targetX - canvas.width / 2) * (star.layer * 0.02);
            const parallaxY = (targetY - canvas.height / 2) * (star.layer * 0.02);
            
            ctx.beginPath();
            ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow for larger stars
            if (star.size > 1.5) {
                ctx.globalAlpha = star.opacity * twinkle * 0.3;
                ctx.beginPath();
                ctx.arc(star.x + parallaxX, star.y + parallaxY, star.size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Draw shooting stars
        shootingStars.forEach((star, index) => {
            const dx = Math.cos(star.angle) * star.speed;
            const dy = Math.sin(star.angle) * star.speed;
            
            star.x += dx;
            star.y += dy;
            star.opacity -= 0.01;
            
            if (star.opacity > 0) {
                const gradient = ctx.createLinearGradient(
                    star.x, star.y,
                    star.x - dx * 10, star.y - dy * 10
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 1;
                
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x - dx * 10, star.y - dy * 10);
                ctx.stroke();
            } else {
                shootingStars.splice(index, 1);
            }
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Create shooting stars periodically
    setInterval(createShootingStar, 3000);
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize Dust Particles
function initDustParticles() {
    const container = document.getElementById('dust-particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const driftX = (Math.random() - 0.5) * 200;
        const driftY = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--dust-x', driftX + 'px');
        particle.style.setProperty('--dust-y', driftY + 'px');
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }
}

// Initialize Asteroids
function initAsteroids() {
    const container = document.getElementById('asteroids');
    const asteroidCount = 10;
    
    for (let i = 0; i < asteroidCount; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        const size = Math.random() * 20 + 15;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const driftX = (Math.random() - 0.5) * 300;
        const driftY = (Math.random() - 0.5) * 300;
        const duration = Math.random() * 30 + 30;
        const delay = Math.random() * 10;
        
        asteroid.style.width = size + 'px';
        asteroid.style.height = size + 'px';
        asteroid.style.left = startX + 'px';
        asteroid.style.top = startY + 'px';
        asteroid.style.setProperty('--drift-x', driftX + 'px');
        asteroid.style.setProperty('--drift-y', driftY + 'px');
        asteroid.style.animationDuration = duration + 's';
        asteroid.style.animationDelay = delay + 's';
        
        container.appendChild(asteroid);
    }
}

// Initialize Draggable Planets
function initDraggablePlanets() {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        let isDragging = false;
        let hasMoved = false;
        let startX = 0;
        let startY = 0;
        let initialPlanetX = 0;
        let initialPlanetY = 0;
        let currentX = 0;
        let currentY = 0;
        
        // Get initial position
        const rect = planet.getBoundingClientRect();
        initialPlanetX = rect.left + rect.width / 2;
        initialPlanetY = rect.top + rect.height / 2;
        
        function dragStart(e) {
            e.preventDefault();
            isDragging = true;
            hasMoved = false;
            
            // Get starting position
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }
            
            // Get current planet position
            const rect = planet.getBoundingClientRect();
            initialPlanetX = rect.left + rect.width / 2;
            initialPlanetY = rect.top + rect.height / 2;
            
            planet.classList.add('dragging');
            
            // Hide info card while dragging
            const infoCard = document.getElementById('info-card');
            infoCard.classList.remove('visible');
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            
            // Get current position
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }
            
            // Calculate movement
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            
            // Check if moved more than threshold
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }
            
            // Calculate new position
            const newX = initialPlanetX + deltaX;
            const newY = initialPlanetY + deltaY;
            
            // Apply position with boundaries
            const boundedX = Math.max(100, Math.min(window.innerWidth - 100, newX));
            const boundedY = Math.max(100, Math.min(window.innerHeight - 100, newY));
            
            // Update position
            planet.style.left = boundedX + 'px';
            planet.style.top = boundedY + 'px';
            planet.style.transform = 'translate(-50%, -50%) scale(1.1)';
        }
        
        function dragEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            planet.classList.remove('dragging');
            planet.style.transform = 'translate(-50%, -50%)';
            
            // If not moved significantly, treat as click
            if (!hasMoved) {
                const url = planet.dataset.url;
                window.open(url, '_blank', 'noopener,noreferrer');
            }
            
            hasMoved = false;
        }
        
        // Mouse events
        planet.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        // Touch events
        planet.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);
    });
}

// Initialize Planet Interactions
function initPlanetInteractions() {
    const planets = document.querySelectorAll('.planet');
    const infoCard = document.getElementById('info-card');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', (e) => {
            // Don't show info card if dragging
            if (planet.classList.contains('dragging')) return;
            
            const planetType = planet.dataset.planet;
            const data = planetData[planetType];
            
            // Update info card
            document.getElementById('card-title').textContent = data.title;
            document.getElementById('card-description').textContent = data.description;
            
            // Show info card
            infoCard.classList.add('visible');
            updateInfoCardPosition(e);
        });
        
        planet.addEventListener('mousemove', (e) => {
            // Don't update info card if dragging
            if (planet.classList.contains('dragging')) return;
            updateInfoCardPosition(e);
        });
        
        planet.addEventListener('mouseleave', () => {
            infoCard.classList.remove('visible');
        });
    });
}

// Update Info Card Position
function updateInfoCardPosition(event) {
    const infoCard = document.getElementById('info-card');
    const x = event.clientX;
    const y = event.clientY;
    
    // Position above cursor with offset
    infoCard.style.left = x + 'px';
    infoCard.style.top = (y - infoCard.offsetHeight - 20) + 'px';
    infoCard.style.transform = 'translateX(-50%)';
    
    // Keep within viewport
    const rect = infoCard.getBoundingClientRect();
    if (rect.left < 10) {
        infoCard.style.left = (x + Math.abs(rect.left) + 10) + 'px';
    }
    if (rect.right > window.innerWidth - 10) {
        infoCard.style.left = (x - (rect.right - window.innerWidth) - 10) + 'px';
    }
    if (rect.top < 10) {
        infoCard.style.top = (y + 20) + 'px';
    }
}

// Initialize Mouse Parallax
function initMouseParallax() {
    const nebulas = document.querySelectorAll('.nebula');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateParallax() {
        // Smooth interpolation
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (targetX - centerX) / centerX;
        const offsetY = (targetY - centerY) / centerY;
        
        // Apply parallax to nebulas only (planets are now draggable)
        nebulas.forEach((nebula, index) => {
            const depth = (index + 1) * 0.01;
            const x = offsetX * 30 * depth;
            const y = offsetY * 30 * depth;
            nebula.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
}

