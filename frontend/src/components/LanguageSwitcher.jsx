import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-white text-neutral-800 p-2 rounded border border-neutral-300 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
};

export default LanguageSwitcher;
