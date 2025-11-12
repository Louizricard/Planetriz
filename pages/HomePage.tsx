import React from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { useI18n } from '../hooks/useI18n';
import { SearchIcon } from '../components/Icons';
import { useApp } from '../hooks/useApp';

export const HomePage: React.FC = () => {
  const { t } = useI18n();
  const { services } = useApp();

  const availableServices = services.filter(s => s.status === 'disponível');

  return (
    <div className="min-h-screen bg-secondary animate-page-enter">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="w-full py-3 pl-12 pr-4 text-text-primary bg-white border border-border rounded-full focus:ring-primary focus:border-primary"
                placeholder={t('search_placeholder')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {availableServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};