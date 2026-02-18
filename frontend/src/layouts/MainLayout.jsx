import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
