import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-800 mb-4">{t('notFound.title')}</h1>
        <p className="text-xl text-neutral-600 mb-8">{t('notFound.message')}</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
