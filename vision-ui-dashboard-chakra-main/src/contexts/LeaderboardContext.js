// LeaderboardContext.js
import React, { createContext, useState, useEffect } from 'react';

const LeaderboardDataContext = createContext({
  leaderboardData: [],
  refreshLeaderboardData: () => {},
  loading: true,
  error: null,
});

export const LeaderboardDataProvider = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshLeaderboardData = async () => {
    setLoading(true);
    try {
      const jwtToken = 'eyJraWQiOiI2YmxCTU5iMTkwNVZlKzJEZmRRK0VHVHJzaVVJQTdMdkVxMUNhUFNPZTNvPSIsImFsZyI6IlJTMjU2In0';
      const url = 'https://2p707s12ml.execute-api.eu-west-2.amazonaws.com/dev_1/frontend';

      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming the JSON response needs to be processed to fit your component
      const processedData = Object.entries(data).map(([key, value]) => ({
        username: key,
        ...value
      }));
      setLeaderboardData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLeaderboardData();
  }, []);

  return (
    <LeaderboardDataContext.Provider value={{ leaderboardData, refreshLeaderboardData, loading, error }}>
      {children}
    </LeaderboardDataContext.Provider>
  );
};

export default LeaderboardDataContext;
