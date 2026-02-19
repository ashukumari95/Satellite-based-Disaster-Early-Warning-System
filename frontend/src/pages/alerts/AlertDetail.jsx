import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios'; // Import axios

const AlertDetailPage = () => {
  const { alertType } = useParams();
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');

  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState(null);
  const [error, setError] = useState('');

  // This hook runs when the page loads or the URL changes
  useEffect(() => {
    if (!location || !alertType) {
      setLoading(false);
      return;
    }

    // --- UPDATED: This function now makes a real API call ---
    const fetchDetailedData = async () => {
      setLoading(true);
      setError('');
      try {
        // Call your new, unified backend endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/detailed-alerts/${alertType}?location=${location}`);

        if (response.data.success) {
          setAlertData(response.data.data);
        } else {
          setError(response.data.message || 'No details found.');
        }

      } catch (err) {
        console.error("Error fetching detailed data:", err);
        setError('Could not connect to the server to get alert details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedData();

  }, [alertType, location]); // Re-run if the alert type or location changes

  if (loading) {
    return <div className="text-center p-10">Loading detailed report for {location}...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!alertData) {
    return <div className="text-center p-10">No alert details available for this selection.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{alertData.title}</h1>
        {location && <p className="text-xl text-gray-700 mb-6">Location: {location}</p>}

        {/* We can now display any data that comes from the backend */}
        <div className="mb-4">
          <p className="font-semibold">Details:</p>
          <p className="text-gray-600">{alertData.details}</p>
        </div>

        {alertData.timestamp && (
          <div className="mt-8 text-sm text-gray-400">
            <p>Report Generated: {alertData.timestamp}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertDetailPage;