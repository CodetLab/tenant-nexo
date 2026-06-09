import React, { useState } from 'react';
import { LoginCard } from './LoginCard';
import { RegisterCard } from './RegisterCard';
import styles from './Auth.module.css';

export const AuthPage: React.FC = () => {
  // 'login' o 'register' determinan qué componente renderizar
  const [view, setView] = useState<'login' | 'register'>('login');

  return (
    <div className={styles.page}>
      {view === 'login' ? (
        <LoginCard onSwitchToRegister={() => setView('register')} />
      ) : (
        <RegisterCard onSwitchToLogin={() => setView('login')} />
      )}
    </div>
  );
};

export default AuthPage;