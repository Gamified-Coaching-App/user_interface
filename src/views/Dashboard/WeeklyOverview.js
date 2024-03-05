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
    console.log('trainingData:', trainingData); // Check what trainingData contains
    if (trainingData && trainingData.length > 0) {
      // Process the fetched training data to summarize it by activity type
      const newSummary = trainingData.reduce((acc, activity) => {
        const type = activity.activity_type;
        const distanceKm = activity.distance_meters_total / 1000;
        acc[type] = (acc[type] || 0) + distanceKm;
        return acc;
      }, { RUNNING: 0, STRENGTH_CONDITIONING: 0, OTHER: 0 });

      console.log('newSummary:', newSummary);
      setSummaryData(newSummary);
    } else {
      setSummaryData({ RUNNING: 0, STRENGTH_CONDITIONING: 0, OTHER: 0 });
    }
  }, [trainingData]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  let totalDistance = 0;
  const chartData = [];
  const summaryChartData = [];

  if (summaryData) {
    totalDistance = Object.values(summaryData).reduce((acc, distance) => acc + distance, 0);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    chartData.push(...daysOfWeek.map(day => ({
      name: day,
      Distance: summaryData[day]?.Distance || 0,
      MaxHeartRate: summaryData[day]?.MaxHeartRate || 0,
      Elevation: summaryData[day]?.Elevation || 0,
    })));

    summaryChartData.push(...Object.entries(summaryData).map(([activityType, distance]) => ({
      name: activityType === 'OTHER' ? 'CYCLING' : activityType,
      name: activityType === 'STRENGTH_CONDITIONING' ? 'STRENGTH' : activityType,
      Distance: distance,
    })));
  }


  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Box mb="6">
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
          Your Weekly Summary
        </Text>
        {summaryData && (
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
        )}
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
          You have run {totalDistance} km so far this week
        </Text>
        {summaryData && (
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
        )}
      </Box>
      <Button onClick={refreshData} colorScheme="blue" mt="4" alignSelf="center" width="200px">
        Refresh Data
      </Button>
    </Flex>
  );
};

export default WeeklyOverview;
