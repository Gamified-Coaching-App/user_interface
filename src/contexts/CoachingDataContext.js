import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'components/Authentication/authContext';

const CoachingDataContext = createContext({
  coachingData: [],
  refreshCoaching: () => {},
  loading: true,
  error: null,
});

export const CoachingDataProvider = ({ children }) => {
  const [coachingData, setCoachingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jwtToken } = useAuth();

  useEffect(() => {
    if (jwtToken) {
      refreshCoaching();
    }
  }, [jwtToken]);

  const refreshCoaching = async () => {
    if (!jwtToken) {
      console.log('No JWT token available, skipping data fetch.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = 'http://Coachi-Coach-bgtKlzJd2GCw-908383528.eu-west-2.elb.amazonaws.com/frontend';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      console.log('Fetching coaching data...');
      if (!response.ok) {
        throw new Error('Failed to fetch coaching data');
      }

      const data = await response.json();
      console.log('Fetched coaching data:', data);
      setCoachingData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coaching data:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <CoachingDataContext.Provider value={{ coachingData, refreshCoaching, loading, error }}>
      {children}
    </CoachingDataContext.Provider>
  );
};

export default CoachingDataContext;
