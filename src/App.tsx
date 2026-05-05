import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import ContentRow from './ContentRow';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [showCredits, setShowCredits] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSoundPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <audio ref={audioRef} preload="auto">
        <source src="/netflix-ta-dum.mp3" type="audio/mpeg" />
        <source src="/ta-dum.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      {/* Splash Screen with Intro Video */}
      <AnimatePresence>
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            className="min-h-screen bg-black flex items-center justify-center flex-col relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 z-0">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={() => setShowLogo(true)}
              >
                <source src="/Intro.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <AnimatePresence>
              {showLogo && (
                <motion.div
                  key="logo"
                  className="relative z-10 cursor-pointer"
                  onClick={() => {
                    handleSoundPlay();
                    setTimeout(() => setCurrentScreen('profiles'), 1000);
                  }}
                  initial={{ scale: 0, opacity: 0, rotateY: 180 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 10, duration: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="/Netflix.svg"
                    alt="Netflix"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]"
                  />
                  <motion.div className="absolute -inset-8 border-2 border-[#e50914] rounded-full" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.2, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="absolute -inset-12 border-2 border-[#e50914] rounded-full" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
                  <motion.div className="absolute -inset-16 border-2 border-[#e50914] rounded-full" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profiles Screen */}
      <AnimatePresence>
        {currentScreen === 'profiles' && (
          <motion.div key="profiles" className="min-h-screen bg-black flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* Title */}
            <motion.h1 
              className="text-white text-6xl md:text-7xl font-light mb-16 tracking-wide"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Who's watching?
            </motion.h1>

            {/* Profile Cards Row */}
            <motion.div 
              className="flex flex-row items-end gap-10 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {[1, 2, 3].map((profile) => (
                <motion.div
                  key={profile}
                  className="flex flex-col items-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentScreen('home')}
                >
                  {/* Profile Card */}
                  <motion.div
                    className="w-[180px] h-[180px] rounded-md overflow-hidden relative bg-gray-900 border-2 border-transparent transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-purple-900/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-white/60">
                        <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.8" />
                        <rect x="25" y="60" width="50" height="35" rx="5" fill="currentColor" opacity="0.8" />
                      </svg>
                    </div>
                    <div className="absolute top-3 left-3 bg-[#e50914] text-white text-xs font-medium px-2.5 py-1 rounded">
                      Year {profile}
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-10 h-10 bg-[#e50914] rounded-full flex items-center justify-center">
                        <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Label */}
                  <motion.span className="text-gray-400 text-base mt-3 group-hover:text-white transition-colors duration-300">
                    Year {profile}
                  </motion.span>
                </motion.div>
              ))}

              {/* Add Profile Card */}
              <motion.div
                className="flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-[180px] h-[180px] rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-gray-500 hover:bg-gray-700 transition-all duration-300"
                >
                  <svg className="w-10 h-10 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
                <motion.span className="text-gray-400 text-base mt-3 group-hover:text-white transition-colors duration-300">
                  Add Profile
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Manage Profiles Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button className="text-gray-400 text-sm px-8 py-2 border border-gray-700 rounded tracking-[0.2em] hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all duration-300 uppercase">
                Manage Profiles
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Screen */}
      <AnimatePresence>
        {currentScreen === 'home' && (
          <motion.div key="home" className="min-h-screen bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-[85vh] flex items-center">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }} />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-purple-900/30" animate={{ background: ['linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))', 'linear-gradient(to right, rgba(139, 0, 255, 0.2), transparent, rgba(229, 9, 20, 0.2))', 'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))'] }} transition={{ duration: 5, repeat: Infinity }} />
              </div>
              <div className="relative z-20 max-w-4xl mx-auto px-8 text-center">
                <motion.h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Arial, sans-serif' }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>Life of Jia &amp; Aryan</motion.h1>
                <motion.p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>Our journey through time, love, and unforgettable moments</motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                  <motion.button className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCredits(true)}><PlayIcon className="w-8 h-8" />Play</motion.button>
                  <motion.button className="px-8 py-4 bg-gray-500/50 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-500/70 transition-colors border border-gray-500/50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><InformationCircleIcon className="w-8 h-8" />More Info</motion.button>
                </motion.div>
                <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2"><motion.div className="w-1 h-2 bg-gray-400 rounded-full" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} /></div>
                </motion.div>
              </div>
            </div>
            <div className="relative z-20 -mt-32 pb-20 space-y-16">
              <ContentRow title="Our Greatest Hits" subtitle="Memories that define us" items={[{ id: 1, title: 'First Date', description: '98% Match', type: 'video', thumbnail: 'to-pink-400' }, { id: 2, title: 'First Trip', description: '2 Adventures', type: 'video', thumbnail: 'to-blue-500' }, { id: 3, title: 'Moving In', description: '95% Match', type: 'video', thumbnail: 'to-green-400' }, { id: 4, title: 'Meeting Family', description: '2 Episodes', type: 'video', thumbnail: 'to-purple-400' }, { id: 5, title: 'First Fight', description: 'Drama', type: 'video', thumbnail: 'to-red-500' }, { id: 6, title: 'Making Up', description: '99% Match', type: 'video', thumbnail: 'to-yellow-400' }]} />
              <ContentRow title="Memories We Keep Replaying" subtitle="Moments never forgotten" items={[{ id: 1, title: 'Anniversary Dinner', description: 'Romance', type: 'video', thumbnail: 'to-red-600' }, { id: 2, title: 'Beach Day', description: 'Sun & Fun', type: 'video', thumbnail: 'to-cyan-400' }, { id: 3, title: 'Christmas Magic', description: 'Holiday', type: 'video', thumbnail: 'to-blue-600' }, { id: 4, title: 'New Year Kiss', description: 'Fireworks', type: 'video', thumbnail: 'to-purple-600' }, { id: 5, title: 'Cooking Together', description: 'Recipe', type: 'video', thumbnail: 'to-orange-400' }, { id: 6, title: 'Rainy Day', description: 'Cozy', type: 'video', thumbnail: 'to-gray-600' }]} />
              <ContentRow title="Milestone Markers" subtitle="Every step together" items={[{ id: 1, title: 'Propose Moment', description: 'Forever', type: 'video', thumbnail: 'to-pink-600' }, { id: 2, title: 'Wedding Day', description: 'I Do', type: 'video', thumbnail: 'to-white' }, { id: 3, title: '1 Year Anniversary', description: 'First of Many', type: 'video', thumbnail: 'to-red-500' }, { id: 4, title: '5 Year Anniversary', description: 'Stronger', type: 'video', thumbnail: 'to-gold-500' }]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credits */}
      <AnimatePresence>{showCredits && (<motion.div key="credits" className="fixed inset-0 bg-black z-50 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="min-h-screen flex items-center justify-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><motion.div className="text-center space-y-8 py-20" animate={{ y: [-100, 100] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}><h2 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>Credits</h2></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Directed by</h3><p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>God</p></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Cast</h3><p className="text-3xl md:text-5xl text-[#e50914] font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Jia &amp; Aryan</p></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Soundtrack</h3><p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Our Favorite Memories</p></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Location</h3><p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Our Hearts</p></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Cinematography</h3><p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Life Camera</p></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 6 }}><h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Production</h3><p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Love Studios</p></motion.div><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7 }}><motion.button className="mt-12 px-8 py-3 bg-[#e50914] text-white rounded-lg font-bold text-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCredits(false)}>Back to Home</motion.button></motion.div></motion.div></motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}

export default App;
