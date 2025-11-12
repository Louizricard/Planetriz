import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { Button } from '../components/Button';
import { useI18n } from '../hooks/useI18n';
import { NotFoundPage } from './NotFoundPage';
import { useApp } from '../hooks/useApp';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { services, users, currentUser, acceptService, showToast } = useApp();

  const service = services.find(s => s.id === id);
  
  if (!service) {
    return <p>Loading service or not found...</p>;
  }

  const author = users.find(u => u.id === service.autor_id);

  if (!author) {
    return <p>Loading author or not found...</p>;
  }

  const handleAccept = () => {
    if(!currentUser) return;
    acceptService(service.id, currentUser.id);
    showToast(t('toast_service_accepted'));
    navigate(`/chat/${author.id}`);
  }

  const canAccept = currentUser?.tipo === 'client' && service.status === 'disponível' && currentUser.id !== service.autor_id;

  return (
    <div className="bg-secondary min-h-screen py-12 animate-page-enter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-3 lg:gap-x-8 p-8">
          <div className="lg:col-span-2">
            <p className="text-base font-semibold uppercase tracking-wide text-primary">{service.categoria}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">{service.titulo}</h1>
            <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-text-primary mb-2">{t('service_details_description')}</h2>
                <p className="text-text-secondary">{service.descricao}</p>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-text-secondary">{t('service_details_price')}</span>
                    <span className="text-2xl font-bold text-accent">{service.preço}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-text-secondary">{t('service_details_deadline')}</span>
                    <span className="text-lg font-semibold text-text-primary">{service.prazo}</span>
                </div>
                {canAccept && (
                    <Button onClick={handleAccept} className="w-full !py-3">
                        {t('service_details_accept')}
                    </Button>
                )}
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-text-primary">{t('service_details_about_author')}</h3>
                    <div className="mt-4 flex items-center">
                        <img className="h-14 w-14 rounded-full object-cover" src={author.avatar_url} alt={author.nome} />
                        <div className="ml-4">
                            <Link to={`/profile/${author.id}`} className="text-lg font-semibold text-text-primary hover:text-primary">{author.nome}</Link>
                            <p className="text-sm text-text-secondary capitalize">{author.tipo}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-text-secondary">{author.bio}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};