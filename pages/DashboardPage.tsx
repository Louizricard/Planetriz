import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/ServiceCard';
import { useI18n } from '../hooks/useI18n';
import { useApp } from '../hooks/useApp';
import { Service } from '../types';
import { Button } from '../components/Button';
import { UploadModal } from '../components/UploadModal';

type Tab = 'created' | 'accepted' | 'delivered' | 'history';

const DashboardServiceCard: React.FC<{service: Service}> = ({ service }) => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const { currentUser, deliverService, confirmCompletion, showToast } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeliver = (fileName: string, message: string) => {
        deliverService(service.id, fileName, message);
        showToast(t('toast_service_delivered'));
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        confirmCompletion(service.id);
        showToast(t('toast_service_completed'));
    }

    const isFreelancer = currentUser?.tipo === 'freelancer';
    const isClient = currentUser?.tipo === 'client';
    const isOngoing = service.status === 'em andamento' || service.status === 'entregue';

    let actionButton = null;
    if (isFreelancer && service.status === 'em andamento') {
        actionButton = <Button variant="accent" onClick={() => setIsModalOpen(true)} className="w-full">{t('dashboard_send_delivery')}</Button>;
    } else if (isClient && service.status === 'entregue') {
        actionButton = <Button variant="accent" onClick={handleConfirm} className="w-full">{t('dashboard_confirm_completion')}</Button>;
    }
    
    let chatButton = null;
    if (isOngoing) {
        chatButton = <Button variant="secondary" onClick={() => navigate(`/chat/${service.id}`)} className="w-full">{t('chat_go_to')}</Button>;
    }

    return (
        <>
            <div className="flex flex-col h-full">
                <ServiceCard service={service}/>
                <div className="px-6 pb-6 -mt-3 space-y-2">
                    {actionButton}
                    {chatButton}
                </div>
            </div>
            {isModalOpen && (
                <UploadModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleDeliver}
                />
            )}
        </>
    )
}

export const DashboardPage: React.FC = () => {
  const { t } = useI18n();
  const { currentUser, services } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('created');

  if (!currentUser) return null;

  const createdServices = services.filter(s => s.autor_id === currentUser.id && s.status === 'disponível');
  const acceptedServices = services.filter(s => (s.client_id === currentUser.id || s.autor_id === currentUser.id) && s.status === 'em andamento');
  const deliveredServices = services.filter(s => (s.client_id === currentUser.id || s.autor_id === currentUser.id) && s.status === 'entregue');
  const historyServices = services.filter(s => (s.client_id === currentUser.id || s.autor_id === currentUser.id) && s.status === 'concluído');

  const renderServices = () => {
    let servicesToRender: Service[];

    switch (activeTab) {
      case 'created':
        servicesToRender = createdServices;
        break;
      case 'accepted':
        servicesToRender = acceptedServices;
        break;
      case 'delivered':
        servicesToRender = deliveredServices;
        break;
      case 'history':
        servicesToRender = historyServices;
        break;
      default:
        servicesToRender = [];
    }

    if (servicesToRender.length === 0) {
        return <p className="text-text-secondary text-center col-span-full mt-8">Nenhum serviço encontrado aqui.</p>
    }

    return servicesToRender.map(service => <DashboardServiceCard key={service.id} service={service} />);
  };
  
  const getTabClass = (tabName: Tab) => {
    return `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabName 
        ? 'bg-primary text-white' 
        : 'text-text-secondary hover:bg-gray-200'
    }`;
  }

  return (
    <div className="bg-secondary min-h-screen py-12 animate-page-enter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-text-primary mb-8">{t('dashboard')}</h1>
        
        <div className="mb-8">
            <div className="bg-white rounded-lg p-2 inline-flex space-x-2 shadow-sm">
                <button onClick={() => setActiveTab('created')} className={getTabClass('created')}>
                    {t('dashboard_created')}
                </button>
                <button onClick={() => setActiveTab('accepted')} className={getTabClass('accepted')}>
                    {t('dashboard_accepted')}
                </button>
                 <button onClick={() => setActiveTab('delivered')} className={getTabClass('delivered')}>
                    {t('dashboard_delivered')}
                </button>
                <button onClick={() => setActiveTab('history')} className={getTabClass('history')}>
                    {t('dashboard_history')}
                </button>
            </div>
        </div>

        <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-tab-content-enter">
          {renderServices()}
        </div>
      </div>
    </div>
  );
};