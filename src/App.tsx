import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Navbar from './components/Navbar';
import ContentRow from './ContentRow';
import { memories, categories } from './data/memories';
import { useMyList } from './context/MyListContext';
import './App.css';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [showCredits, setShowCredits] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [activeProfile, setActiveProfile] = useState({ id: 1, name: 'Year 1', color: 'bg-blue-600' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const { myList } = useMyList();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSoundPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const handleProfileSelect = (profileName: string, color: string) => {
    setActiveProfile({ id: profiles.indexOf(profileName) + 1, name: profileName, color });
    setShowProfileMenu(false);
  };

  const navigateTo = (screen: string) => {
    setNavigationHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const prevScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentScreen(prevScreen);
    }
  };

  const handleNavClick = (target: 'home' | 'category' | 'favorites' | 'profiles', categoryName?: string) => {
    switch (target) {
      case 'home':
        setActiveCategory('');
        navigateTo('home');
        break;
      case 'category':
        if (categoryName) {
          setActiveCategory(categoryName);
          navigateTo('home');
        }
        break;
      case 'favorites':
        setActiveCategory('');
        navigateTo('favorites');
        break;
      case 'profiles':
        setActiveCategory('');
        navigateTo('profiles');
        break;
    }
  };

  const profiles = ['Year 1', 'Year 2', 'Year 3'];

  // Compute rows for home screen based on active profile, category filter, and search query
  const baseRows = memories[activeProfile.name] || [];
  
  const displayedRows = (() => {
    let filtered = baseRows;
    
    // Apply category filter
    if (activeCategory) {
      filtered = filtered.map(row => ({
        ...row,
        items: row.items.filter(item => item.category === activeCategory)
      })).filter(row => row.items.length > 0);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.map(row => ({
        ...row,
        items: row.items.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(row => row.items.length > 0);
    }
    
    return filtered;
  })();

  // Get all favorite items across all years and sections
  const getAllFavoriteItems = () => {
    const allItems: { item: any; year: string; rowSection: string }[] = [];
    Object.entries(memories).forEach(([year, rows]) => {
      rows.forEach(row => {
        row.items.forEach(item => {
          if (myList.has(item.id)) {
            allItems.push({ item, year, rowSection: row.title });
          }
        });
      });
    });
    return allItems;
  };

  // Group favorites by year, then by rowSection
  const groupedFavorites = (() => {
    const groups: { [year: string]: { [rowTitle: string]: { title: string; subtitle: string; items: any[] } } } = {};
    
    getAllFavoriteItems().forEach(({ item, year, rowSection }) => {
      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][rowSection]) {
        // Find original row subtitle
        const originalYearData = memories[year];
        const originalRow = originalYearData?.find(r => r.title === rowSection);
        groups[year][rowSection] = {
          title: rowSection,
          subtitle: originalRow?.subtitle || '',
          items: []
        };
      }
      groups[year][rowSection].items.push(item);
    });
    
    return groups;
  })();

  const favoriteYears = Object.entries(groupedFavorites).map(([year, rowsDict]) => ({
    year,
    rows: Object.values(rowsDict)
  }));

  const isHome = currentScreen === 'home';
  const isFavorites = currentScreen === 'favorites';

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
              {profiles.map((profileName, index) => {
                const colors = ['bg-blue-600', 'bg-pink-600', 'bg-green-600'];
                const gradients = [
                  'from-blue-900/50 to-blue-700/50',
                  'from-pink-900/50 to-pink-700/50',
                  'from-green-900/50 to-green-700/50'
                ];
                return (
                  <motion.div
                    key={profileName}
                    className="flex flex-col items-center cursor-pointer group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveProfile({ id: index + 1, name: profileName, color: colors[index] });
                      setCurrentScreen('home');
                    }}
                  >
                    <motion.div
                      className="w-[180px] h-[180px] rounded-md overflow-hidden relative bg-gray-900 border-2 border-transparent transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 text-white/60">
                          <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.8" />
                          <rect x="25" y="60" width="50" height="35" rx="5" fill="currentColor" opacity="0.8" />
                        </svg>
                      </div>
                      <div className={`absolute top-3 left-3 ${colors[index]} text-white text-xs font-medium px-2.5 py-1 rounded`}>
                        {profileName}
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className={`w-10 h-10 ${colors[index]} rounded-full flex items-center justify-center`}>
                          <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </motion.div>
                    </motion.div>
                    <motion.span className="text-gray-400 text-base mt-3 group-hover:text-white transition-colors duration-300">
                      {profileName}
                    </motion.span>
                  </motion.div>
                );
              })}
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
          <motion.div key="home" className="min-h-screen bg-black">
            {/* Navbar */}
            <Navbar
              activeProfile={activeProfile}
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
              showSearchInput={showSearchInput}
              setShowSearchInput={setShowSearchInput}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentScreen={currentScreen}
              handleNavClick={handleNavClick}
              activeCategory={activeCategory}
              onProfileSelect={(profileName, color) => {
                const profileColors: { [key: string]: string } = {
                  'Year 1': 'bg-blue-600',
                  'Year 2': 'bg-pink-600',
                  'Year 3': 'bg-green-600'
                };
                setActiveProfile({ id: profiles.indexOf(profileName) + 1, name: profileName, color: profileColors[profileName] || 'bg-gray-600' });
              }}
            />

            <div className="relative h-[85vh] flex items-center pt-16">
              <div className="absolute inset-0 z-0">
                {/* Background Video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-purple-900/30 z-10" 
                  animate={{ 
                    background: [
                      'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))',
                      'linear-gradient(to right, rgba(139, 0, 255, 0.2), transparent, rgba(229, 9, 20, 0.2))',
                      'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))'
                    ] 
                  }} 
                  transition={{ duration: 5, repeat: Infinity }} 
                />
              </div>
              <div className="relative z-20 max-w-4xl mx-auto px-8 text-center">
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" 
                  style={{ fontFamily: 'Arial, sans-serif' }} 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                >
                  {activeCategory || `Life of Chitrangi & Aryan`}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto" 
                  initial={{ y: 30, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.5 }}
                >
                  {activeCategory 
                    ? `Memories about ${activeCategory.toLowerCase()}`
                    : 'Our journey through time, love, and unforgettable moments'
                  }
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center" 
                  initial={{ y: 30, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.7 }}
                >
                  <motion.button 
                    className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors" 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setShowCredits(true)}
                  >
                    <PlayIcon className="w-8 h-8" />Play
                  </motion.button>
                  <motion.button 
                    className="px-8 py-4 bg-gray-500/50 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-500/70 transition-colors border border-gray-500/50" 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <InformationCircleIcon className="w-8 h-8" />More Info
                  </motion.button>
                </motion.div>
              </div>
            </div>
            <div className="relative z-20 -mt-32 pb-20 space-y-16">
              {searchQuery && (
                <h2 className="text-center text-2xl text-gray-400 mb-8">
                  Search results for: "{searchQuery}"
                </h2>
              )}
              {displayedRows.map((row, index) => (
                <ContentRow
                  key={index}
                  title={row.title}
                  subtitle={row.subtitle}
                  items={row.items}
                />
              ))}
              {displayedRows.length === 0 && searchQuery && (
                <p className="text-center text-gray-500 text-lg">No matching memories found.</p>
              )}
              {displayedRows.length === 0 && !activeCategory && !searchQuery && (
                <p className="text-center text-gray-500 text-lg">No memories available.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Screen */}
      <AnimatePresence>
        {currentScreen === 'favorites' && (
          <motion.div key="favorites" className="min-h-screen bg-black">
            {/* Navbar */}
            <Navbar
              activeProfile={activeProfile}
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
              showSearchInput={showSearchInput}
              setShowSearchInput={setShowSearchInput}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentScreen={currentScreen}
              handleNavClick={handleNavClick}
              onProfileSelect={(profileName, color) => {
                const profileColors: { [key: string]: string } = {
                  'Year 1': 'bg-blue-600',
                  'Year 2': 'bg-pink-600',
                  'Year 3': 'bg-green-600'
                };
                setActiveProfile({ id: profiles.indexOf(profileName) + 1, name: profileName, color: profileColors[profileName] || 'bg-gray-600' });
              }}
            />

            <div className="relative h-[85vh] flex items-center pt-16">
              <div className="absolute inset-0 z-0">
                {/* Background Video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-purple-900/30 z-10" 
                  animate={{ 
                    background: [
                      'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))',
                      'linear-gradient(to right, rgba(139, 0, 255, 0.2), transparent, rgba(229, 9, 20, 0.2))',
                      'linear-gradient(to right, rgba(229, 9, 20, 0.2), transparent, rgba(139, 0, 255, 0.2))'
                    ] 
                  }} 
                  transition={{ duration: 5, repeat: Infinity }} 
                />
              </div>
              <div className="relative z-20 max-w-4xl mx-auto px-8 text-center">
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" 
                  style={{ fontFamily: 'Arial, sans-serif' }} 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                >
                  My List
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto" 
                  initial={{ y: 30, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.5 }}
                >
                  Your favorite memories in one place
                </motion.p>
              </div>
            </div>
            <div className="relative z-20 -mt-32 pb-20 space-y-12">
              {favoriteYears.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-20">
                  <p className="text-2xl mb-2">You haven't added any memories to your list yet.</p>
                  <p>Start adding by clicking the + icon on any memory.</p>
                </div>
              ) : (
                favoriteYears.map((yearGroup, yearIndex) => (
                  <div key={yearGroup.year}>
                    {/* Year Header */}
                    <div className="px-8 mb-4">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {yearGroup.year}
                      </h2>
                    </div>
                    {/* Rows for this year */}
                    {yearGroup.rows.map((row, rowIndex) => (
                      <ContentRow
                        key={`${yearGroup.year}-${row.title}-${rowIndex}`}
                        title={row.title}
                        subtitle={row.subtitle}
                        items={row.items}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credits */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            key="credits"
            className="fixed inset-0 bg-black z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="min-h-screen flex items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-center space-y-8 py-20"
                animate={{ y: [-100, 100] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Credits
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Directed by
                  </h3>
                  <p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                    God
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Cast
                  </h3>
                  <p className="text-3xl md:text-5xl text-[#e50914] font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Chitrangi &amp; Aryan
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                >
                  <h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Soundtrack
                  </h3>
                  <p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Our Favorite Memories
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4 }}
                >
                  <h3 className="text-2xl md:text-4xl text-gray-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Location
                  </h3>
                  <p className="text-3xl md:text-5xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                    The Heart
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
