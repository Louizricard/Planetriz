import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { Button } from './Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileName: string, message: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file.name, message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-text-primary mb-6">{t('upload_modal_title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">{t('upload_modal_file')}</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Carregar um arquivo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  {file ? <p className="text-sm text-gray-500">{file.name}</p> : <p className="text-xs text-gray-500">PNG, JPG, ZIP até 25MB</p>}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary">{t('upload_modal_message')}</label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>{t('upload_modal_cancel')}</Button>
            <Button type="submit" variant="accent" disabled={!file}>{t('upload_modal_button')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
