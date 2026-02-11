import { useState, useCallback } from 'react';
import { ThemeProvider } from '@/hooks/useTheme';
import { BootSequence } from '@/sections/BootSequence';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Dashboard } from '@/sections/Dashboard';
import { InteractiveGrid } from '@/sections/InteractiveGrid';
import { NeuralVisualizer } from '@/sections/NeuralVisualizer';
import { Footer } from '@/sections/Footer';
import { UniverseBackground } from '@/components/UniverseBackground';
import { Scanlines } from '@/components/Scanlines';
import './App.css';

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [warpMode, setWarpMode] = useState(false);
  const [nebulaMode, setNebulaMode] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  const handleWarpTrigger = useCallback((duration: number) => {
    setWarpMode(true);
    setTimeout(() => setWarpMode(false), duration);
  }, []);

  const handleNebulaTrigger = useCallback((duration: number) => {
    setNebulaMode(true);
    setTimeout(() => setNebulaMode(false), duration);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--deep-space)] text-white overflow-x-hidden">
      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Background */}
      <UniverseBackground warpMode={warpMode} nebulaMode={nebulaMode} />

      {/* CRT Effects */}
      <Scanlines />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className={`transition-opacity duration-1000 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <Dashboard />
        <InteractiveGrid
          onWarpTrigger={handleWarpTrigger}
          onNebulaTrigger={handleNebulaTrigger}
          isWarping={warpMode}
          isNebula={nebulaMode}
        />
        <NeuralVisualizer />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
