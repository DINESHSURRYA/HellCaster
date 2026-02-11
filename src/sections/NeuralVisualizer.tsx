import { useEffect, useRef } from 'react';

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const NeuralVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initParticles();
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      const spacing = 30;
      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          particlesRef.current.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            size: 1.5,
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-primary').trim();

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 150;

        if (dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 2;
          p.vy -= Math.sin(angle) * force * 2;
        }

        // Return to origin (elasticity)
        p.vx += (p.originX - p.x) * 0.05;
        p.vy += (p.originY - p.y) * 0.05;

        // Friction
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const alpha = Math.min(speed * 0.5, 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + speed * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.3 + alpha * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 3) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const connectionDist = Math.sqrt(dx * dx + dy * dy);

          if (connectionDist < 80) {
            ctx.strokeStyle = primaryColor;
            ctx.globalAlpha = 1 - connectionDist / 80;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="visualizer" className="relative py-24 md:py-40 px-6 md:px-12 z-10 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] bg-black/50 border border-[var(--neon-primary)]/20 rounded-3xl overflow-hidden backdrop-blur-md">
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Overlay */}
        <div className="absolute top-6 left-6 z-10">
          <div className="font-orbitron text-sm tracking-[4px] text-[var(--neon-primary)] mb-2">
            NEURAL VISUALIZER
          </div>
          <div className="text-[11px] text-white/50 tracking-[2px]">
            REAL-TIME PARTICLE TRACKING
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-primary)]/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-primary)]/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-primary)]/30" />
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-primary)]/30" />
      </div>
    </section>
  );
};
