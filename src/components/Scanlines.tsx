import React from 'react';

export const Scanlines: React.FC = () => {
  return (
    <>
      {/* Horizontal scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] opacity-30"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3) 51%)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* Moving scan bar */}
      <div 
        className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none"
        style={{
          background: 'rgba(0, 242, 255, 0.5)',
          boxShadow: '0 0 10px var(--neon-primary)',
          animation: 'scanline 8s linear infinite',
        }}
      />
    </>
  );
};
