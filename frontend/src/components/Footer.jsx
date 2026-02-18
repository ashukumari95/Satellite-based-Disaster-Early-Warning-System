import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = 2025; // fixed as requested

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-neutral-800 text-white p-4 mt-auto">
      <div className="container mx-auto flex items-center justify-between">
  <div className="text-sm">© 2025 Satellite Based Disaster Early Warning System. All rights reserved.</div>
        <div className="text-sm">Local time: <span className="font-medium">{now.toLocaleTimeString()}</span></div>
      </div>
    </footer>
  );
};

export default Footer;
