import React, { useContext, useState, useEffect } from 'react';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart
} from 'recharts';
import TrainingDataContext from '../../contexts/TrainingDataContext';

const WeeklyOverview = () => {
  const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);

  const [summaryData, setSummaryData] = useState({ RUNNING: 0, STRENGTH_CONDITIONING: 0, OTHER: 0 });
  const [runningData, setRunningData] = useState({ Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 });
  const [totalDistance, setTotalDistance] = useState(0);

  // For weekly aggregate
  useEffect(() => {
    if (trainingData && trainingData.length > 0) {
      const newSummary = trainingData.reduce((acc, activity) => {
        const type = activity.activity_type;
        const duration = activity.duration; 
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        const timeHours = hours + minutes / 60 + seconds / 3600;
        acc[type] = (acc[type] || 0) + timeHours;
        return acc;
      }, { RUNNING: 0, STRENGTH_CONDITIONING: 0, OTHER: 0 });
      setSummaryData(newSummary);
    } else {
      setSummaryData({ RUNNING: 0, STRENGTH_CONDITIONING: 0, OTHER: 0 });
    }
  }, [trainingData]);
  //console.log('summaryData:', summaryData);

  // For running
  useEffect(() => {
    let localTotalDistance = 0;
    if (trainingData && trainingData.length > 0) {
      const initialRunningData = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      const newRunningData = trainingData.reduce((acc, activity) => {
        if (activity.activity_type === "RUNNING") {
          console.log(activity.activity_type);
          console.log(activity.timestamp_local);

          // convert timestamp to day of the week
          const validTimestamp = activity.timestamp_local.slice(0, 10) + 'T' + activity.timestamp_local.slice(11);
          const date = new Date(validTimestamp); 
          let dayOfWeek = date.getDay(); // Sunday = 0, Saturday = 8
          dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
          const day = daysOfWeek[dayOfWeek];
          const length = activity.distance_meters_total;
          console.log('day of week:', day);

          acc[day] += length;
          localTotalDistance += length;
        }
        return acc;
      }, initialRunningData);

      setRunningData(newRunningData);
      setTotalDistance(localTotalDistance);
    }
  }, [trainingData]);
  console.log('runningData:', runningData);
  console.log('total distance', totalDistance);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  const chartData = [];
  const summaryChartData = [];

  summaryChartData.push(...Object.entries(summaryData).map(([activityType, hours]) => {
    let displayName = activityType; // Default to the activityType itself
    if (activityType === 'OTHER') displayName = 'OTHER';
    else if (activityType === 'STRENGTH_CONDITIONING') displayName = 'STRENGTH';
    
    return { name: displayName, Hours: Number(hours.toFixed(2)) };
  }));

  const summaryRunningData = Object.keys(runningData).map(day => ({
    name: day,
    Distance: Number((runningData[day] / 1000).toFixed(2)) // Convert to kilometers if distance is in meters
  }));

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
              <YAxis tickFormatter={(tick) => `${tick} h`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Hours" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        <Text fontSize='lg' color='#fff' fontWeight='bold' mb="4">
          You have run {totalDistance/1000} km so far this week
        </Text>
        {summaryRunningData && (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={summaryRunningData}>
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
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Distance" fill="#8884d8" />
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
