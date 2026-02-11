import React, { useState } from 'react';
import { useSound } from '@/hooks/useSound';

export const Hero: React.FC = () => {
  const { playHover, playClick } = useSound();
  const [isNeuralMode, setIsNeuralMode] = useState(false);

  const activateNeuralMode = () => {
    playClick();
    setIsNeuralMode(true);
    setTimeout(() => setIsNeuralMode(false), 2000);
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center z-10 overflow-hidden">
      <div className="text-center relative px-4">
        {/* Subtitle */}
        <div 
          className="font-orbitron text-xs md:text-sm tracking-[8px] text-[var(--neon-primary)] mb-5 opacity-80 animate-[float_6s_ease-in-out_infinite]"
        >
          QUANTUM INTERFACE v2.0
        </div>

        {/* Main Title */}
        <h1 
          className={`font-orbitron text-[clamp(3rem,12vw,10rem)] font-black tracking-[10px] md:tracking-[20px] mb-8 relative transition-all duration-300 ${
            isNeuralMode ? 'animate-[chromatic-drift_0.5s_infinite]' : ''
          }`}
          style={{
            background: 'linear-gradient(180deg, #fff 0%, var(--neon-primary) 50%, var(--neon-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.5))',
          }}
        >
          HELLCASTER
        </h1>

        {/* Description */}
        <p className="max-w-xl mx-auto mb-12 text-white/60 text-sm md:text-base leading-relaxed tracking-wide">
          Experience the convergence of neural networks and visual physics. 
          A new dimension of interactive digital existence awaits.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-6 md:gap-8 justify-center flex-wrap">
          <button
            onClick={activateNeuralMode}
            onMouseEnter={() => playHover()}
            className="group relative px-10 md:px-12 py-5 bg-transparent border border-[var(--neon-primary)] text-[var(--neon-primary)] font-orbitron text-xs tracking-[4px] uppercase overflow-hidden transition-all duration-400 hover:bg-[var(--neon-primary)] hover:text-black hover:[box-shadow:0_0_40px_var(--neon-primary)] hover:tracking-[6px]"
          >
            <span 
              className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-[var(--neon-primary)]/20 to-transparent transition-all duration-500 group-hover:left-full"
            />
            <span className="relative">Initialize System</span>
          </button>

          <button
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="px-10 md:px-12 py-5 bg-white/5 border border-white/20 text-white font-orbitron text-xs tracking-[4px] uppercase transition-all duration-400 backdrop-blur-md hover:border-[var(--neon-secondary)] hover:text-[var(--neon-secondary)] hover:[box-shadow:0_0_30px_hsl(var(--secondary)/0.3)]"
          >
            View Documentation
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--neon-primary)] to-transparent" />
      </div>
    </section>
  );
};
