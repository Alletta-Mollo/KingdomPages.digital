import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';

const NarrationButton = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      const filtered = allVoices.filter(v =>
        v.lang === 'en-GB' &&
        (v.name === 'Google UK English Female ' || v.name === 'Google UK English Male')
      );
      setVoices(filtered);
      setSelectedVoice(filtered[0]);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const handleSpeak = () => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    speechSynthesis.resume();
    setIsPaused(false);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Voice Toggle */}
      <div className="flex gap-1">
        {voices.map((voice) => (
          <button
            key={voice.name}
            onClick={() => setSelectedVoice(voice)}
            className={`p-1 rounded-full border ${
              selectedVoice?.name === voice.name ? 'border-primary' : 'border-muted'
            }`}
            title={voice.name}
          >
            {voice.name.includes('Female') ? '👩' : '👨'}
          </button>
        ))}
      </div>

      {/* Controls */}
      {!isSpeaking ? (
        <button onClick={handleSpeak} className="p-1 text-muted-foreground hover:text-primary">
          <Volume2 size={14} />
        </button>
      ) : (
        <>
          {isPaused ? (
            <button onClick={handleResume} className="p-1 text-green-600 hover:text-green-700">
              <Play size={14} />
            </button>
          ) : (
            <button onClick={handlePause} className="p-1 text-yellow-500 hover:text-yellow-600">
              <Pause size={14} />
            </button>
          )}
          <button onClick={handleStop} className="p-1 text-red-600 hover:text-red-700">
            <Square size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default NarrationButton;
