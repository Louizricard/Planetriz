import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { Button } from '../components/Button';
import { useApp } from '../hooks/useApp';

export const CreateServicePage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { createService, showToast } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [price, setPrice] = useState('');
  
  const inputClasses = "mt-1 block w-full px-4 py-2 bg-white border border-border rounded-lg shadow-sm placeholder-gray-400 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createService({
      titulo: title,
      descricao: description,
      categoria: category,
      prazo: deadline,
      preço: price,
    });
    
    showToast(t('toast_service_created'));
    navigate('/dashboard');
  };

  return (
    <div className="bg-secondary min-h-screen py-12 animate-page-enter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-text-primary mb-6">{t('create_service_title')}</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-secondary">{t('create_service_form_title')}</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary">{t('create_service_form_description')}</label>
              <textarea id="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} required className={inputClasses}></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary">{t('create_service_form_category')}</label>
              <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-text-secondary">{t('create_service_form_deadline')}</label>
                <input type="text" id="deadline" value={deadline} onChange={e => setDeadline(e.target.value)} required className={inputClasses} />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-secondary">{t('create_service_form_price')}</label>
                <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} required className={inputClasses} />
              </div>
            </div>
            <div className="pt-4">
                <Button type="submit" className="w-full !py-3">{t('create_service_form_button')}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};