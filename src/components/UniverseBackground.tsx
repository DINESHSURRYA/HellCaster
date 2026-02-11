import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  hue: number;
}

interface NebulaParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
  hue: number;
  life: number;
}

interface UniverseBackgroundProps {
  warpMode?: boolean;
  nebulaMode?: boolean;
}

export const UniverseBackground: React.FC<UniverseBackgroundProps> = ({ warpMode = false, nebulaMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulaParticlesRef = useRef<NebulaParticle[]>([]);
  const animationRef = useRef<number | null>(null);
  const warpModeRef = useRef(warpMode);
  const nebulaModeRef = useRef(nebulaMode);

  useEffect(() => {
    warpModeRef.current = warpMode;
  }, [warpMode]);

  useEffect(() => {
    nebulaModeRef.current = nebulaMode;
  }, [nebulaMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize stars
    starsRef.current = [];
    for (let i = 0; i < 200; i++) {
      starsRef.current.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        prevZ: 0,
        hue: Math.random() > 0.5 ? 190 : 45,
      });
    }

    // Initialize nebula particles
    nebulaParticlesRef.current = [];
    for (let i = 0; i < 100; i++) {
      nebulaParticlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        prevX: 0,
        prevY: 0,
        speed: Math.random() * 2 + 0.5,
        hue: Math.random() > 0.5 ? 320 : 190,
        life: Math.random() * 100 + 50,
      });
    }

    const animate = () => {
      const isWarp = warpModeRef.current;
      const isNebula = nebulaModeRef.current;

      // Clear with trail effect
      if (isWarp) {
        ctx.fillStyle = 'rgba(0, 0, 5, 0.3)';
      } else if (isNebula) {
        ctx.fillStyle = 'rgba(20, 0, 30, 0.1)'; // Purple tint for nebula mode
      } else {
        ctx.fillStyle = 'rgba(2, 2, 5, 0.1)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw stars (warp effect)
      starsRef.current.forEach((star) => {
        star.prevZ = star.z;
        star.z -= isWarp ? 40 : (isNebula ? 2 : 0.5); // Slightly faster in nebula mode

        if (star.z < 1) {
          star.z = canvas.width;
          star.prevZ = star.z;
        }

        const sx = (star.x / star.z) * 100 + cx;
        const sy = (star.y / star.z) * 100 + cy;
        const px = (star.x / star.prevZ) * 100 + cx;
        const py = (star.y / star.prevZ) * 100 + cy;

        const size = (1 - star.z / canvas.width) * 3;

        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.lineCap = 'round';

        const grad = ctx.createLinearGradient(px, py, sx, sy);
        grad.addColorStop(0, `hsla(${star.hue}, 100%, 70%, 0)`);
        grad.addColorStop(1, `hsla(${star.hue}, 100%, 60%, ${1 - star.z / canvas.width})`);

        ctx.strokeStyle = grad;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      });

      // Draw nebula flow
      if (!isWarp) {
        nebulaParticlesRef.current.forEach((p) => {
          p.prevX = p.x;
          p.prevY = p.y;

          const timeScale = isNebula ? 0.005 : 0.001;
          const speedMultiplier = isNebula ? 5 : 1;

          const angle = (Math.sin(p.x * 0.005) + Math.cos(p.y * 0.005 + Date.now() * timeScale)) * Math.PI;
          p.x += Math.cos(angle) * p.speed * speedMultiplier;
          p.y += Math.sin(angle) * p.speed * speedMultiplier;
          p.life--;

          if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.life = Math.random() * 100 + 50;
          }

          ctx.beginPath();
          // Shift hue dynamically in nebula mode
          const currentHue = isNebula ? (p.hue + Date.now() / 10) % 360 : p.hue;
          const opacity = isNebula ? 0.8 : p.life / 200;

          ctx.strokeStyle = `hsla(${currentHue}, 100%, 60%, ${opacity})`;
          ctx.lineWidth = isNebula ? 2 : 0.5;
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};
