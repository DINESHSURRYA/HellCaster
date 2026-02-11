import React, { useEffect, useState } from 'react';
import { useSound } from '@/hooks/useSound';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootTexts = [
  '> INITIALIZING NEURAL LINK...',
  '> LOADING QUANTUM MATRICES...',
  '> SYNCHRONIZING PARTICLE SYSTEMS...',
  '> ESTABLISHING SECURE CONNECTION...',
  '> WELCOME TO HELLCASTER OS',
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleTexts, setVisibleTexts] = useState<number>(0);
  const [isFading, setIsFading] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    if (!hasStarted) return;

    // Play boot sound
    play('boot', 0.6);

    // Show texts sequentially
    bootTexts.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTexts(index + 1);
      }, 200 + index * 400);
    });

    // Start fade out
    setTimeout(() => {
      setIsFading(true);
    }, 2800);

    // Complete
    setTimeout(() => {
      onComplete();
    }, 3800);
  }, [onComplete, play, hasStarted]);

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-black z-[10000] flex flex-col justify-center items-center">
        <button
          onClick={() => setHasStarted(true)}
          className="px-8 py-4 border-2 border-[var(--neon-primary)] text-[var(--neon-primary)] font-orbitron tracking-[4px] hover:bg-[var(--neon-primary)]/20 transition-all duration-300 group relative"
          style={{
            boxShadow: '0 0 20px rgba(var(--neon-primary-rgb), 0.2)',
          }}
        >
          <span className="relative z-10">INITIALIZE SYSTEM</span>
          <div className="absolute inset-0 bg-[var(--neon-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
          {/* Decorative corners */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[var(--neon-primary)]" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[var(--neon-primary)]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[var(--neon-primary)]" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[var(--neon-primary)]" />
        </button>
        <div className="mt-4 text-[var(--neon-primary)]/40 font-orbitron text-[10px] tracking-[2px] animate-pulse">
          AWAITING NEURAL SYNCHRONIZATION...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black z-[10000] flex flex-col justify-center items-center transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="space-y-2">
        {bootTexts.map((text, index) => (
          <div
            key={index}
            className="font-orbitron text-sm tracking-[3px] text-[var(--neon-primary)]"
            style={{
              opacity: index < visibleTexts ? 1 : 0,
              animation: index < visibleTexts ? 'type-in 0.5s forwards' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="w-[300px] h-[2px] bg-[var(--neon-primary)]/20 mt-8 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-[var(--neon-primary)]"
          style={{
            boxShadow: '0 0 10px var(--neon-primary)',
            animation: 'boot-load 3s ease-out forwards',
          }}
        />
      </div>
    </div>
  );
};
