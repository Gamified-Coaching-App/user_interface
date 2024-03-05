// TrainingDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'components/Authentication/authContext';

const TrainingDataContext = createContext({
  trainingData: null,
  refreshData: () => {},
  loading: true,
  error: null,
});

export const TrainingDataProvider = ({ children }) => {

  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jwtToken } = useAuth();

  useEffect(() => {
    // This ensures refreshData is called only if jwtToken is not null.
    if (jwtToken) {
      refreshData();
    }
  }, [jwtToken]);

  const refreshData = async () => {

    if (!jwtToken) {
      console.log('No JWT token available, skipping data fetch.');
      setLoading(false); 
      return;
    }

    setLoading(true);
    try {
      
      const url = 'https://88pqpqlu5f.execute-api.eu-west-2.amazonaws.com/dev_1/frontend'; // Use your actual API endpoint

      const response = await fetch(url, {
        method: 'POST', // or 'GET' if your API requires
        headers: new Headers({
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({}), // If the API expects a POST body, even if it's empty
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Fetching data...');
      const data = await response.json();
      console.log('Data received:', data);
      setTrainingData(data); // Assuming the JSON response is the data you want
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch training data:", error);
      setError(error.message);
      setLoading(false);
      // You can also handle errors by setting an error state and providing it through context
    }
  };

  // When the provider is mounted, call refreshData to load the initial data
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <TrainingDataContext.Provider value={{ trainingData, refreshData , loading, error}}>
      {children}
    </TrainingDataContext.Provider>
  );
};

export default TrainingDataContext;
