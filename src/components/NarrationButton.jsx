import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';

const NarrationButton = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  if (!audioSrc) return null;

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    setIsPaused(false);
    setShowControls(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    audioRef.current.play();
    setIsPaused(false);
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setShowControls(false);
  };

  return (
    <div className="absolute top-2 sm:top-2 md:top-2 lg:top-2 xl:top-2 right-2 sm:top-8 flex flex-col sm:flex-row items-center gap-2 z-10">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="bg-primary text-white p-1 sm:p-2 rounded-full shadow hover:bg-primary/80 transition"
          title="Play Story"
        >
          <Play size={14} />
        </button>
      )}

      {showControls && (
        <>
          <button
            onClick={handleRestart}
            className="bg-primary text-white p-1 sm:p-2 rounded-full shadow hover:bg-primary/80"
            title="Restart"
          >
            <RotateCcw size={14} />
          </button>

          {isPaused ? (
            <button
              onClick={handleResume}
              className="bg-primary text-white p-1 sm:p-2 rounded-full shadow hover:bg-primary/80"
              title="Resume"
            >
              <Play size={14} />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-primary text-white p-1 sm:p-2 rounded-full shadow hover:bg-primary/80"
              title="Pause"
            >
              <Pause size={14} />
            </button>
          )}

          <button
            onClick={handleStop}
            className="bg-primary text-white p-1 sm:p-2 rounded-full shadow hover:bg-primary/80"
            title="Stop"
          >
            <Square size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default NarrationButton;
