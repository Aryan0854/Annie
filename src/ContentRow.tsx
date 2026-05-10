import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PlusIcon, HandThumbUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { MemoryItem } from './data/memories';
import { useMyList } from './context/MyListContext';

interface ContentRowProps {
  title: string;
  subtitle: string;
  items: MemoryItem[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, subtitle, items }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const { toggleMyList, isInMyList } = useMyList();

  const handleMouseEnter = (id: number) => {
    const timer = setTimeout(() => {
      setHoveredId(id);
      // Auto-play video on hover
      if (videoRefs.current[id]) {
        videoRefs.current[id]?.play().catch(() => {});
      }
    }, 200);
    setHoverTimer(timer);
  };

  const handleMouseLeave = (id: number) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setHoveredId(null);
    // Pause video when not hovering
    if (videoRefs.current[id]) {
      videoRefs.current[id]?.pause();
    }
  };

  const matchPercentage = (id: number) => {
    const matches = ['98% Match', '95% Match', '99% Match', '92% Match', '96% Match', '97% Match'];
    return matches[id % matches.length];
  };

  const getDuration = (id: number) => {
    const durations = ['2h 15m', '1h 45m', '1h 30m', '2h 5m', '1h 50m', '2h 20m'];
    return durations[id % durations.length];
  };

  return (
    <div className="px-8 mb-12 overflow-visible">
      {/* Row Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h2>
        <p className="text-gray-400 text-base">{subtitle}</p>
      </div>

      {/* Content Grid - No horizontal scroll */}
      <div className="flex flex-wrap gap-[15px] overflow-visible">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex-shrink-0 group cursor-pointer relative"
            style={{ width: '250px' }}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            {/* Tile Container */}
            <div className="relative">
              {/* Normal Tile with Image Placeholder */}
              <motion.div
                className="w-full aspect-video rounded-md overflow-hidden relative"
                style={{ borderRadius: '6px' }}
                animate={{
                  opacity: hoveredId === item.id ? 0 : 1,
                  scale: hoveredId === item.id ? 0.95 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Placeholder Image */}
                <img
                  src={item.imageUrl || `https://placehold.co/400x225/333333/FFFFFF?text=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold truncate">{item.title}</h3>
                </div>
              </motion.div>

              {/* Expanded Mini-Player - on hover */}
              {hoveredId === item.id && (
                <motion.div
                  className="absolute top-0 left-0 w-[320px] bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
                  style={{ zIndex: 100, transform: 'translateY(-20px)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Video */}
                  <div className="relative aspect-video">
                    <video
                      ref={(el) => { videoRefs.current[item.id] = el; }}
                      className="w-full h-full object-cover"
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                        {/* Action Buttons */}
                      <div className="flex items-center gap-2 mb-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <PlayIcon className="w-4 h-4 text-black ml-0.5" />
                        </button>
                        <button
                          className={`w-8 h-8 border rounded-full flex items-center justify-center transition-colors ${isInMyList(item.id) ? 'bg-white border-white' : 'border-gray-400 hover:border-white'}`}
                          onClick={() => toggleMyList(item.id)}
                        >
                          {isInMyList(item.id) ? (
                            <CheckIcon className="w-4 h-4 text-black" />
                          ) : (
                            <PlusIcon className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <button className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-white transition-colors">
                          <HandThumbUpIcon className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 text-xs text-white mb-1">
                        <span className="text-green-400 font-bold">{matchPercentage(item.id)}</span>
                        <span className="border border-gray-400 px-1 py-0.5 rounded">U/A 13+</span>
                        <span>{getDuration(item.id)}</span>
                      </div>

                      {/* Tags */}
                      <div className="text-xs text-gray-300">
                        Quirky • Romantic • Dramedy
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="p-3">
                    <h3 className="text-white font-bold text-base">{item.title}</h3>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Title - Always Visible below card */}
            <div className="mt-2">
              <p className="text-white text-base font-bold truncate">{item.title}</p>
              <p className="text-gray-400 text-sm">{matchPercentage(item.id)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;