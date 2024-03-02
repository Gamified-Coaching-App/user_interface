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
    if (!trainingData) return;

    const newSummary = { RUNNING: 0, SWIMMING: 0, OTHER: 0 };

    trainingData.forEach(activity => {
      const activityType = activity.activity_type;
      const distance = activity.distance_meters_total / 1000; // Convert meters to kilometers

      // Only accumulate known activity types
      if (newSummary.hasOwnProperty(activityType)) {
        newSummary[activityType] += distance;
      } else {
        // Handle unknown activity type
        console.warn(`Unknown activity type: ${activityType}`);
      }
    });

    setSummaryData(newSummary);
  }, [trainingData]);

  const initializeDayData = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek.reduce((acc, day) => {
      acc[day] = { Distance: 0, MaxHeartRate: 0, Elevation: 0 };
      return acc;
    }, {});
  };

  const processTrainingData = (data) => {
    const dataByDay = initializeDayData();
    let totalDistance = 0;

    data.forEach(activity => {
      const date = new Date(activity.timestamp_local * 1000);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (dataByDay.hasOwnProperty(dayOfWeek) && activity.activity_type === "RUNNING") {
        dataByDay[dayOfWeek].Distance += activity.distance_meters_total / 1000; // Convert meters to km
        dataByDay[dayOfWeek].MaxHeartRate = Math.max(dataByDay[dayOfWeek].MaxHeartRate, activity.max_heart_rate_in_bpm);
        dataByDay[dayOfWeek].Elevation += activity.elevation_gain_meters_total;
        totalDistance += activity.distance_meters_total / 1000;
      } else {
        console.error(`Day of week not found or activity type is not RUNNING: ${dayOfWeek}`);
      }
    });

    return { dataByDay, totalDistance };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;
  if (!trainingData || trainingData.length === 0) return <div>No data available.</div>;

  const { dataByDay, totalDistance } = processTrainingData(trainingData);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const chartData = daysOfWeek.map(day => ({
    name: day,
    Distance: dataByDay[day].Distance,
    MaxHeartRate: dataByDay[day].MaxHeartRate,
    Elevation: dataByDay[day].Elevation,
  }));

  const summaryChartData = Object.entries(summaryData).map(([activityType, distance]) => ({
    name: activityType,
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
