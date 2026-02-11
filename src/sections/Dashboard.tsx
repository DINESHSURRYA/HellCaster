import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

interface DataCardProps {
  label: string;
  value: string;
  targetValue: number;
  suffix: string;
  statusColor: string;
  canvasId: string;
  delay: number;
}

const DataCard: React.FC<DataCardProps> = ({ label, suffix, targetValue, statusColor, canvasId, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playHover } = useSound();

  // Animate counter
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const stepValue = targetValue / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= targetValue) {
          setDisplayValue(targetValue);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [targetValue, delay]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
    }> = [];

    // Initialize particles based on canvas type
    const particleCount = canvasId === 'load' ? 15 : canvasId === 'nodes' ? 20 : 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-primary').trim();
      const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-secondary').trim();

      particles.forEach((p, i) => {
        // Different animation patterns for each card
        if (canvasId === 'load') {
          // Lightning bolts - vertical streaks
          p.y += p.speed * 5;
          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          
          const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 50);
          grad.addColorStop(0, `hsla(${180 + i * 5}, 100%, 70%, 0)`);
          grad.addColorStop(0.5, `hsla(${180 + i * 5}, 100%, 60%, ${p.opacity})`);
          grad.addColorStop(1, `hsla(${180 + i * 5}, 100%, 50%, 0)`);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (Math.random() - 0.5) * 10, p.y + 50);
          ctx.stroke();
        } else if (canvasId === 'nodes') {
          // Matrix rain - grid pulses
          p.y += p.speed * 3;
          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.floor(Math.random() * 10) * (canvas.width / 10);
          }
          
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(p.x, p.y, 2, 15);
          ctx.globalAlpha = 1;

          // Grid lines
          ctx.strokeStyle = `hsl(${110}, 100%, 50%, 0.1)`;
          ctx.lineWidth = 0.5;
          for (let gx = 0; gx < canvas.width; gx += 20) {
            ctx.beginPath();
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, canvas.height);
            ctx.stroke();
          }
        } else {
          // Data stream - horizontal blocks
          p.x += p.speed * 2;
          if (p.x > canvas.width) {
            p.x = -60;
            p.y = Math.random() * canvas.height;
          }
          
          ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
          ctx.globalAlpha = 0.3;
          ctx.fillRect(p.x, p.y, 20 + Math.random() * 40, 3);
          ctx.globalAlpha = 1;
          ctx.fillStyle = primaryColor;
          ctx.fillRect(p.x, p.y, 2, 3);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [canvasId]);

  const formatValue = () => {
    if (suffix === '%') return `${displayValue}%`;
    if (suffix === 'TB') return `${displayValue} TB`;
    return displayValue.toLocaleString();
  };

  return (
    <div 
      className="group relative bg-[var(--glass-bg)] border border-[var(--neon-primary)]/10 rounded-2xl p-8 md:p-10 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:border-[var(--neon-primary)] hover:[box-shadow:0_20px_60px_hsl(var(--primary)/0.1)]"
      onMouseEnter={() => playHover()}
    >
      {/* Glow border effect */}
      <div 
        className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-400 -z-10"
        style={{
          background: `linear-gradient(45deg, var(--neon-primary), transparent, var(--neon-secondary))`,
        }}
      />

      {/* Card Header */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[11px] tracking-[3px] text-white/50 uppercase">{label}</span>
        <div 
          className="w-2 h-2 rounded-full animate-[pulse-glow_2s_infinite]"
          style={{ background: statusColor }}
        />
      </div>

      {/* Card Value */}
      <div className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
        {formatValue()}
      </div>

      {/* Canvas */}
      <canvas 
        ref={canvasRef}
        className="w-full h-[150px] rounded-lg bg-black/30"
      />
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const cards = [
    { label: 'Neural Load', targetValue: 87, suffix: '%', statusColor: 'var(--neon-primary)', canvasId: 'load' },
    { label: 'Active Nodes', targetValue: 4096, suffix: '', statusColor: 'var(--neon-secondary)', canvasId: 'nodes' },
    { label: 'Data Stream', targetValue: 128, suffix: 'TB', statusColor: 'var(--neon-accent)', canvasId: 'stream' },
  ];

  return (
    <section id="dashboard" className="relative py-24 md:py-32 px-6 md:px-12 z-10 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <DataCard
            key={card.label}
            label={card.label}
            value=""
            targetValue={card.targetValue}
            suffix={card.suffix}
            statusColor={card.statusColor}
            canvasId={card.canvasId}
            delay={index * 200}
          />
        ))}
      </div>
    </section>
  );
};
