// LeaderboardDataContext.js
import React, { createContext, useState, useEffect } from 'react';

const LeaderboardDataContext = createContext({
  leaderboardData: null,
  refreshLeaderboard: () => {},
  loading: true,
  error: null,
});

export const LeaderboardDataProvider = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('I AKDABKN OAIBD');
  const refreshLeaderboard = async () => {
    setLoading(true);
    try {
      console.log('I am here');
      const jwtToken = 'eyJraWQiOiI2YmxCTU5iMTkwNVZlKzJEZmRRK0VHVHJzaVVJQTdMdkVxMUNhUFNPZTNvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMmEyNjJlOC1kMzE2LTRjZmItODFhNy0zNWNlNGM3NDAxODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmdnY1FOZWhFIiwiY29nbml0bzp1c2VybmFtZSI6ImYyYTI2MmU4LWQzMTYtNGNmYi04MWE3LTM1Y2U0Yzc0MDE4NCIsIm9yaWdpbl9qdGkiOiJmYzc5NmUzNy05OTYwLTQzZTAtOTU4YS01ZTUxYTMzNzdlYTAiLCJhdWQiOiIyNzlibGEycGJjN2lla2dmaWczdWY5NHQ2YyIsImV2ZW50X2lkIjoiNDA0ODY1YTQtYjhmMy00MDBkLWIzYzYtM2ZmOTRiMzFlOWRhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDgxMTc0MTIsImV4cCI6MTcwODEyMTAxMiwiaWF0IjoxNzA4MTE3NDEyLCJqdGkiOiJjZWM0MDYxYS1lZGJlLTQ0OTAtYWJiOS1iMjJkOTQxYzEyMDciLCJlbWFpbCI6IkdhYnJpZWwub3BwZXJtYW5uMTk5N0BnbWFpbC5jb20ifQ.amgdPU1dz3303skI-Fzs5yG-Bfd3lhJGq1CRMLF64PR3c_KWc_cYUyCYaKepXyIWPTGPRJkx2AEXuO-0LeyuS3GODDtA1qXj9EBWinvQMlFiOZvxrAhIaZldUhRORV0i-si0aij4iOvmfQCck8QrqZrtaIYKKS7SkS7JGw8fPa891EoGf7COEX4eEqg_GKTcapUwQwfRLItowtK36Ig5xEQvx6_45-Fjsz0tvgcwRu8gh0qgF9g7MqOv99NNWvuTecjnJk1vEJZB8VzgoRfKaXyjt_JJuRZL0P0hRdLq_mTFn5HiWVmj7tZp0MxCIB_uQPPadqmZiYOYRitialn6dg'; 
      const url = 'https://2p707s12ml.execute-api.eu-west-2.amazonaws.com/dev_1/frontend'; // Use your actual API endpoint

      const response = await fetch(url, {
        method: 'GET', // or 'GET' if your API requires
        headers: new Headers({
          'Authorization': `Bearer ${jwtToken}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
      }
      console.log('Fetching loaderboard data...');
      const data = await response.json();
      console.log('Leaderbard data received:', data);
      setLeaderboardData(data); // Assuming the JSON response is the data you want
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
      setError(error.message);
      setLoading(false);
      // You can also handle errors by setting an error state and providing it through context
    }
  };

  // When the provider is mounted, call refreshData to load the initial data
  useEffect(() => {
    refreshLeaderboard();
  }, []);

  return (
    <LeaderboardDataContext.Provider value={{ leaderboardData, refreshLeaderboard , loading, error}}>
      {children}
    </LeaderboardDataContext.Provider>
  );
};

export default LeaderboardDataContext;
