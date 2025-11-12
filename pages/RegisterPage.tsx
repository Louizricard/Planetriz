import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { Button } from '../components/Button';
import { BriefcaseIcon } from '../components/Icons';
import { UserType } from '../types';
import { supabase } from '../integrations/supabase/client';

export const RegisterPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('freelancer');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          tipo: userType,
          avatar_url: `https://picsum.photos/seed/${encodeURIComponent(nome)}/200`
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Cadastro realizado! Por favor, verifique seu e-mail para confirmar sua conta.');
    }
    setLoading(false);
  };
  
  const inputClasses = "mt-1 block w-full px-4 py-2 bg-white border border-border rounded-lg shadow-sm placeholder-gray-400 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center p-4 animate-page-enter">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-primary">
              <BriefcaseIcon className="h-8 w-8" />
              <span>Freelance</span>
            </Link>
          <h2 className="mt-4 text-2xl font-bold text-text-primary">{t('register_title')}</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary">{t('register_name')}</label>
            <input type="text" id="name" value={nome} onChange={e => setNome(e.target.value)} required className={inputClasses} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">{t('login_email')}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">{t('login_password')}</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
          </div>
          <div>
             <label className="block text-sm font-medium text-text-secondary">{t('register_user_type')}</label>
             <div className="mt-2 grid grid-cols-2 gap-3">
                <label className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary has-[:checked]:bg-primary has-[:checked]:text-white has-[:checked]:border-transparent">
                    <input type="radio" name="user-type" value={'freelancer' as UserType} checked={userType === 'freelancer'} onChange={() => setUserType('freelancer')} className="sr-only" />
                    <span>{t('register_freelancer')}</span>
                </label>
                 <label className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary has-[:checked]:bg-primary has-[:checked]:text-white has-[:checked]:border-transparent">
                    <input type="radio" name="user-type" value={'client' as UserType} checked={userType === 'client'} onChange={() => setUserType('client')} className="sr-only" />
                    <span>{t('register_client')}</span>
                </label>
             </div>
          </div>
          <Button type="submit" className="w-full !py-3" disabled={loading}>
            {loading ? 'Cadastrando...' : t('register_button')}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-text-secondary">
          {t('register_have_account')}{' '}
          <Link to="/login" className="font-medium text-primary hover:text-blue-600">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
};