import React, { useContext } from 'react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrainingDataContext from '../../contexts/TrainingDataContext'; 

const WeeklyOverview = () => {
    const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);
    
    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error fetching data: {error}</Box>;
    if (!trainingData || trainingData.length === 0) return <Box>No data available.</Box>;

    // Create a data structure for the chart
    // Assuming the training data is already sorted by date, if not you should sort it
    const processedData = trainingData.map((data) => ({
        day: new Date(data.timestamp_local * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        Distance: data.distance_meters_total / 1000, // Convert meters to kilometers
        MaxHeartRate: data.max_heart_rate_in_bpm,
        Elevation: data.elevation_gain_meters_total
    }));

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Box mb='24px'>
                <Text fontSize='lg' color='white' fontWeight='bold' mb='16px'>
                    Weekly Running Distance Overview
                </Text>
                <Button onClick={refreshData} colorScheme="blue">Refresh Data</Button>
            </Box>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={processedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Distance" fill="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="MaxHeartRate" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="Elevation" stroke="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    );
};

export default WeeklyOverview;
