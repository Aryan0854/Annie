import React from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { profileImages } from '../data/memories';

interface NavbarProps {
  activeProfile: { id: number; name: string; color: string };
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  showSearchInput: boolean;
  setShowSearchInput: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentScreen: string;
  handleNavClick: (target: 'home' | 'category' | 'favorites' | 'profiles', categoryName?: string) => void;
  activeCategory?: string;
  onProfileSelect: (profileName: string, color: string) => void;
  onLoveLetterClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeProfile,
  showProfileMenu,
  setShowProfileMenu,
  showSearchInput,
  setShowSearchInput,
  searchQuery,
  setSearchQuery,
  currentScreen,
  handleNavClick,
  activeCategory = '',
  onProfileSelect,
  onLoveLetterClick
}) => {
  const isHome = currentScreen === 'home';
  const isFavorites = currentScreen === 'favorites';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[4%] py-4 bg-gradient-to-b from-black/70 to-transparent" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Left Side: Logo + Nav Links */}
      <div className="flex items-center">
        <img src="/Netflix.svg" alt="Netflix" className="h-8 mr-6" />
        <nav className="flex items-center gap-5 text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('category', 'happy')}
            data-category="happy"
            className={`text-sm transition-colors ${isHome && activeCategory === 'happy' ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            Happy
          </button>
          <button
            onClick={() => handleNavClick('category', 'Travel')}
            data-category="Travel"
            className={`text-sm transition-colors ${isHome && activeCategory === 'Travel' ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            Travel
          </button>
          <button
            onClick={() => handleNavClick('category', 'Milestones')}
            data-category="Milestones"
            className={`text-sm transition-colors ${isHome && activeCategory === 'Milestones' ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            Milestones
          </button>
          <button
            onClick={() => handleNavClick('favorites')}
            className={`text-sm transition-colors ${isFavorites ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            My List
          </button>
        </nav>
      </div>

      {/* Right Side: Icons + Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        {showSearchInput ? (
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (searchQuery === '') setShowSearchInput(false); }}
              className="bg-black border border-white text-white px-3 py-1 w-48 focus:w-64 transition-all duration-300 outline-none text-sm"
              autoFocus
            />
            <button
              onClick={() => { setShowSearchInput(false); setSearchQuery(''); }}
              className="ml-2 text-gray-300 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button className="text-gray-300 hover:text-white transition-colors" onClick={() => setShowSearchInput(true)}>
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        )}

        {/* Love Letter Envelope */}
        {onLoveLetterClick && (
          <button
            className="text-red-500 hover:text-red-400 transition-all duration-300 hover:scale-110 flex items-center justify-center p-1.5 rounded-full hover:bg-red-500/10 cursor-pointer animate-pulse relative"
            onClick={onLoveLetterClick}
            title="An Anniversary Letter for You"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        )}

        {/* Profile Switcher */}
        <div className="relative">
          <button
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowProfileMenu(true)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {profileImages.find(p => p.name === activeProfile.name)?.imageUrl ? (
              <img
                src={profileImages.find(p => p.name === activeProfile.name)?.imageUrl}
                alt={activeProfile.name}
                className="w-8 h-8 rounded object-cover"
              />
            ) : (
              <div className={`w-8 h-8 rounded ${activeProfile.color} flex items-center justify-center text-white text-sm font-bold`}>
                {activeProfile.name[0]}
              </div>
            )}
            <ChevronDownIcon className="w-4 h-4 text-white" />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div
              className="absolute top-full right-0 mt-2 w-64 bg-black/95 border border-gray-700 rounded-md shadow-2xl overflow-hidden"
              style={{ zIndex: 1000 }}
            >
              {/* Arrow */}
              <div className="absolute -top-2 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/95"></div>

              {/* Profiles */}
              <div className="py-2">
                {profileImages.map((profile, index) => {
                  const colors = ['bg-blue-600', 'bg-pink-600', 'bg-green-600'];
                  return (
                    <button
                      key={profile.name}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors text-left"
                      onClick={() => {
                        onProfileSelect(profile.name, colors[index]);
                        setShowProfileMenu(false);
                      }}
                    >
                      <img
                        src={profile.imageUrl}
                        alt={profile.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-white text-sm font-medium">{profile.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 my-1"></div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setShowProfileMenu(false);
                    handleNavClick('profiles');
                  }}
                >
                  Manage Profiles
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setShowProfileMenu(false);
                    handleNavClick('profiles');
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
