import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, Service, Message } from '../types';
import { MOCK_USERS, MOCK_SERVICES } from '../constants';

interface AppContextType {
  users: User[];
  services: Service[];
  currentUser: User | null;
  login: (userId: number) => void;
  logout: () => void;
  createService: (serviceData: Omit<Service, 'id' | 'status' | 'delivery'>) => void;
  acceptService: (serviceId: number, clientId: number) => void;
  deliverService: (serviceId: number, fileName: string, message: string) => void;
  confirmCompletion: (serviceId: number) => void;
  chats: Record<string, Message[]>;
  sendMessage: (recipientId: number, text: string) => void;
  showToast: (message: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUserId = localStorage.getItem('freelance-user-id');
    if (savedUserId) {
        return MOCK_USERS.find(u => u.id === parseInt(savedUserId)) || null;
    }
    return null;
  });
  const [chats, setChats] = useState<Record<string, Message[]>>({
    '1-2': [
        { id: 1, senderId: 2, text: "Olá Maria, tudo bem? Vi seu perfil e gostei muito do seu trabalho de criação de logos.", timestamp: "10:00 AM"},
        { id: 2, senderId: 1, text: "Olá João! Que bom que gostou. Fico feliz em ajudar. Qual a sua ideia?", timestamp: "10:01 AM"},
    ]
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const login = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('freelance-user-id', String(user.id));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('freelance-user-id');
  };

  const createService = (serviceData: Omit<Service, 'id'|'status'|'delivery'>) => {
    setServices(prev => [
      ...prev,
      { ...serviceData, id: prev.length + 1, status: 'disponível' }
    ]);
  };

  const acceptService = (serviceId: number, clientId: number) => {
    setServices(prev =>
      prev.map(s => s.id === serviceId ? { ...s, status: 'em andamento', clientId } : s)
    );
  };
  
  const deliverService = (serviceId: number, fileName: string, message: string) => {
      setServices(prev => 
        prev.map(s => s.id === serviceId ? {...s, status: 'entregue', delivery: { fileName, message }} : s)
      );
  };

  const confirmCompletion = (serviceId: number) => {
    setServices(prev =>
      prev.map(s => s.id === serviceId ? { ...s, status: 'concluído' } : s)
    );
  };

  const sendMessage = (recipientId: number, text: string) => {
    if (!currentUser) return;
    const chatKey = [currentUser.id, recipientId].sort().join('-');
    const newMessage: Message = {
        id: Date.now(),
        senderId: currentUser.id,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChats(prev => ({
        ...prev,
        [chatKey]: [...(prev[chatKey] || []), newMessage]
    }));
  }

  const value = {
    users,
    services,
    currentUser,
    login,
    logout,
    createService,
    acceptService,
    deliverService,
    confirmCompletion,
    chats,
    sendMessage,
    showToast
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-accent text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-up z-50">
          {toastMessage}
        </div>
      )}
    </AppContext.Provider>
  );
};