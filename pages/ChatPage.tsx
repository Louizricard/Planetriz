import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { PaperclipIcon, SendIcon } from '../components/Icons';
import { NotFoundPage } from './NotFoundPage';
import { useApp } from '../hooks/useApp';
import { Message, User } from '../types';
import { supabase } from '@/integrations/supabase/client';

export const ChatPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useI18n();
  const { currentUser, users, services, sendMessage } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const service = services.find(s => s.id === serviceId);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!serviceId) return;
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('service_id', serviceId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data as Message[]);
      }
    };
    fetchMessages();

    const subscription = supabase
      .channel(`messages:${serviceId}`)
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `service_id=eq.${serviceId}` }, 
          (payload) => {
              setMessages(currentMessages => [...currentMessages, payload.new as Message]);
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [serviceId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !serviceId) return;
    sendMessage(serviceId, newMessage.trim());
    setNewMessage('');
  };

  if (!currentUser || !service) {
    return <NotFoundPage />;
  }

  const otherUserId = currentUser.id === service.autor_id ? service.client_id : service.autor_id;
  const otherUser = users.find(u => u.id === otherUserId);

  if (!otherUser) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-secondary">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${otherUser.id}`}>
            <img className="h-10 w-10 rounded-full object-cover" src={otherUser.avatar_url} alt={otherUser.nome}/>
          </Link>
          <div>
            <Link to={`/profile/${otherUser.id}`} className="font-bold text-text-primary hover:underline">{otherUser.nome}</Link>
            <p className="text-sm text-text-secondary">Conversa sobre: <span className="font-semibold">{service.titulo}</span></p>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow-sm ${msg.sender_id === currentUser.id ? 'bg-primary text-white' : 'bg-white text-text-primary'}`}>
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.sender_id === currentUser.id ? 'text-blue-200' : 'text-gray-500'} text-right`}>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button type="button" className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <PaperclipIcon className="h-6 w-6" />
            <span className="sr-only">{t('chat_send_file')}</span>
          </button>
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('chat_placeholder')}
            className="flex-1 block w-full bg-white border-border rounded-full py-2 px-4 focus:ring-primary focus:border-primary"
          />
          <button type="submit" className="p-2 text-white bg-primary rounded-full hover:bg-blue-600 transition-colors">
            <SendIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};