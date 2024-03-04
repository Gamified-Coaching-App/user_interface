import React, { useContext, useState, useEffect } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart
} from 'recharts';
import TrainingDataContext from '../../contexts/TrainingDataContext';

const WeeklyOverview = () => {
  const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);
  const [summaryData, setSummaryData] = useState({ RUNNING: 0, SWIMMING: 0, OTHER: 0 });

  useEffect(() => {
    if (trainingData && trainingData.length > 0) {
      // Existing logic to process trainingData
      const newSummary = trainingData.reduce((acc, activity) => {
        // Reduction logic...
      }, { RUNNING: 0, SWIMMING: 0, OTHER: 0 });

      setSummaryData(newSummary);
    } else {
      // Reset summaryData to initial state if no training data is available
      setSummaryData({ RUNNING: 0, SWIMMING: 0, OTHER: 0 });
    }
  }, [trainingData]);

  // Initialize data structure for daily stats with an additional condition for empty data
  const initializeDayData = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek.reduce((acc, day) => {
      acc[day] = { Distance: 0, MaxHeartRate: 0, Elevation: 0 };
      return acc;
    }, {});
  };

  // Existing functions remain unchanged...

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  const processedData = trainingData && trainingData.length > 0 ? processTrainingData(trainingData) : { dataByDay: initializeDayData(), totalDistance: 0 };

  // Use processedData for rendering
  const { dataByDay, totalDistance } = processedData;

  // Convert to array for the chart, adapting for potentially empty data
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const chartData = daysOfWeek.map(day => ({
    name: day,
    Distance: dataByDay[day].Distance,
    MaxHeartRate: dataByDay[day].MaxHeartRate,
    Elevation: dataByDay[day].Elevation,
  }));

  // Summary chart data, adapted for potentially empty data
  const summaryChartData = Object.entries(summaryData).map(([activityType, distance]) => ({
    name: activityType === 'OTHER' ? 'CYCLING' : activityType,
    Distance: distance
  }));

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Box mb="6">
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
          Your Weekly Summary
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#fff' }} />
            <YAxis tickFormatter={(tick) => `${tick} km`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Distance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
          You have run {totalDistance} km so far this week
        </Text>
        <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="name" 
                tick={{ fill: '#fff' }}
            />
            <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#8884d8" 
                tickFormatter={(tick) => `${tick} km`}
            />
            <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#c9759c" 
                tickFormatter={(tick) => `${tick} bpm`}
            />
            <YAxis 
                yAxisId="rightAlt" 
                orientation="right" 
                stroke="#82ca9d" 
                tickFormatter={(tick) => `${tick} m`}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="Distance" fill="#8884d8" />
            <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="MaxHeartRate" 
                stroke="#c9759c" 
                strokeWidth={3} 
                activeDot={{ r: 8 }} 
            />
            <Line 
                yAxisId="rightAlt" 
                type="monotone" 
                dataKey="Elevation" 
                stroke="#82ca9d" 
                strokeWidth={3} 
            />
        </ComposedChart>
        </ResponsiveContainer>
      </Box>
      <Button onClick={refreshData} colorScheme="blue" mt="4" alignSelf="center" width="200px">
        Refresh Data
      </Button>
    </Flex>
  );
};

export default WeeklyOverview;
