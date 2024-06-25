import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
  SimpleGrid,
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const TrainingDetailsModal = ({ isOpen, onClose, eventDetails, onSubmit }) => {
  const [perceivedExertion, setPerceivedExertion] = useState(null);
  const [recovery, setRecovery] = useState(null);
  const [trainingSuccess, setTrainingSuccess] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (eventDetails) {
      setPerceivedExertion(eventDetails.perceivedExertion ?? null);
      setRecovery(eventDetails.perceivedRecovery ?? null);
      setTrainingSuccess(eventDetails.perceivedTrainingSuccess ?? null);
    }
  }, [eventDetails]);

  const handleSubmit = async () => {
    const data = {
      sessionId: eventDetails.session_id,
      timestampLocal: eventDetails.timestamp_local,
      perceivedExertion,
      perceivedRecovery: recovery,
      perceivedTrainingSuccess: trainingSuccess,
    };
    const result = await onSubmit(data);
    if (result.success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }
  };

  // Convert heart_rate JSON string to an object
  const heartRateData = eventDetails ? JSON.parse(eventDetails.heart_rate) : {};
  const heartRateLabels = Object.keys(heartRateData).map(key => Number(key));
  const heartRateValues = Object.values(heartRateData);
  const maxHeartRateTime = heartRateLabels[heartRateLabels.length - 1];

  const chartData = {
    labels: heartRateLabels,
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRateValues,
        borderColor: 'rgba(75,192,192,0.8)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.4, // Smoother line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          callback: function (value) {
            const totalSeconds = value;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          },
        },
        min: 0,
        max: maxHeartRateTime // Set max to the maximum time in the data
      },
      y: {
        title: {
          display: true,
          text: 'Heart Rate',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Activity Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" mb="4" fontWeight="bold">
            Activity Type: {eventDetails?.activity_type}
          </Text>
          <SimpleGrid columns={2} spacing={5} mb="4">
            <Box>
              <Text fontSize="md" mb="2">
                Distance: {(eventDetails?.distance / 1000).toFixed(2)} km
              </Text>
              <Text fontSize="md" mb="2">
                Average Speed: {eventDetails?.averageSpeed} km/h
              </Text>
              <Text fontSize="md" mb="2">
                Max Speed: {eventDetails?.maxSpeed} km/h
              </Text>
              <Text fontSize="md" mb="2">
                Average Pace: {eventDetails?.average_pace_min_per_km} min/km
              </Text>
              <Text fontSize="md" mb="2">
                Max Pace: {eventDetails?.max_pace_min_per_km} min/km
              </Text>
              <Text fontSize="md" mb="2">
                Duration: {eventDetails?.duration}
              </Text>
              <Text fontSize="md" mb="2">
                Elevation Gain: {eventDetails?.elevation_gain_meters_total} meters
              </Text>
            </Box>
            <Box>
              <Text fontSize="md" mb="2">
                Active Calories: {eventDetails?.active_calories}
              </Text>
              <Text fontSize="md" mb="2">
                Average Heart Rate: {eventDetails?.average_heart_rate_in_bpm} bpm
              </Text>
              <Text fontSize="md" mb="2">
                Max Heart Rate: {eventDetails?.max_heart_rate_in_bpm} bpm
              </Text>
            </Box>
          </SimpleGrid>
          <Text fontSize="lg" mb="2" fontWeight="bold">
            Heart Rate
          </Text>
          <Box mb="4">
            <Line data={chartData} options={chartOptions} />
          </Box>
          <Text fontSize="lg" mb="2" fontWeight="bold">
            How did you feel about this session?
          </Text>
          <FormControl id="recovery" mb="4">
            <FormLabel>How well recovered did you feel before the session?</FormLabel>
            <NumberInput min={1} max={10} value={recovery !== null ? recovery : ''} onChange={(valueString) => setRecovery(parseInt(valueString, 10))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="perceivedExertion" mb="4">
            <FormLabel>How fatigued do you feel after completing the session?</FormLabel>
            <NumberInput min={1} max={10} value={perceivedExertion !== null ? perceivedExertion : ''} onChange={(valueString) => setPerceivedExertion(parseInt(valueString, 10))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl id="trainingSuccess" mb="4">
            <FormLabel>How well did you feel the training went?</FormLabel>
            <NumberInput min={1} max={10} value={trainingSuccess !== null ? trainingSuccess : ''} onChange={(valueString) => setTrainingSuccess(parseInt(valueString, 10))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          {showSuccessMessage && (
            <Alert status="success" mt="4">
              <AlertIcon />
              Data received
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrainingDetailsModal;
