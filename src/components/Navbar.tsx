import React from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface NavbarProps {
  activeProfile: { id: number; name: string; color: string };
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  showSearchInput: boolean;
  setShowSearchInput: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentScreen: string;
  handleNavClick: (target: 'home' | 'category' | 'favorites', categoryName?: string) => void;
  activeCategory?: string;
  onProfileSelect: (profileName: string, color: string) => void;
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
  onProfileSelect
}) => {
  const isHome = currentScreen === 'home';
  const isFavorites = currentScreen === 'favorites';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[4%] py-4 bg-gradient-to-b from-black/70 to-transparent" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Left Side: Logo + Nav Links */}
      <div className="flex items-center">
        <div className="text-xl font-bold text-[#e50914] mr-6" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>NETFLIX</div>
        <nav className="flex items-center gap-5 text-sm">
          <button
            onClick={() => handleNavClick('home')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('category')}
            data-category="To be Happy"
            className={`text-sm transition-colors ${isHome && activeCategory === 'To be Happy' ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            To be Happy
          </button>
          <button
            onClick={() => handleNavClick('category')}
            data-category="Travel"
            className={`text-sm transition-colors ${isHome && activeCategory === 'Travel' ? 'text-white font-bold' : 'text-gray-300'} hover:text-white`}
          >
            Travel
          </button>
          <button
            onClick={() => handleNavClick('category')}
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

        {/* Notifications Icon */}
        <button className="text-gray-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 17h5l-5 5v-5zM6 17h5l-5 5v-5zM12 3v1m0 16v1m8.66-15.66l-.71.71M6.05 17.95l-.71.71M21 12h-1M4 12H3m17.66 5.66l-.71-.71M6.05 6.05l-.71-.71" />
          </svg>
        </button>

        {/* Profile Switcher */}
        <div className="relative">
          <button
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowProfileMenu(true)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className={`w-8 h-8 rounded ${activeProfile.color} flex items-center justify-center text-white text-sm font-bold`}>
              {activeProfile.name[0]}
            </div>
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
                {[
                  { name: 'Year 1', color: 'bg-blue-600' },
                  { name: 'Year 2', color: 'bg-pink-600' },
                  { name: 'Year 3', color: 'bg-green-600' }
                ].map((profile, index) => (
                  <button
                    key={profile.name}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      onProfileSelect(profile.name, profile.color);
                      setShowProfileMenu(false);
                    }}
                  >
                    <div className={`w-10 h-10 rounded ${profile.color} flex items-center justify-center text-white font-bold`}>
                      {profile.name[0]}
                    </div>
                    <span className="text-white">{profile.name}</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 my-1"></div>

              {/* Menu Items */}
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  Manage Profiles
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  Account
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
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
