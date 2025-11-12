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

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else if (data) {
      setCurrentUser(data as User);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  // Placeholder functions to avoid breaking the app, will be implemented next
  const createService = () => console.warn('createService not implemented');
  const acceptService = () => console.warn('acceptService not implemented');
  const deliverService = () => console.warn('deliverService not implemented');
  const confirmCompletion = () => console.warn('confirmCompletion not implemented');
  const sendMessage = () => console.warn('sendMessage not implemented');

  const value = {
    users: [], // Placeholder, will be fetched from Supabase
    services: [], // Placeholder, will be fetched from Supabase
    currentUser,
    logout,
    createService,
    acceptService,
    deliverService,
    confirmCompletion,
    chats: {}, // Placeholder
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