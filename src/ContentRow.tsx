import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'image';
  thumbnail: string;
}

interface ContentRowProps {
  title: string;
  subtitle: string;
  items: ContentItem[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, subtitle, items }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="px-8 mb-8">
      {/* Row Header - Netflix Style */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Content Cards */}
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 relative group cursor-pointer"
            style={{ width: '200px', height: '112px' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.8,
              zIndex: 10,
              y: -30,
            }}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {/* Card Background */}
            <div className={`w-full h-full rounded-md bg-gradient-${item.thumbnail} relative overflow-hidden`}>
              {/* Pattern overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-4xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {item.title.split(' ').map((w: string) => w[0]).join('')}
                </div>
              </div>

              {/* Mini Player Overlay */}
              {hoveredId === item.id && (
                <motion.div
                  className="absolute inset-0 bg-black/90 z-20 p-3 rounded-md flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Video Controls */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white text-xs bg-[#e50914] px-2 py-1 rounded">
                      {item.description}
                    </span>
                    <span className="text-gray-400 text-xs">2 Seasons</span>
                  </div>

                  {/* Play Button */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <PlayIcon className="w-5 h-5 text-black ml-1" />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="mt-2">
                    <p className="text-white text-xs font-bold truncate">{item.title}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-green-400 text-xs">New</span>
                      <span className="text-gray-400 text-xs">HD</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-md"
                animate={{
                  boxShadow: hoveredId === item.id 
                    ? '0 0 30px rgba(229, 9, 20, 0.5)'
                    : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Title */}
            <motion.div
              className="mt-2"
              animate={{
                opacity: hoveredId === item.id ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
              <p className="text-gray-500 text-xs">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
