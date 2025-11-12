import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, Service, Message } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface AppContextType {
  users: User[];
  services: Service[];
  currentUser: User | null;
  logout: () => void;
  createService: (serviceData: Omit<Service, 'id' | 'status' | 'client_id' | 'autor_id'>) => void;
  acceptService: (serviceId: string, clientId: string) => void;
  deliverService: (serviceId: string, fileName: string, message: string) => void;
  confirmCompletion: (serviceId: string) => void;
  chats: Record<string, Message[]>;
  sendMessage: (recipientId: string, text: string, serviceId: string) => void;
  showToast: (message: string) => void;
  session: Session | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          fetchUserProfile(session.user.id);
        } else {
          setCurrentUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: usersData, error: usersError } = await supabase.from('profiles').select('*');
      if (usersError) console.error('Error fetching users:', usersError);
      else setUsers(usersData as User[]);

      const { data: servicesData, error: servicesError } = await supabase.from('services').select('*');
      if (servicesError) console.error('Error fetching services:', servicesError);
      else setServices(servicesData as Service[]);
    };
    fetchInitialData();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) console.error('Error fetching profile:', error);
    else setCurrentUser(data as User);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  const createService = async (serviceData: Omit<Service, 'id' | 'status' | 'client_id' | 'autor_id'>) => {
    if (!currentUser) return;
    const newService = { ...serviceData, autor_id: currentUser.id, status: 'disponível' as const };
    const { data, error } = await supabase.from('services').insert(newService).select().single();
    if (error) console.error('Error creating service:', error);
    else setServices(prev => [...prev, data as Service]);
  };

  // Placeholder functions
  const acceptService = () => console.warn('acceptService not implemented');
  const deliverService = () => console.warn('deliverService not implemented');
  const confirmCompletion = () => console.warn('confirmCompletion not implemented');
  const sendMessage = () => console.warn('sendMessage not implemented');

  const value = {
    users,
    services,
    currentUser,
    logout,
    createService,
    acceptService,
    deliverService,
    confirmCompletion,
    chats: {},
    sendMessage,
    showToast,
    session,
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