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

const BASE_URL = import.meta.env.BASE_URL === '/' ? './' : import.meta.env.BASE_URL;

const soundUrls: Record<SoundType, string> = {
  boot: `${BASE_URL}/sounds/boot.mp3`.replace(/\/+/g, '/'),
  hover: `${BASE_URL}/sounds/hover.mp3`.replace(/\/+/g, '/'),
  click: `${BASE_URL}/sounds/click.mp3`.replace(/\/+/g, '/'),
  warp: `${BASE_URL}/sounds/warp.mp3`.replace(/\/+/g, '/'),
  storm: `${BASE_URL}/sounds/storm.mp3`.replace(/\/+/g, '/'),
  crystal: `${BASE_URL}/sounds/crystal.mp3`.replace(/\/+/g, '/'),
  matrix: `${BASE_URL}/sounds/matrix.mp3`.replace(/\/+/g, '/'),
  slate: `${BASE_URL}/sounds/slate.mp3`.replace(/\/+/g, '/'),
  nebula: `${BASE_URL}/sounds/nebula.mp3`.replace(/\/+/g, '/'),
  topo: `${BASE_URL}/sounds/topo.mp3`.replace(/\/+/g, '/'),
  spectral: `${BASE_URL}/sounds/spectral.mp3`.replace(/\/+/g, '/'),
  reactor: `${BASE_URL}/sounds/reactor.mp3`.replace(/\/+/g, '/'),
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
      audio.addEventListener('error', (e) => {
        console.error(`Error loading sound: ${type} at ${soundUrls[type]}`, e);
      });
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
