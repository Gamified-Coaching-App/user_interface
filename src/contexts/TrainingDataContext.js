import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'components/Authentication/authContext';

const TrainingDataContext = createContext({
  trainingData: [],
  refreshTrainingData: () => {},
  updateTrainingData: () => {},
  loading: true,
  error: null,
});

export const TrainingDataProvider = ({ children }) => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jwtToken } = useAuth();
  const [fetchedRanges, setFetchedRanges] = useState([]); // Track fetched date ranges

  useEffect(() => {
    if (jwtToken) {
      refreshTrainingData(); // Fetch initial data for the last 60 days
    }
  }, [jwtToken]);

  const refreshTrainingData = async (startDate, endDate) => {
    if (!jwtToken) {
      console.log('No JWT token available, skipping data fetch.');
      setLoading(false);
      return;
    }

    // Default to the last 60 days if no dates are provided
    const end = endDate || new Date().toISOString().split('T')[0];
    const start = startDate || new Date(new Date().setDate(new Date().getDate() - 120)).toISOString().split('T')[0];

    // Check if the date range data already exists
    console.log(`Requested training data for range: ${start} to ${end}`);
    const rangeExists = fetchedRanges.some(range => {
      const rangeStart = new Date(range.start);
      const rangeEnd = new Date(range.end);
      const reqStart = new Date(start);
      const reqEnd = new Date(end);
      return (reqStart >= rangeStart && reqEnd <= rangeEnd) || (reqStart <= rangeStart && reqEnd >= rangeStart) || (reqStart <= rangeEnd && reqEnd >= rangeEnd);
    });

    if (rangeExists) {
      console.log('Training data for the requested date range already exists in the context.');
      return;
    }

    setLoading(true);
    try {
      console.log(`Fetching new training data for range: ${start} to ${end}`);
      const url = 'https://88pqpqlu5f.execute-api.eu-west-2.amazonaws.com/dev_1/frontend';
      const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ startDate: start, endDate: end }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Training data received:', data);

      setTrainingData(prevData => [...prevData, ...data]); // Append the new data to the existing data
      setFetchedRanges(prevRanges => [...prevRanges, { start, end }]); // Update fetched ranges
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch training data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const updateTrainingData = (sessionId, perceivedExertion, perceivedRecovery, perceivedTrainingSuccess) => {
    setTrainingData(prevData => 
      prevData.map(item => 
        item.session_id === sessionId 
        ? { 
            ...item, 
            perceived_exertion: perceivedExertion, 
            perceived_recovery: perceivedRecovery, 
            perceived_training_success: perceivedTrainingSuccess 
          } 
        : item
      )
    );
    console.log('Training data updated:', trainingData);
  };

  useEffect(() => {
    refreshTrainingData(); // Fetch data for the last 60 days by default
  }, []);

  return (
    <TrainingDataContext.Provider value={{ trainingData, refreshTrainingData, updateTrainingData, loading, error }}>
      {children}
    </TrainingDataContext.Provider>
  );
};

export default TrainingDataContext;