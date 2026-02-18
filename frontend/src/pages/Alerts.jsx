import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertCard from '../components/AlertCard';
import MapSection from '../components/MapSection';

const alertCards = [
  { type: 'flood', title: 'Flood Warning', description: 'High water levels expected. Stay informed.' },
  { type: 'wind', title: 'High Winds', description: 'Strong winds forecasted. Secure loose objects.' },
  { type: 'cold', title: 'Extreme Cold', description: 'Freezing temperatures. Stay warm and safe.' },
  { type: 'wildfire', title: 'Wildfire Alert', description: 'Increased fire risk. Be cautious.' },
];

const Alerts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCardClick = (type) => {
    navigate(`/alerts/${type}?location=${encodeURIComponent(search)}`);
  };

  const handleMapSearch = async () => {
    if (!search) {
      setError('Please enter a location to search.');
      return;
    }
    setIsLoading(true);
    setError('');
    setWarnings([]);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/warnings?location=${search}`);
      
      // --- THE FIX ---
      // The actual weather data is inside response.data.data
      if (response.data.success) {
        setWarnings([response.data.data]);
      } else {
        setError(response.data.message || 'No data found for this location.');
      }

    } catch (err) {
      console.error("Error fetching map data:", err);
      setError('Could not fetch map data for this location.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm mb-4 sm:mb-6">
        <div className="flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a location for the map below (e.g., Jaipur)"
            className="w-full p-3 sm:p-4 rounded-l-full border border-gray-200 shadow-sm text-sm sm:text-base focus:outline-none"
          />
          <button 
            onClick={handleMapSearch}
            disabled={isLoading}
            className="px-6 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? '...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 sm:mb-6">
        {alertCards.map((c) => (
          <AlertCard key={c.type} type={c.type} title={c.title} description={c.description} onClick={() => handleCardClick(c.type)} />
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('alerts.interactiveMap')}</h3>
        <p className="text-sm text-gray-500 mb-4">{t('alerts.viewActiveWarnings')}</p>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <MapSection warnings={warnings} />
      </div>
    </div>
  );
};

export default Alerts;