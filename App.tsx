import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
// Fix: Import useApp from hooks/useApp instead of contexts/AppContext
import { AppProvider } from './contexts/AppContext';
import { useApp } from './hooks/useApp';
import { I18nProvider } from './contexts/I18nContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CreateServicePage } from './pages/CreateServicePage';
import { ProfilePage } from './pages/ProfilePage';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ProtectedRoute: React.FC = () => {
    const { currentUser } = useApp();
    return currentUser ? <MainLayout /> : <Navigate to="/login" replace />;
}

const AppRoutes: React.FC = () => {
  return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/create" element={<CreateServicePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
  )
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <I18nProvider>
        <AppRoutes />
        <Toast />
      </I18nProvider>
    </AppProvider>
  );
};

export default App;
