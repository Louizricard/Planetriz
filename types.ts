export type UserType = 'freelancer' | 'client';

export interface User {
  id: number;
  nome: string;
  tipo: UserType;
  bio: string;
  avatar: string;
}

export type ServiceStatus = 'disponível' | 'em andamento' | 'entregue' | 'concluído';

export interface Service {
  id: number;
  titulo: string;
  autorId: number;
  preço: string;
  prazo: string;
  descricao: string;
  categoria: string;
  status: ServiceStatus;
  clientId?: number;
  delivery?: {
    fileName: string;
    message: string;
  };
}

export interface Message {
    id: number;
    senderId: number;
    text: string;
    timestamp: string;
}