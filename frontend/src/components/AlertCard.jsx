import React from 'react';
import { motion } from 'framer-motion';

const ICONS = {
  flood: (
    <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12s3-3 6-3 6 3 6 3 3-3 6-3v8H3v-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  wind: (
    <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h13a3 3 0 100-6 3 3 0 10-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  cold: (
    <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M5 7l14 10M19 7L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  wildfire: (
    <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3s1 2 1 3a3 3 0 11-4 4c-1 0-2 1-2 2a6 6 0 0012 0c0-2-1-3-1-3s-2-2-2-4a2 2 0 10-4 0c0 2-2 4-2 4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
};

const AlertCard = ({ type, title, description, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
    >
      <div className="mb-3">{ICONS[type]}</div>
      <div className="font-semibold text-slate-800">{title}</div>
      <div className="text-sm text-slate-500 mt-2">{description}</div>
    </motion.div>
  );
};

export default AlertCard;
