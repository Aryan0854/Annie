import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Navbar from './components/Navbar';
import ContentRow from './ContentRow';
import VideoPlayer from './components/VideoPlayer';
import { memories, profileImages } from './data/memories';
import { useMyList } from './context/MyListContext';
import './App.css';

const yearSongs: { [key: string]: string[] } = {
  'Year 1': [
    '/media/sounds/year-1/Until I Found You By Stephen Sanchez.mp3',
    '/media/sounds/year-1/Dandelions By Ruth B.mp3',
    '/media/sounds/year-1/Perfect By Ed Sheeran.mp3'
  ],
  'Year 2': [
    '/media/sounds/year-2/Calum_Scott_Leona_Lewis_-_You_Are_The_Reason_Duet_Version_(mp3.pm).mp3',
    '/media/sounds/year-2/Golden Hour (PenduJatt.Com.Se).mp3',
    '/media/sounds/year-2/The_Ringer_-_Cersei_Lannister_s_Love_Song_to_JaimeTaylor_Swift_-_Lover_Game_of_Thrones_Remix_The_(mp3.pm).mp3'
  ],
  'Year 3': [
    '/media/sounds/year-3/Christina_Perri_-_Thousand_years_(mp3.pm).mp3',
    '/media/sounds/year-3/Elvis_Presley_The_Royal_Philharmonic_Orchestra_-_Can_t_Help_Falling_In_Love_(SkySound.cc).mp3',
    '/media/sounds/year-3/Ruelle_-_I_Get_To_Love_You_(mp3.pm).mp3'
  ]
};

const getDisplaySongName = (url: string) => {
  if (!url) return '';
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  let name = filename.replace(/\.(mp3|wav|ogg|m4a)$/i, '');
  
  if (name.includes('Calum_Scott_Leona_Lewis')) {
    return 'You Are The Reason - Calum Scott & Leona Lewis';
  }
  if (name.includes('Cersei_Lannister_s_Love_Song_to_JaimeTaylor_Swift')) {
    return 'Lover (Remix) - Taylor Swift';
  }
  if (name.includes('Golden Hour') || name.includes('golden hour')) {
    return 'Golden Hour - JVKE';
  }
  if (name.includes('Christina_Perri') || name.includes('Thousand_years')) {
    return 'A Thousand Years - Christina Perri';
  }
  if (name.includes('Elvis_Presley')) {
    return "Can't Help Falling In Love - Elvis Presley";
  }
  if (name.includes('Ruelle_-_I_Get_To_Love_You') || name.includes('I_Get_To_Love_You')) {
    return 'I Get To Love You - Ruelle';
  }
  
  name = name.replace(/_-_/g, ' - ')
             .replace(/_/g, ' ')
             .replace(/-/g, ' ')
             .replace(/\(.*\)/g, '')
             .replace(/\s+/g, ' ')
             .trim();
             
  return name;
};

const backgroundHearts = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 16 + 10,
  delay: Math.random() * 15,
  duration: Math.random() * 10 + 10,
  color: i % 3 === 0 ? 'text-red-500/20' : i % 3 === 1 ? 'text-pink-500/20' : 'text-rose-400/20'
}));

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [showVideoCredits, setShowVideoCredits] = useState(false);
  const [activeProfile, setActiveProfile] = useState({ id: 1, name: 'Year 1', color: 'bg-blue-600' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [currentVideo, setCurrentVideo] = useState<{ url: string; startTime: number } | null>(null);
  const { myList } = useMyList();

  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [slideshowQueue, setSlideshowQueue] = useState<string[]>([]);
  const [slideshowIndex, setSlideshowIndex] = useState<number>(-1);

  const startStorySlideshow = () => {
    const activeYearData = memories[activeProfile.name];
    const videoUrls: string[] = [];
    if (activeYearData) {
      activeYearData.forEach(row => {
        row.items.forEach(item => {
          if (item.type === 'video' && item.videoUrl) {
            videoUrls.push(item.videoUrl);
          }
        });
      });
    }
    if (videoUrls.length > 0) {
      setSlideshowQueue(videoUrls);
      setSlideshowIndex(0);
      setCurrentVideo({ url: videoUrls[0], startTime: 0 });
    }
  };
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgAudioRef = useRef<HTMLAudioElement>(null);

  const heroBackgrounds: { [key: string]: string } = {
    'Year 1': '/media/videos/Template-1.mp4',
    'Year 2': '/media/videos/Template-2.mp4',
    'Year 3': '/media/videos/15.mp4'
  };

  const activeHeroBg = heroBackgrounds[activeProfile.name] || '/media/videos/Template-1.mp4';
  const isHeroBgVideo = /\.(mp4|mov|webm)$/i.test(activeHeroBg);

  const [currentSongUrl, setCurrentSongUrl] = useState<string>('');

  // Play random song based on active profile when on home or favorites screens
  useEffect(() => {
    const isPlayingScreen = currentScreen === 'home' || currentScreen === 'favorites';
    if (isPlayingScreen && activeProfile.name) {
      const songs = yearSongs[activeProfile.name];
      if (songs && songs.length > 0) {
        if (songs.length > 1) {
          let nextSong = currentSongUrl;
          while (nextSong === currentSongUrl) {
            const randomIndex = Math.floor(Math.random() * songs.length);
            nextSong = songs[randomIndex];
          }
          setCurrentSongUrl(nextSong);
        } else {
          setCurrentSongUrl(songs[0]);
        }
      }
    } else {
      setCurrentSongUrl('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile, currentScreen]);

  // Handle actual playback and auto-playing the next random song on end
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    if (currentSongUrl) {
      audio.src = currentSongUrl;
      audio.load();
      if (!currentVideo) {
        audio.play().catch(e => console.log('Background audio play failed:', e));
      }
    } else {
      audio.pause();
      audio.src = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongUrl]);

  // Pause bg audio when a full screen video starts, resume when it ends
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    if (currentVideo) {
      audio.pause();
    } else if (currentSongUrl) {
      audio.play().catch(e => console.log('Background audio resume failed:', e));
    }
  }, [currentVideo, currentSongUrl]);

  const handleSoundPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const handleVideoPlay = (videoUrl: string, startTime: number) => {
    setCurrentVideo({ url: videoUrl, startTime });
  };

  const handleVideoEnded = () => {
    if (slideshowIndex >= 0 && slideshowIndex < slideshowQueue.length - 1) {
      const nextIdx = slideshowIndex + 1;
      setSlideshowIndex(nextIdx);
      setCurrentVideo({ url: slideshowQueue[nextIdx], startTime: 0 });
    } else {
      setShowVideoCredits(true);
    }
  };

  const closeVideoPlayer = () => {
    setCurrentVideo(null);
    setSlideshowIndex(-1);
    setSlideshowQueue([]);
  };

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
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


  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <audio ref={audioRef} preload="auto">
        <source src="/netflix-ta-dum.mp3" type="audio/mpeg" />
        <source src="/ta-dum.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      <audio
        ref={bgAudioRef}
        preload="auto"
        onEnded={() => {
          const songs = yearSongs[activeProfile.name];
          if (songs && songs.length > 1) {
            let nextSong = currentSongUrl;
            while (nextSong === currentSongUrl) {
              const idx = Math.floor(Math.random() * songs.length);
              nextSong = songs[idx];
            }
            setCurrentSongUrl(nextSong);
          } else if (songs && songs.length === 1) {
            if (bgAudioRef.current) {
              bgAudioRef.current.currentTime = 0;
              bgAudioRef.current.play().catch(() => {});
            }
          }
        }}
      />

      {/* Splash Screen with Intro Video */}
      <AnimatePresence>
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            className="min-h-screen bg-black flex items-center justify-center flex-col relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              handleSoundPlay();
              setCurrentScreen('profiles');
            }}
          >
            <div className="absolute inset-0 z-0">
               <video
                 ref={videoRef}
                 className="w-full h-full object-cover"
                 autoPlay
                 muted
                 playsInline
                 onEnded={() => {
                   handleSoundPlay();
                   setCurrentScreen('profiles');
                 }}
                 onError={() => {
                   setCurrentScreen('profiles');
                 }}
               >
                <source src="/Intro.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-10 z-10 text-white/40 text-sm tracking-widest font-light pointer-events-none uppercase">
              Click anywhere to skip
            </div>
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
                      <img
                        src={profileImages[index].imageUrl}
                        alt={`${profileName} profile`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
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
              onLoveLetterClick={() => setShowLoveLetter(true)}
            />

            <div className="relative h-[85vh] flex items-center pt-16">
              <div className="absolute inset-0 z-0">
                {/* Background Video or Image */}
                {isHeroBgVideo ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeHeroBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeHeroBg}
                    alt="Background"
                  />
                )}
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
                  className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight font-cinematic" 
                  style={{ fontFamily: 'Playfair Display, serif' }} 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.3 }}
                >
                  {activeCategory || `Life of Chitrangi & Aryan`}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-sans-modern" 
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
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
                    className="flex flex-col sm:flex-row gap-4 justify-center z-30" 
                    initial={{ y: 30, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.7 }}
                  >
                    {!activeCategory && (
                      <motion.button 
                        className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 hover-heartbeat transition-colors border border-red-600 shadow-lg shadow-red-600/30 cursor-pointer" 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={startStorySlideshow}
                      >
                        <svg className="w-6 h-6 animate-pulse text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Play Our Story
                      </motion.button>
                    )}
                    <motion.button 
                      className="px-8 py-4 bg-gray-500/50 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-500/70 transition-colors border border-gray-500/50 cursor-pointer" 
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
                  onVideoPlay={handleVideoPlay}
                />
              ))}
              {displayedRows.length === 0 && searchQuery && (
                <p className="text-center text-gray-500 text-lg">No matching memories found.</p>
              )}
              {displayedRows.length === 0 && !activeCategory && !searchQuery && (
                <p className="text-center text-gray-500 text-lg">No memories available.</p>
              )}

              {/* Video Credits — shown after a full-screen video ends */}
              {showVideoCredits && (
                <motion.div
                  key="video-credits"
                  className="min-h-[85vh] flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center space-y-8 py-20 max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Credits
                      </h2>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-2xl md:text-3xl text-gray-400 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Directed by
                      </h3>
                      <p className="text-3xl md:text-4xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                        God
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <h3 className="text-2xl md:text-3xl text-gray-400 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Cast
                      </h3>
                      <p className="text-3xl md:text-4xl text-[#e50914] font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Chitrangi &amp; Aryan
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <h3 className="text-2xl md:text-3xl text-gray-400 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Soundtrack
                      </h3>
                      <p className="text-3xl md:text-4xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Our Favorite Memories
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl text-gray-400 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Location
                      </h3>
                      <p className="text-3xl md:text-4xl text-white font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                        The Heart
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
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
              onLoveLetterClick={() => setShowLoveLetter(true)}
            />

            <div className="relative h-[85vh] flex items-center pt-16">
              <div className="absolute inset-0 z-0">
                {/* Background Video or Image */}
                {isHeroBgVideo ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeHeroBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeHeroBg}
                    alt="Background"
                  />
                )}
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
                        onVideoPlay={handleVideoPlay}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {currentVideo && (
          <VideoPlayer
            key="video-player"
            videoUrl={currentVideo.url}
            startTime={currentVideo.startTime}
            onClose={closeVideoPlayer}
            onVideoEnded={handleVideoEnded}
          />
        )}
      </AnimatePresence>

      {/* Floating Giphy GIF & Song Player */}
      {(currentScreen === 'home' || currentScreen === 'favorites') && (
        <div className="fixed bottom-6 right-6 z-[99] pointer-events-none select-none flex flex-col items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-2xl">
          <img
            src="/media/images/giphy.gif"
            alt="Cute floating animation"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
          {currentSongUrl && (
            <div className="text-white text-[10px] md:text-xs font-medium tracking-wide flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="animate-pulse">🎵</span>
              <span>{getDisplaySongName(currentSongUrl)}</span>
            </div>
          )}
        </div>
      )}

      {/* Floating Background Hearts */}
      {(currentScreen === 'home' || currentScreen === 'favorites') && (
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[1]">
          {backgroundHearts.map(heart => (
            <svg
              key={heart.id}
              className={`floating-heart ${heart.color}`}
              style={{
                left: `${heart.left}%`,
                width: heart.size,
                height: heart.size,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
              }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
        </div>
      )}

      {/* Love Letter Modal */}
      <AnimatePresence>
        {showLoveLetter && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#fdfbf7] text-[#4a3b32] p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-[#e6d5c3] max-w-2xl w-full relative max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 50, rotate: 2 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-[#8c7365] hover:text-[#4a3b32] transition-colors p-2 text-xl font-bold rounded-full hover:bg-[#ebdccf]/40 cursor-pointer"
                onClick={() => setShowLoveLetter(false)}
              >
                ✕
              </button>

              {/* Letter Design Elements */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-400 via-pink-400 to-red-400 rounded-t-xl" />
              
              <div className="text-center space-y-6 pt-4">
                <div className="font-script text-5xl md:text-6xl text-[#b54a4a] mb-2 select-text">Dearest Chitrangi,</div>
                <div className="font-cinematic text-lg md:text-xl leading-relaxed italic text-[#5c4a3e] px-2 md:px-6 select-text">
                  "Every year spent with you is a new chapter of a beautiful fairy tale.
                  From the laughs we shared in college to the quiet moments we cherish today, 
                  you have made my world infinitely brighter and filled my heart with endless love.
                  Thank you for being my partner, my best friend, and my home. 
                  Happy Anniversary! Here is to forever and always."
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5 pt-4">
                  <div className="font-script text-4xl text-[#b54a4a] select-text">With love,</div>
                  <div className="font-script text-5xl text-[#4a3b32] select-text">Aryan</div>
                  <div className="w-12 h-12 text-red-500 animate-heartbeat flex items-center justify-center text-3xl mt-2">❤️</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
