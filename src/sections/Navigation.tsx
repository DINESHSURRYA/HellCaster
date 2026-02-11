import { useState } from 'react';
import { useSound } from '@/hooks/useSound';
import { useTheme, themeLabels, type ThemeType } from '@/hooks/useTheme';
import { SoundOnIcon, SoundOffIcon, ThemeIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons';

export const Navigation = () => {
  const { playHover, playClick, toggleMute, isMuted } = useSound();
  const { theme, setTheme, nextTheme, prevTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const muted = isMuted();

  const handleThemeClick = () => {
    playClick();
    setShowThemeMenu(!showThemeMenu);
  };

  const handleThemeSelect = (newTheme: ThemeType) => {
    playClick();
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  const handleMuteToggle = () => {
    playClick();
    toggleMute();
  };

  const themes: ThemeType[] = [
    'cyan', 'purple', 'green', 'red', 'blue', 
    'amber', 'magenta', 'emerald', 'orange', 'mono'
  ];

  return (
    <nav className="fixed top-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[1000] glass border-b border-[var(--neon-primary)]/10">
      <div className="font-orbitron text-xl md:text-2xl font-black tracking-[4px] text-gradient animate-[chromatic-drift_4s_infinite]">
        HELLCASTER
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-10 list-none">
          {[
            { href: '#dashboard', label: 'Dashboard' },
            { href: '#grid', label: 'Matrix' },
            { href: '#visualizer', label: 'Neural' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-white/70 text-xs tracking-[2px] uppercase relative py-1 transition-all duration-300 hover:text-[var(--neon-primary)] hover:[text-shadow:0_0_10px_var(--neon-primary)] group"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
              >
                {item.label}
                <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[var(--neon-primary)] transition-all duration-300 group-hover:w-full [box-shadow:0_0_10px_var(--neon-primary)]" />
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Switcher */}
        <div className="relative">
          <button
            onClick={handleThemeClick}
            onMouseEnter={() => playHover()}
            className="p-2 text-white/70 hover:text-[var(--neon-primary)] transition-colors duration-300"
            title="Change Theme"
          >
            <ThemeIcon size={22} />
          </button>

          {showThemeMenu && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 glass rounded-lg border border-[var(--neon-primary)]/20 overflow-hidden animate-[fadeIn_0.2s_ease]"
              onMouseLeave={() => setShowThemeMenu(false)}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--neon-primary)]/10">
                <button onClick={() => { playClick(); prevTheme(); }} className="p-1 hover:text-[var(--neon-primary)]">
                  <ChevronLeftIcon size={16} />
                </button>
                <span className="text-xs font-orbitron text-[var(--neon-primary)]">{themeLabels[theme]}</span>
                <button onClick={() => { playClick(); nextTheme(); }} className="p-1 hover:text-[var(--neon-primary)]">
                  <ChevronRightIcon size={16} />
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleThemeSelect(t)}
                    onMouseEnter={() => playHover()}
                    className={`w-full px-3 py-2 text-left text-xs transition-colors duration-200 ${
                      theme === t 
                        ? 'bg-[var(--neon-primary)]/20 text-[var(--neon-primary)]' 
                        : 'text-white/70 hover:bg-[var(--neon-primary)]/10 hover:text-white'
                    }`}
                  >
                    {themeLabels[t]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={handleMuteToggle}
          onMouseEnter={() => playHover()}
          className={`p-2 transition-colors duration-300 ${muted ? 'text-white/40' : 'text-white/70 hover:text-[var(--neon-primary)]'}`}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <SoundOffIcon size={22} /> : <SoundOnIcon size={22} />}
        </button>
      </div>
    </nav>
  );
};
