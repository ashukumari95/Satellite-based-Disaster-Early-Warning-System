import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6 bg-white shadow-sm rounded-lg mx-2 sm:mx-4 my-4 sm:my-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
