// ChallengesDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'components/Authentication/authContext';

const ChallengesDataContext = createContext({
  challengesData: [],
  refreshChallenges: () => {},
  loading: true,
  error: null,
});

export const ChallengesDataProvider = ({ children }) => {
  const [challengesData, setChallengesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jwtToken } = useAuth();

  useEffect(() => {
    if (jwtToken) {
      refreshChallenges();
    }
  }, [jwtToken]);

  const refreshChallenges = async () => {
    if (!jwtToken) {
      console.log('No JWT token available, skipping data fetch.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = 'https://ipo3rrju8j.execute-api.eu-west-2.amazonaws.com/dev/frontend';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch challenges');
      }

      const data = await response.json();
      console.log('Fetched data for challenges:', data);
      setChallengesData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching challenges:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <ChallengesDataContext.Provider value={{ challengesData, refreshChallenges, loading, error }}>
      {children}
    </ChallengesDataContext.Provider>
  );
};

export default ChallengesDataContext;
