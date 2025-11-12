
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="#" className="text-sm hover:text-primary transition-colors">{t('footer_about')}</Link>
          <Link to="#" className="text-sm hover:text-primary transition-colors">{t('footer_terms')}</Link>
          <Link to="#" className="text-sm hover:text-primary transition-colors">{t('footer_support')}</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Freelance. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
