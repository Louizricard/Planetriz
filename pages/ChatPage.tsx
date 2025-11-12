import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { PaperclipIcon, SendIcon } from '../components/Icons';
import { NotFoundPage } from './NotFoundPage';
import { useApp } from '../hooks/useApp';

export const ChatPage: React.FC = () => {
  const { id: otherUserId } = useParams<{ id: string }>();
  const { t } = useI18n();
  const { currentUser, users, chats, sendMessage } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = users.find(u => u.id === otherUserId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);
  
  if(!currentUser){
    return <NotFoundPage />;
  }
  
  if(!otherUser){
    return <p>Loading user...</p>
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if(newMessage.trim() === '') return;
    // This will need to be updated to pass a service ID
    // sendMessage(otherUser.id, newMessage);
    console.log("Send message functionality to be updated.");
    setNewMessage('');
  }

  const chatKey = [currentUser.id, otherUser.id].sort().join('-');
  const messages = chats[chatKey] || [];

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
                    <p className="text-sm text-green-500">Online</p>
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
                        <p className={`text-xs mt-1 ${msg.sender_id === currentUser.id ? 'text-blue-200' : 'text-gray-500'} text-right`}>{new Date(msg.created_at).toLocaleTimeString()}</p>
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