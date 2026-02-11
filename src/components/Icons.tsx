import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const WarpIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
    <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const StormIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L4.09 12.11C3.89 12.35 3.78 12.65 3.78 12.96C3.78 13.66 4.35 14.23 5.05 14.23H11V22L19.91 11.89C20.11 11.65 20.22 11.35 20.22 11.04C20.22 10.34 19.65 9.77 18.95 9.77H13V2Z" 
          fill="currentColor" />
  </svg>
);

export const CrystalIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 8L12 22L20 8L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M4 8L20 8" stroke="currentColor" strokeWidth="1" />
    <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1" />
    <path d="M8 5L16 5" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <path d="M6 6.5L18 6.5" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export const MatrixIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="15" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="3" y="15" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="15" y="15" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="9" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="1" />
    <line x1="6" y1="9" x2="6" y2="15" stroke="currentColor" strokeWidth="1" />
    <line x1="18" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="1" />
    <line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const SlateIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="16" r="1.5" fill="currentColor" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    <line x1="8" y1="9.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1" />
    <line x1="16" y1="9.5" x2="16" y2="14.5" stroke="currentColor" strokeWidth="1" />
    <line x1="9.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="9.5" y1="16" x2="14.5" y2="16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const NebulaIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4" />
    <circle cx="7" cy="8" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="17" cy="9" r="1.2" fill="currentColor" opacity="0.5" />
    <circle cx="15" cy="17" r="0.8" fill="currentColor" opacity="0.7" />
    <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

export const TopoIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 18L8 10L12 14L16 6L20 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="4" cy="18" r="1.5" fill="currentColor" />
    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    <circle cx="16" cy="6" r="1.5" fill="currentColor" />
    <circle cx="20" cy="12" r="1.5" fill="currentColor" />
    <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    <line x1="2" y1="4" x2="22" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export const SpectralIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <line x1="12" y1="5" x2="12" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="12" y1="16" x2="12" y2="19" stroke="currentColor" strokeWidth="1" />
    <line x1="5" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" />
    <line x1="16" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const ReactorIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <ellipse cx="12" cy="12" rx="3" ry="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" transform="rotate(-45 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const SoundOnIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
    <path d="M15.54 8.46C16.48 9.4 17 10.62 17 12C17 13.38 16.48 14.6 15.54 15.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.07 4.93C20.95 6.81 22 9.29 22 12C22 14.71 20.95 17.19 19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SoundOffIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
    <path d="M23 9L17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 9L23 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ThemeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.93 19.07L6.34 17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
