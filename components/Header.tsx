import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { SearchIcon, BriefcaseIcon, ChevronDownIcon, PlusIcon } from './Icons';
import { useApp } from '../hooks/useApp';

export const Header: React.FC = () => {
  const { t } = useI18n();
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  }

  if (!currentUser) return null; // Don't render header if not logged in

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
              <BriefcaseIcon className="h-8 w-8" />
              <span>Freelance</span>
            </Link>
          </div>

          <div className="hidden md:block w-full max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full bg-white border border-border rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder={t('search_placeholder')}
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
             {currentUser.tipo === 'freelancer' && (
                <Link to="/create" className="hidden sm:flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-emerald-600 transition-colors">
                  <PlusIcon className="h-5 w-5 mr-1"/>
                  {t('create_service_title')}
                </Link>
              )}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <img className="h-9 w-9 rounded-full object-cover" src={currentUser.avatar} alt={currentUser.nome} />
                <span className="hidden lg:inline text-sm font-medium text-text-primary">{currentUser.nome}</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>{t('dashboard')}</Link>
                  <Link to={`/profile/${currentUser.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>{t('profile')}</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>{t('settings')}</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('logout')}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};