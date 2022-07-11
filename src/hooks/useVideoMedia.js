import { useEffect, useRef, useState } from 'react';

function useVideoMedia() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef(null);

  const play = () => {
    if (!isPlaying && ref.current) ref.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    if (isPlaying && ref.current) ref.current.pause();
    setIsPlaying(false);
  };
  const stop = () => {
    if (ref.current) {
      if (isPlaying) ref.current.pause();
      ref.current.fastSeek(0);
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (ref) {
      ref.current.on('ended', () => setIsFinished(true));
    }
  }, [ref]);

  return {
    isFinished,
    isPlaying,
    play,
    pause,
    ref,
    stop
  };
}

export default useVideoMedia;
