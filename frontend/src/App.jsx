import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import AppRouter from './router/AppRouter';
import './i18n';

function App() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}

export default App;
