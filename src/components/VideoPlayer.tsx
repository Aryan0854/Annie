import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, SpeakerWaveIcon, SpeakerXMarkIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
  startTime?: number;
  onVideoEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onClose, startTime = 0, onVideoEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isVideo = /\.(mp4|mov|webm|ogg|m4v)$/i.test(videoUrl);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play().catch(() => {});
    }
  }, [startTime, isVideo]);

  const togglePlay = () => {
    if (isVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds: number) => {
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleTimeUpdate = () => {
    if (isVideo && videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (isVideo && videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
      >
        <XMarkIcon className="w-8 h-8 text-white" />
      </button>

      {/* Media Container */}
      <div className="relative w-full max-w-6xl aspect-video mx-4 flex items-center justify-center">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black rounded-lg shadow-2xl"
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => {
                setIsPlaying(false);
                onVideoEnded?.();
              }}
            />

            {/* Custom Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 rounded-b-lg">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-600"
                  style={{
                    background: `linear-gradient(to right, #e50914 0%, #e50914 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-6 h-6 text-white" />
                    ) : (
                      <PlayIcon className="w-6 h-6 text-white" />
                    )}
                  </button>

                  {/* Skip Backward */}
                  <button
                    onClick={() => skip(-10)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    <BackwardIcon className="w-5 h-5 text-white" />
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={() => skip(10)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    <ForwardIcon className="w-5 h-5 text-white" />
                  </button>

                  {/* Volume */}
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Time Display */}
                  <span className="text-white text-sm ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            src={videoUrl}
            alt="Enlarged memory"
          />
        )}
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
