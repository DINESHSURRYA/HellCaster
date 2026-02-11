import React, { useState } from 'react';
import { useSound } from '@/hooks/useSound';
import {
  WarpIcon,
  StormIcon,
  CrystalIcon,
  MatrixIcon,
  SlateIcon,
  NebulaIcon,
  TopoIcon,
  SpectralIcon,
  ReactorIcon,
} from '@/components/Icons';

interface GridCell {
  id: string;
  icon: React.FC<{ className?: string; size?: number }>;
  label: string;
  sound: Parameters<ReturnType<typeof useSound>['play']>[0];
  effect: () => void;
}

interface InteractiveGridProps {
  onWarpTrigger: (duration: number) => void;
  onNebulaTrigger: (duration: number) => void;
  isWarping: boolean;
  isNebula: boolean;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({ onWarpTrigger, onNebulaTrigger, isWarping, isNebula }) => {
  const { play, playHover } = useSound();
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  const triggerEffect = (cellId: string, soundType: GridCell['sound'], effectFn: () => void) => {
    play(soundType, 0.5);
    setActiveEffect(cellId);
    effectFn();
    setTimeout(() => setActiveEffect(null), 1000);
  };

  const triggerWarp = () => {
    onWarpTrigger(3000);
  };

  const triggerStorm = () => {
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-[var(--neon-primary)] opacity-30 z-[9999] pointer-events-none';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 100);
  };

  const triggerCrystal = () => {
    for (let i = 0; i < 20; i++) {
      const crystal = document.createElement('div');
      crystal.className = 'fixed w-3 h-3 bg-[var(--neon-primary)] z-[9999] pointer-events-none';
      crystal.style.left = `${Math.random() * 100}vw`;
      crystal.style.top = `${Math.random() * 100}vh`;
      crystal.style.transform = 'rotate(45deg)';
      document.body.appendChild(crystal);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      let x = parseFloat(crystal.style.left);
      let y = parseFloat(crystal.style.top);
      let opacity = 1;

      const animate = () => {
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity;
        opacity -= 0.02;
        crystal.style.left = `${x}vw`;
        crystal.style.top = `${y}vh`;
        crystal.style.opacity = `${opacity}`;

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          crystal.remove();
        }
      };
      animate();
    }
  };

  const triggerMatrix = () => {
    document.body.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => document.body.style.filter = '', 500);
  };

  const triggerSlate = () => {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell, i) => {
      setTimeout(() => {
        (cell as HTMLElement).style.transform = 'scale(0.9)';
        setTimeout(() => (cell as HTMLElement).style.transform = '', 100);
      }, i * 50);
    });
  };

  const triggerNebula = () => {
    onNebulaTrigger(3000);
  };

  const triggerTopo = () => {
    const grid = document.querySelector('.interactive-grid');
    if (grid) {
      (grid as HTMLElement).style.transform = 'perspective(1000px) rotateX(20deg)';
      setTimeout(() => (grid as HTMLElement).style.transform = '', 1000);
    }
  };

  const triggerSpectral = () => {
    document.body.style.filter = 'saturate(2) contrast(1.2)';
    setTimeout(() => document.body.style.filter = '', 1000);
  };

  const triggerReactor = () => {
    const pulse = document.createElement('div');
    pulse.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full z-[9999] pointer-events-none';
    pulse.style.background = `radial-gradient(circle, var(--neon-primary), transparent)`;
    document.body.appendChild(pulse);

    let size = 0;
    const expand = () => {
      size += 50;
      pulse.style.width = `${size}px`;
      pulse.style.height = `${size}px`;
      pulse.style.opacity = `${1 - size / window.innerWidth}`;

      if (size < window.innerWidth) {
        requestAnimationFrame(expand);
      } else {
        pulse.remove();
      }
    };
    expand();
  };

  const cells: GridCell[] = [
    { id: 'warp', icon: WarpIcon, label: 'Warp', sound: 'warp', effect: () => triggerEffect('warp', 'warp', triggerWarp) },
    { id: 'storm', icon: StormIcon, label: 'Storm', sound: 'storm', effect: () => triggerEffect('storm', 'storm', triggerStorm) },
    { id: 'crystal', icon: CrystalIcon, label: 'Crystal', sound: 'crystal', effect: () => triggerEffect('crystal', 'crystal', triggerCrystal) },
    { id: 'matrix', icon: MatrixIcon, label: 'Matrix', sound: 'matrix', effect: () => triggerEffect('matrix', 'matrix', triggerMatrix) },
    { id: 'slate', icon: SlateIcon, label: 'Slate', sound: 'slate', effect: () => triggerEffect('slate', 'slate', triggerSlate) },
    { id: 'nebula', icon: NebulaIcon, label: 'Nebula', sound: 'nebula', effect: () => triggerEffect('nebula', 'nebula', triggerNebula) },
    { id: 'topo', icon: TopoIcon, label: 'Topo', sound: 'topo', effect: () => triggerEffect('topo', 'topo', triggerTopo) },
    { id: 'spectral', icon: SpectralIcon, label: 'Spectral', sound: 'spectral', effect: () => triggerEffect('spectral', 'spectral', triggerSpectral) },
    { id: 'reactor', icon: ReactorIcon, label: 'Reactor', sound: 'reactor', effect: () => triggerEffect('reactor', 'reactor', triggerReactor) },
  ];

  return (
    <section id="grid" className="relative py-24 md:py-40 px-6 md:px-12 z-10">
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2
          className="font-orbitron text-3xl md:text-5xl font-bold mb-5"
          style={{
            background: 'linear-gradient(90deg, #fff, var(--neon-primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Quantum Matrix
        </h2>
        <p className="text-white/50 text-sm tracking-[3px] uppercase">Interactive Module Selector</p>
      </div>

      {/* Grid */}
      <div className="interactive-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto transition-transform duration-1000">
        {cells.map((cell) => {
          const Icon = cell.icon;
          const isActive = activeEffect === cell.id;

          return (
            <div
              key={cell.id}
              className="grid-cell group relative aspect-square bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[var(--neon-primary)] hover:scale-105 hover:[box-shadow:0_0_30px_hsl(var(--primary)/0.2)]"
              onClick={cell.effect}
              onMouseEnter={() => playHover()}
            >
              {/* Radial glow on hover */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-[radial-gradient(circle,var(--neon-primary),transparent)] opacity-0 group-hover:w-[150%] group-hover:h-[150%] group-hover:opacity-20 transition-all duration-400"
              />

              {/* Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-125">
                <Icon
                  className={`text-white/50 group-hover:text-[var(--neon-primary)] transition-all duration-300 ${isActive ? 'text-[var(--neon-primary)] scale-125' : ''}`}
                  size={40}
                />
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-300">
                {cell.label}
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 border-2 border-[var(--neon-primary)] rounded-xl animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Warp mode indicator */}
      {isWarping && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-[var(--neon-primary)] font-orbitron text-4xl md:text-6xl tracking-[10px] animate-pulse">
            WARP ACTIVE
          </div>
        </div>
      )}

      {/* Nebula mode indicator */}
      {isNebula && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-[var(--neon-secondary)] font-orbitron text-4xl md:text-6xl tracking-[10px] animate-pulse">
            NEBULA SURGE
          </div>
        </div>
      )}
    </section>
  );
};
