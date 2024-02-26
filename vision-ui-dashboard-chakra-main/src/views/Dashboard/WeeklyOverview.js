import React, { useContext } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TrainingDataContext from '../../contexts/TrainingDataContext'; 

const WeeklyOverview = () => {
  const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;
  if (!trainingData || trainingData.length === 0) return <div>No data available.</div>;

  // Process and prepare data for rendering
  const dataByDay = {}; // Create an object to hold data by day
  // Populate the object with days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  daysOfWeek.forEach(day => {
    dataByDay[day] = { Distance: 0, MaxHeartRate: 0, Elevation: 0 };
  });

  trainingData.forEach(activity => {
    const date = new Date(activity.timestamp_local * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (activity.activity_type === "RUNNING") {
      dataByDay[dayOfWeek].Distance += activity.distance_meters_total / 1000; // Convert meters to km
      dataByDay[dayOfWeek].MaxHeartRate = Math.max(dataByDay[dayOfWeek].MaxHeartRate, activity.max_heart_rate_in_bpm);
      dataByDay[dayOfWeek].Elevation += activity.elevation_gain_meters_total;
    }
  });

  // Convert to array for the chart
  const chartData = daysOfWeek.map(day => ({
    name: day,
    Distance: dataByDay[day].Distance,
    MaxHeartRate: dataByDay[day].MaxHeartRate,
    Elevation: dataByDay[day].Elevation,
  }));

  const formatYAxis = (tickItem, name) => {
    switch(name) {
      case 'Distance':
        return `${tickItem} km`;
      case 'MaxHeartRate':
        return `${tickItem} bpm`;
      case 'Elevation':
        return `${tickItem} m`;
      default:
        return tickItem;
    }
  };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
        Weekly Running Distance Overview
      </Text>
      <Button onClick={refreshData} colorScheme="blue" mb="4">Refresh Data</Button>
      <ResponsiveContainer width="100%" height={400}>
    <ComposedChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis 
        yAxisId="left" 
        orientation="left" 
        stroke="#8884d8" 
        tickFormatter={(tick) => `${tick} km`}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right" 
        stroke="#82ca9d" 
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
        stroke="#8884d8" 
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
  </Flex>
  );
};

export default WeeklyOverview;
