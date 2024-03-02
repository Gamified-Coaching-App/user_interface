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
    if (trainingData) {
      const newSummary = trainingData.reduce((acc, activity) => {
        const activityType = activity.activity_type;
        const distance = activity.distance_meters_total / 1000; // Convert meters to kilometers
        if (acc.hasOwnProperty(activityType)) {
          acc[activityType] += distance;
        } else {
          console.warn(`Unknown activity type: ${activityType}`);
        }
        return acc;
      }, {
        RUNNING: 0,
        SWIMMING: 0,
        OTHER: 0
      });

      setSummaryData(newSummary);
    }
  }, [trainingData]);

  // Initialize data structure for daily stats
  const initializeDayData = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek.reduce((acc, day) => {
      acc[day] = { Distance: 0, MaxHeartRate: 0, Elevation: 0 };
      return acc;
    }, {});
  };


function getDayOfWeek(unixTime) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const date = new Date(unixTime * 1000); 
    const dayIndex = (date.getDay() + 6) % 7;

    switch (dayIndex) {
        case 0:
            return days[0];
        case 1:
            return days[1];
        case 2:
            return days[2];
        case 3:
            return days[3];
        case 4:
            return days[4];
        case 5:
            return days[5];
        case 6:
            return days[6];
        default:
            return "Invalid day";
    }
}

  // Process trainingData to populate dayData
  const processTrainingData = (data) => {
    const dataByDay = initializeDayData();
    let totalDistance = 0;
  
    data.forEach(activity => {
      console.log("activity ", activity.session_id)
      const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
      if (dataByDay[dayOfWeek]) {
        if (activity.activity_type === "RUNNING") {
          const activityType = activity.activity_type;
          const distance = activity.distance_meters_total / 1000;
          const dayOfWeek = getDayOfWeek(activity.session_id);

          dataByDay[dayOfWeek].Distance += activity.distance_meters_total / 1000;
          dataByDay[dayOfWeek].MaxHeartRate = Math.max(dataByDay[dayOfWeek].MaxHeartRate, activity.max_heart_rate_in_bpm);
          dataByDay[dayOfWeek].Elevation += activity.elevation_gain_meters_total;
          totalDistance += activity.distance_meters_total / 1000;
        }
      } else {
        console.error(`Day of week not found: ${dayOfWeek}`);
      }
    });
  
    return { dataByDay, totalDistance };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;
  if (!trainingData || trainingData.length === 0) return <div>No data available.</div>;

  const { dataByDay, totalDistance } = processTrainingData(trainingData);

  // Convert to array for the chart
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const chartData = daysOfWeek.map(day => ({
    name: day,
    Distance: dataByDay[day].Distance,
    MaxHeartRate: dataByDay[day].MaxHeartRate,
    Elevation: dataByDay[day].Elevation,
  }));

  // Summary chart data
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
      </Box>
      <Button onClick={refreshData} colorScheme="blue" mt="4" alignSelf="center" width="200px">
        Refresh Data
      </Button>
    </Flex>
  );
};

export default WeeklyOverview;
