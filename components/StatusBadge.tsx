import React from 'react';
import { ServiceStatus } from '../types';

interface StatusBadgeProps {
  status: ServiceStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: Record<ServiceStatus, { bg: string; text: string; label: string }> = {
    'disponível': { bg: 'bg-status-available', text: 'text-status-available-text', label: 'Disponível' },
    'em andamento': { bg: 'bg-status-progress', text: 'text-status-progress-text', label: 'Em Andamento' },
    'entregue': { bg: 'bg-status-delivered', text: 'text-status-delivered-text', label: 'Entregue' },
    'concluído': { bg: 'bg-status-completed', text: 'text-status-completed-text', label: 'Concluído' },
  };

  const style = statusStyles[status] || statusStyles['disponível'];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};
