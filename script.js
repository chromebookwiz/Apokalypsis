const CONFIG = {
    initialMax: 10000,
    spokes: 24,
    centerRadius: 100, // Radius reserved for the cross/center
    ringStep: 20,     // Distance between concentric rings
    colors: {
        background: '#000000',
        prime: '#ff0000',
        composite: '#ffffff',
        cross: '#ff0000',
        crossBorder: '#ffffff',
        textPrime: '#ffaaaa',
        textComposite: '#aaaaaa'
    }
};

class PrimeGenerator {
    constructor(limit) {
        this.limit = limit;
        this.primes = new Uint8Array(limit + 1); // 0 = composite, 1 = prime (initially 0, will set un-sieved to 1)
        this.sieve();
    }

    sieve() {
        // Initialize all as potentially prime (1) except 0 and 1
        this.primes.fill(1);
        this.primes[0] = 0;
        this.primes[1] = 0;

        // Standard Sieve of Eratosthenes
        for (let i = 2; i * i <= this.limit; i++) {
            if (this.primes[i]) {
                for (let j = i * i; j <= this.limit; j += i) {
                    this.primes[j] = 0;
                }
            }
        }
    }

    isPrime(n) {
        if (n > this.limit) return false; // Or expand sieve
        return this.primes[n] === 1;
    }
}

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: false });
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.camera = { x: 0, y: 0, zoom: 1.0 };
        this.isDragging = false;
        this.lastMouse = { x: 0, y: 0 };

        this.primes = new PrimeGenerator(CONFIG.initialMax);

        // Bind events
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));

        this.resize();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();
    }

    worldToScreen(x, y) {
        return {
            x: (x * this.camera.zoom) + (this.width / 2) + this.camera.x,
            y: (y * this.camera.zoom) + (this.height / 2) + this.camera.y
        };
    }

    screenToWorld(x, y) {
        return {
            x: (x - (this.width / 2) - this.camera.x) / this.camera.zoom,
            y: (y - (this.height / 2) - this.camera.y) / this.camera.zoom
        };
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
    }

    onMouseMove(e) {
        if (this.isDragging) {
            const dx = e.clientX - this.lastMouse.x;
            const dy = e.clientY - this.lastMouse.y;
            this.camera.x += dx;
            this.camera.y += dy;
            this.lastMouse = { x: e.clientX, y: e.clientY };
            // requestAnimationFrame handled by animate loop, but we can flag for redraw
        }
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onWheel(e) {
        e.preventDefault();
        const zoomSpeed = 0.1;
        const newZoom = this.camera.zoom * (1 - Math.sign(e.deltaY) * zoomSpeed);
        
        // Zoom towards mouse pointer logic could be added here
        // For now, center zoom
        this.camera.zoom = Math.max(0.01, Math.min(newZoom, 50.0));
        
        document.getElementById('zoom-val').innerText = this.camera.zoom.toFixed(2);
    }

    drawCross() {
        const ctx = this.ctx;
        const size = CONFIG.centerRadius * 0.8;
        const center = this.worldToScreen(0, 0);

        // Simple Templar Cross (Cross Pattée) approximation
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.scale(this.camera.zoom, this.camera.zoom);

        ctx.fillStyle = CONFIG.colors.cross;
        ctx.strokeStyle = CONFIG.colors.crossBorder;
        ctx.lineWidth = 2;

        ctx.beginPath();
        // 4 arms
        for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            ctx.moveTo(0, 0);
            ctx.lineTo(-size/2, -size); // Flare out
            ctx.lineTo(size/2, -size);
            ctx.lineTo(0, 0);
        }
        ctx.fill();
        ctx.stroke();

        // Draw 1, 2, 3 in center
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Cinzel';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Approximate positions for 1, 2, 3
        ctx.fillText("1", 0, -20);
        ctx.fillText("2", -20, 10);
        ctx.fillText("3", 20, 10);

        ctx.restore();
    }

    draw() {
        const ctx = this.ctx;
        
        // Clear background
        ctx.fillStyle = CONFIG.colors.background;
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw Center Cross
        this.drawCross();

        // Draw 24 Spokes (Visual guide)
        /*
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        const center = this.worldToScreen(0, 0);
        const maxDist = (CONFIG.initialMax / 24) * CONFIG.ringStep * this.camera.zoom;
        for (let i = 0; i < 24; i++) {
            const angle = (i * Math.PI * 2) / 24;
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(center.x + Math.cos(angle) * maxDist, center.y + Math.sin(angle) * maxDist);
            ctx.stroke();
        }
        */

        // Draw Numbers
        // Start from 4
        // Logic: 24 spokes.
        // number n.
        // spoke_index = (n) % 24.
        // radius_index = floor((n) / 24).
        
        // We need to be careful with alignment.
        // If we want 1-24 to be the first ring?
        // But 1,2,3 are in center.
        // Let's map n=4 to its position.
        // Position on wheel: (n-1) acts as the index 0-based for position?
        // n=1 -> index 0 (spoke 0)
        // n=24 -> index 23 (spoke 23)
        // n=25 -> index 24 (spoke 0, next ring)
        
        const fontSize = Math.max(8, 12 * this.camera.zoom);
        ctx.font = `${fontSize}px Cinzel`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // View frustum culling optimization could go here
        
        for (let n = 4; n <= CONFIG.initialMax; n++) {
            const spokeIndex = (n - 1) % CONFIG.spokes; // 0 to 23
            const ringIndex = Math.floor((n - 1) / CONFIG.spokes); // 0, 1, ...
            
            // Correct angle:
            // spoke 0 should be at top (or right). Let's say -PI/2 is spoke 0 (Number 1's slot)
            // But usually wheels start at 0 -> East.
            // Let's stick to standard math: angle = spoke * (2PI/24).
            const angle = spokeIndex * (Math.PI * 2 / CONFIG.spokes) - (Math.PI / 2); // Start at top

            const dist = CONFIG.centerRadius + (ringIndex * CONFIG.ringStep);

            const wx = Math.cos(angle) * dist;
            const wy = Math.sin(angle) * dist;

            const screenPos = this.worldToScreen(wx, wy);

            // Culling
            if (screenPos.x < -50 || screenPos.x > this.width + 50 || 
                screenPos.y < -50 || screenPos.y > this.height + 50) {
                continue;
            }

            const isP = this.primes.isPrime(n);
            
            if (this.camera.zoom < 0.5) {
                // Draw dots if zoomed out
                ctx.fillStyle = isP ? CONFIG.colors.prime : CONFIG.colors.composite;
                // Make primes larger
                const dotSize = isP ? 2 * this.camera.zoom + 1 : 1 * this.camera.zoom;
                ctx.beginPath();
                ctx.arc(screenPos.x, screenPos.y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw numbers
                ctx.fillStyle = isP ? CONFIG.colors.textPrime : CONFIG.colors.textComposite;
                ctx.fillText(n.toString(), screenPos.x, screenPos.y);
            }
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
window.onload = () => {
    const canvas = document.getElementById('canvas');
    new Renderer(canvas);
};
