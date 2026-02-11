import React from 'react';
import { useSound } from '@/hooks/useSound';

export const Footer: React.FC = () => {
  const { playHover, playClick } = useSound();

  return (
    <footer id="contact" className="relative py-16 px-6 text-center z-10 border-t border-[var(--neon-primary)]/10 bg-black/50">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div 
          className="font-orbitron text-2xl font-black tracking-[6px] mb-8"
          style={{
            background: 'linear-gradient(135deg, var(--neon-primary), var(--neon-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          HELLCASTER
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-8">
          {['GitHub', 'Twitter', 'Discord', 'Docs'].map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => { e.preventDefault(); playClick(); }}
              onMouseEnter={() => playHover()}
              className="text-white/40 text-xs tracking-[2px] uppercase transition-colors duration-300 hover:text-[var(--neon-primary)]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-white/30 text-xs tracking-[3px]">
          HELLCASTER OS © 2026 | QUANTUM NEURAL INTERFACE
        </p>
      </div>
    </footer>
  );
};
