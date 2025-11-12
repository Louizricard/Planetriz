import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { translations } from '../constants';
import { useApp } from '../hooks/useApp';

type Language = 'pt-BR' | 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

const getInitialLanguage = (): Language => {
    const browserLang = navigator.language.split(/[-_]/)[0];
    if(browserLang === 'pt') return 'pt-BR';
    if(browserLang === 'es') return 'es';
    return 'en';
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());
  const { showToast } = useApp();

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const message = translations[lang]['toast_language_changed'];
    showToast(message);
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
