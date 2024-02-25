// WeeklyOverview.js
import React, { useContext } from 'react';
import { Flex, Table, Tbody, Text, Th, Thead, Tr, Td, Button } from '@chakra-ui/react';
import TrainingDataContext from '../../contexts/TrainingDataContext'; 

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

const WeeklyOverview = () => {
    const { trainingData, refreshData, loading, error } = useContext(TrainingDataContext);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    // Check if trainingData is null or empty
    if (!trainingData || trainingData.length === 0) {
        return <div>No data available.</div>;
    }

    // Process data to summarize distances by day of the week
    const weeklyData = trainingData.reduce((acc, current) => {
        const date = new Date(current.timestamp_local * 1000); // Convert timestamp to milliseconds
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = 0;
        }
        acc[dayOfWeek] += current.distance_meters_total / 1000; // Convert meters to kilometers
        return acc;
    }, {});

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='lg' color='#fff' fontWeight='bold'>
                        Weekly Running Distance Overview
                    </Text>
                    <Button onClick={refreshData} colorScheme="blue">Refresh Data</Button>
                </CardHeader>
                <CardBody>
                    <Table variant='simple' color='#fff'>
                        <Thead>
                            <Tr color='gray.400'>
                                <Th>Day of the Week</Th>
                                <Th>Kilometers Ran</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.entries(weeklyData).map(([day, distance], index) => (
                                <Tr key={index}>
                                    <Td>{day}</Td>
                                    <Td>{distance.toFixed(2)} km</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default WeeklyOverview;