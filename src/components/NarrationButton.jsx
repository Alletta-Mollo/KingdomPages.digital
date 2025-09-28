import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';

const NarrationButton = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  if (!audioSrc) return null; // ⛔ Don't render if no audio

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
    <div className="absolute bottom-4 right-4 flex items-center gap-2">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
          title="Play Story"
        >
          <Play size={20} />
        </button>
      ) : null}

      {showControls && (
        <>
          <button
            onClick={handleRestart}
            className="bg-purple-600 text-white p-3 rounded-full shadow hover:bg-purple-700"
            title="Restart"
          >
            <RotateCcw size={18} />
          </button>

          {isPaused ? (
            <button
              onClick={handleResume}
              className="bg-purple-600 text-white p-3 rounded-full shadow hover:bg-purple-700"
              title="Resume"
            >
              <Play size={18} />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-purple-600 text-white p-3 rounded-full shadow hover:bg-purple-700"
              title="Pause"
            >
              <Pause size={18} />
            </button>
          )}

          <button
            onClick={handleStop}
            className="bg-purple-600 text-white p-3 rounded-full shadow hover:bg-purple-700"
            title="Stop"
          >
            <Square size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default NarrationButton;
