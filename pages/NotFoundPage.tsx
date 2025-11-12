
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-text-primary">Página não encontrada</h2>
      <p className="mt-2 text-text-secondary">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link to="/" className="mt-6">
        <Button>Voltar para a Home</Button>
      </Link>
    </div>
  );
};
