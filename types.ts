export type UserType = 'freelancer' | 'client';

export interface User {
  id: string;
  nome: string;
  tipo: UserType;
  bio: string;
  avatar_url: string;
}

export type ServiceStatus = 'disponível' | 'em andamento' | 'entregue' | 'concluído';

export interface Service {
  id: string;
  titulo: string;
  autor_id: string;
  preço: string;
  prazo: string;
  descricao: string;
  categoria: string;
  status: ServiceStatus;
  client_id?: string;
}

export interface Message {
    id: number;
    sender_id: string;
    content: string;
    created_at: string;
    service_id: string;
}