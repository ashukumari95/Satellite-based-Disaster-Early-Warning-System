import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LiveGlobe from '../components/LiveGlobe';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center bg-gray-800 p-4 sm:p-12">
        <div className="w-full sm:w-1/2 max-w-md">
          <LiveGlobe />
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 sm:pl-12 mt-4 sm:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-400 mb-4 sm:mb-6 max-w-xl px-4 sm:px-0">
            {t('home.welcome')}
          </h2>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white mb-4 max-w-lg px-4 sm:px-0">
            {t('home.stayAhead')}
          </h1>
          <p className="text-gray-300 max-w-md text-sm sm:text-base md:text-lg mb-6 px-4 sm:px-0">
            {t('home.description')}
          </p>
          <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 pointer-cursor">
            {t('home.getStarted')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
