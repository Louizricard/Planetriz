import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types';
import { Button } from './Button';
import { useI18n } from '../hooks/useI18n';
import { useApp } from '../hooks/useApp';
import { StatusBadge } from './StatusBadge';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { users } = useApp();
  
  const author = users.find(u => u.id === service.autor_id);

  if (!author) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-transparent p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="ml-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-transparent hover:border-border overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-center mb-2">
            <p className="uppercase tracking-wide text-sm text-primary font-semibold">{service.categoria}</p>
            <StatusBadge status={service.status} />
        </div>
        <h3 className="block mt-1 text-lg leading-tight font-bold text-text-primary h-14">{service.titulo}</h3>
        <div className="mt-4 flex items-center">
          <img className="h-10 w-10 rounded-full object-cover" src={author.avatar_url} alt={author.nome} />
          <div className="ml-3">
            <p className="text-sm font-medium text-text-primary">{author.nome}</p>
            <p className="text-xs text-text-secondary capitalize">{t(`register_${author.tipo}`)}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-accent font-bold text-lg">{service.preço}</p>
          <p className="text-sm text-text-secondary">{service.prazo}</p>
        </div>
      </div>
       <div className="p-6 pt-0">
         <Button onClick={() => navigate(`/service/${service.id}`)} className="w-full">
            {t('service_card_details')}
          </Button>
       </div>
    </div>
  );
};