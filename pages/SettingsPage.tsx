import React from 'react';
import { useI18n } from '../hooks/useI18n';
import { Button } from '../components/Button';
import { useApp } from '../hooks/useApp';

export const SettingsPage: React.FC = () => {
  const { t, setLanguage, language } = useI18n();
  const { currentUser } = useApp();

  if(!currentUser) return null;

  const getLangButtonClass = (lang: string) => {
    return `px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
        language === lang
        ? 'bg-primary text-white border-primary'
        : 'bg-white text-text-secondary hover:bg-gray-100 border-gray-300'
    }`;
  }
  
  const inputClasses = "mt-1 block w-full px-4 py-2 bg-white border border-border rounded-lg shadow-sm placeholder-gray-400 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";

  return (
    <div className="bg-secondary min-h-screen py-12 animate-page-enter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary mb-8">{t('settings_title')}</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
          {/* Language Settings */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-4">{t('settings_language')}</h2>
            <div className="flex space-x-2">
                <button onClick={() => setLanguage('pt-BR')} className={getLangButtonClass('pt-BR')}>Português</button>
                <button onClick={() => setLanguage('en')} className={getLangButtonClass('en')}>English</button>
                <button onClick={() => setLanguage('es')} className={getLangButtonClass('es')}>Español</button>
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-4">{t('settings_theme')}</h2>
            <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm font-medium rounded-md transition-colors border bg-primary text-white border-primary">{t('settings_theme_light')}</button>
                <button className="px-4 py-2 text-sm font-medium rounded-md transition-colors border bg-white text-gray-400 border-gray-300 cursor-not-allowed">{t('settings_theme_dark')}</button>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-4">{t('settings_account')}</h2>
            <p className="text-text-secondary mb-4">{t('settings_account_info')}</p>
            <form className="space-y-4">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">{t('register_name')}</label>
                    <input type="text" id="name" defaultValue={currentUser.nome} className={inputClasses} />
                 </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">{t('login_email')}</label>
                    <input type="email" id="email" defaultValue={`${currentUser.nome.toLowerCase().replace(' ', '.')}@example.com`} className={inputClasses} />
                 </div>
            </form>
          </div>

          <div className="border-t border-gray-200 pt-6 text-right">
              <Button>{t('settings_button_save')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};