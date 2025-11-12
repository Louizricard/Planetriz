import React from 'react';
import { useParams } from 'react-router-dom';
import { ServiceCard } from '../components/ServiceCard';
import { NotFoundPage } from './NotFoundPage';
import { useI18n } from '../hooks/useI18n';
import { useApp } from '../hooks/useApp';

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const { users, services } = useApp();

  const user = users.find(u => u.id === parseInt(id || ''));
  
  if (!user) {
    return <NotFoundPage />;
  }

  const userServices = services.filter(s => s.autorId === user.id);
  const mockSkills = ['Branding', 'UI/UX Design', 'React', 'Node.js', 'Figma', 'SEO'];
  const mockPortfolio = [1, 2, 3, 4, 5, 6].map(i => `https://picsum.photos/seed/${user.nome}${i}/500/300`);

  return (
    <div className="bg-secondary min-h-screen animate-page-enter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:flex md:items-center md:space-x-8">
          <img className="h-32 w-32 rounded-full mx-auto md:mx-0 object-cover" src={user.avatar} alt={user.nome} />
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-text-primary">{user.nome}</h1>
            <p className="text-primary font-semibold capitalize">{user.tipo}</p>
            <p className="mt-2 text-text-secondary">{user.bio}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('profile_skills')}</h2>
            <div className="flex flex-wrap gap-2">
                {mockSkills.slice(0, user.tipo === 'freelancer' ? 6 : 2).map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
        </div>

        {/* Portfolio for Freelancers */}
        {user.tipo === 'freelancer' && (
             <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">{t('profile_portfolio')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mockPortfolio.map(img => (
                        <div key={img} className="overflow-hidden rounded-lg">
                            <img src={img} alt="Portfolio item" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Services */}
        {userServices.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t('profile_services_by')} {user.nome}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {userServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};