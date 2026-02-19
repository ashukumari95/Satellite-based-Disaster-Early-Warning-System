import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MapSection from '../components/MapSection'; // Your component that shows the map

const Map = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');

  // State to hold data from the backend
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // This will run automatically when the 'location' from the URL changes
  useEffect(() => {
    if (!location) {
      setIsLoading(false);
      return; // Do nothing if there's no location in the URL
    }

    const fetchMapData = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Call your backend API
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/warnings?location=${location}`);
        setMapData(response.data); // Save the data from the backend
      } catch (err) {
        console.error("Failed to fetch map data:", err);
        setError(`Could not fetch data for ${location}.`);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchMapData();
  }, [location]); // Dependency array: re-run the effect if 'location' changes

  // Render content based on the state
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center">Loading map data for {location}...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
    if (mapData) {
      // Pass the fetched data to the MapSection component
      return <MapSection mapData={mapData} />;
    }
    return <p className="text-center">Search for a location to see the map.</p>;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('map.title')}</h1>
      {renderContent()}
    </div>
  );
};

export default Map;