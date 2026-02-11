import { useCallback, useRef, useEffect } from 'react';

export type SoundType = 
  | 'boot' 
  | 'hover' 
  | 'click' 
  | 'warp' 
  | 'storm' 
  | 'crystal' 
  | 'matrix' 
  | 'slate' 
  | 'nebula' 
  | 'topo' 
  | 'spectral' 
  | 'reactor';

const soundUrls: Record<SoundType, string> = {
  boot: '/sounds/boot.mp3',
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  warp: '/sounds/warp.mp3',
  storm: '/sounds/storm.mp3',
  crystal: '/sounds/crystal.mp3',
  matrix: '/sounds/matrix.mp3',
  slate: '/sounds/slate.mp3',
  nebula: '/sounds/nebula.mp3',
  topo: '/sounds/topo.mp3',
  spectral: '/sounds/spectral.mp3',
  reactor: '/sounds/reactor.mp3',
};

export function useSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    boot: null,
    hover: null,
    click: null,
    warp: null,
    storm: null,
    crystal: null,
    matrix: null,
    slate: null,
    nebula: null,
    topo: null,
    spectral: null,
    reactor: null,
  });

  const isMuted = useRef(false);

  useEffect(() => {
    // Preload all sounds
    (Object.keys(soundUrls) as SoundType[]).forEach((type) => {
      const audio = new Audio(soundUrls[type]);
      audio.preload = 'auto';
      audio.volume = 0.5;
      audioRefs.current[type] = audio;
    });

    return () => {
      (Object.keys(audioRefs.current) as SoundType[]).forEach((type) => {
        const audio = audioRefs.current[type];
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    };
  }, []);

  const play = useCallback((type: SoundType, volume: number = 0.5) => {
    if (isMuted.current) return;
    
    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const playHover = useCallback(() => {
    play('hover', 0.2);
  }, [play]);

  const playClick = useCallback(() => {
    play('click', 0.4);
  }, [play]);

  const toggleMute = useCallback(() => {
    isMuted.current = !isMuted.current;
    return isMuted.current;
  }, []);

  const setMute = useCallback((muted: boolean) => {
    isMuted.current = muted;
  }, []);

  return { play, playHover, playClick, toggleMute, setMute, isMuted: () => isMuted.current };
}
