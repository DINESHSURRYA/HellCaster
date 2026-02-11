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
  const [visibleTexts, setVisibleTexts] = useState<number>(0);
  const [isFading, setIsFading] = useState(false);
  const { play } = useSound();

  useEffect(() => {
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
  }, [onComplete, play]);

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
