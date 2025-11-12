import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { Button } from '../components/Button';
import { BriefcaseIcon } from '../components/Icons';
import { useApp } from '../hooks/useApp';

export const LoginPage: React.FC = () => {
  const { t, setLanguage, language } = useI18n();
  const { login, users } = useApp();
  const navigate = useNavigate();

  // In a real app, this would be a form. Here, we'll let the user pick.
  const handleLogin = (userId: number) => {
    login(userId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center p-4 animate-page-enter">
        <div className="absolute top-4 right-4">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
                <option value="pt-BR">Português (BR)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-primary">
              <BriefcaseIcon className="h-8 w-8" />
              <span>Freelance</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-text-primary">{t('login_title')}</h2>
          <p className="text-sm text-text-secondary mt-2">Para fins de demonstração, selecione um usuário:</p>
        </div>
        <div className="space-y-4">
            {users.map(user => (
                <button 
                    key={user.id}
                    onClick={() => handleLogin(user.id)}
                    className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <img src={user.avatar} alt={user.nome} className="w-10 h-10 rounded-full"/>
                    <div className="ml-4 text-left">
                        <p className="font-semibold text-text-primary">{user.nome}</p>
                        <p className="text-sm text-text-secondary capitalize">{user.tipo}</p>
                    </div>
                </button>
            ))}
        </div>
         <p className="mt-6 text-center text-sm text-text-secondary">
          {t('login_no_account')}{' '}
          <Link to="/register" className="font-medium text-primary hover:text-blue-600">
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
};