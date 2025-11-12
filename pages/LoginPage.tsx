import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { Button } from '../components/Button';
import { BriefcaseIcon } from '../components/Icons';
import { supabase } from '../integrations/supabase/client';

export const LoginPage: React.FC = () => {
  const { t, setLanguage, language } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };
  
  const inputClasses = "mt-1 block w-full px-4 py-2 bg-white border border-border rounded-lg shadow-sm placeholder-gray-400 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";

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
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">{t('login_email')}</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">{t('login_password')}</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
          </div>
          <Button type="submit" className="w-full !py-3" disabled={loading}>
            {loading ? 'Entrando...' : t('login_button')}
          </Button>
        </form>
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