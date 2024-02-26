import React, { useContext } from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import TrainingDataContext from '../../contexts/TrainingDataContext'; 

const WeeklyOverview = () => {
    const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);
    
    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error fetching data: {error.message}</Box>;

    // Initialize data for all days of the week
    let weeklyData = {
        'Monday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Tuesday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Wednesday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Thursday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Friday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Saturday': { distance: 0, maxHeartRate: 0, elevation: 0 },
        'Sunday': { distance: 0, maxHeartRate: 0, elevation: 0 },
    };

    // Aggregate data by day of week
    if (trainingData && trainingData.length > 0) {
        trainingData.forEach((activity) => {
            if (activity.activity_type === "RUNNING") {
                const date = new Date(activity.timestamp_local * 1000);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                weeklyData[dayOfWeek].distance += activity.distance_meters_total / 1000;
                weeklyData[dayOfWeek].maxHeartRate = Math.max(weeklyData[dayOfWeek].maxHeartRate, activity.max_heart_rate_in_bpm);
                weeklyData[dayOfWeek].elevation += activity.elevation_gain_meters_total;
            }
        });
    }

    // Convert object to array for recharts
    const dataForChart = Object.keys(weeklyData).map(day => ({
        name: day,
        Distance: weeklyData[day].distance,
        'Max Heart Rate': weeklyData[day].maxHeartRate,
        Elevation: weeklyData[day].elevation
    }));

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Box mb="4">
                <Text fontSize='lg' color='#fff' fontWeight='bold'>
                    Weekly Running Distance Overview
                </Text>
                <Button onClick={refreshData} colorScheme="blue">Refresh Data</Button>
            </Box>
            <Box>
                <BarChart width={730} height={250} data={dataForChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Distance" fill="#8884d8" />
                </BarChart>
            </Box>
        </Flex>
    );
};

export default WeeklyOverview;