import React, { useContext } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
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

  let totalDistance = 0

  trainingData.forEach(activity => {
    const date = new Date(activity.timestamp_local * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (activity.activity_type === "RUNNING") {
      dataByDay[dayOfWeek].Distance += activity.distance_meters_total / 1000; // Convert meters to km
      dataByDay[dayOfWeek].MaxHeartRate = Math.max(dataByDay[dayOfWeek].MaxHeartRate, activity.max_heart_rate_in_bpm);
      dataByDay[dayOfWeek].Elevation += activity.elevation_gain_meters_total;
      totalDistance += activity.distance_meters_total / 1000;
    }
  });

  // Convert to array for the chart
  const chartData = daysOfWeek.map(day => ({
    name: day,
    Distance: dataByDay[day].Distance,
    MaxHeartRate: dataByDay[day].MaxHeartRate,
    Elevation: dataByDay[day].Elevation,
  }));

  return (
  <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
    <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
    {totalDistance > 0 ? `Good job! You've run ${totalDistance} km this week.` : `You have not yet completed any workouts this week.`}
    </Text>
    <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="name" 
                tick={{ fill: '#fff' }} // replace 'yourColorHere' with the color you wan
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
    <Button onClick={refreshData} colorScheme="blue" mt="4" alignSelf="center" width="200px">Refresh Data</Button>
    </Flex>
  );
};

export default WeeklyOverview;
