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
  Select,
  Button,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Divider,
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import Chart from 'react-apexcharts';

const TrainingDetailsModal = ({ isOpen, onClose, eventDetails, onSubmit }) => {
  const [perceivedExertion, setPerceivedExertion] = useState(null);
  const [recovery, setRecovery] = useState(null);
  const [trainingSuccess, setTrainingSuccess] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (eventDetails) {
      setPerceivedExertion(eventDetails.perceived_exertion ?? null);
      setRecovery(eventDetails.perceived_recovery ?? null);
      setTrainingSuccess(eventDetails.perceived_training_success ?? null);
    }
  }, [eventDetails]);

  const handleSubmit = async () => {
    const data = {
      sessionId: eventDetails.session_id,
      timestampLocal: eventDetails.timestamp_local,
      perceivedExertion: perceivedExertion,
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

  // Options for perceived exertion
  const exertionOptions = [
    { value: 0, label: 'Not challenging at all' },
    { value: 0.33, label: 'Moderate effort, could have trained longer and at a higher intensity' },
    { value: 0.66, label: 'Challenging, but could have trained longer at this intensity' },
    { value: 1, label: 'Could not finish the session' },
  ];

  // Options for perceived recovery
  const recoveryOptions = [
    { value: 0, label: 'Felt almost too fatigued to start the training' },
    { value: 0.33, label: 'Felt slightly tired' },
    { value: 0.66, label: 'Felt moderately recovered' },
    { value: 1, label: 'Felt fully recovered' },
  ];

  // Options for perceived training success
  const trainingSuccessOptions = [
    { value: 0, label: 'Not a productive session' },
    { value: 0.33, label: 'I expect some progress, but below my expectations' },
    { value: 0.66, label: 'Solid session, likely to see good improvements' },
    { value: 1, label: 'Excellent session, I expect strong progress' },
  ];

  // Convert heart_rate JSON string to an object
  const heartRateData = eventDetails ? JSON.parse(eventDetails.heart_rate) : {};
  const heartRateLabels = Object.keys(heartRateData).map(key => Number(key));
  const heartRateValues = Object.values(heartRateData);
  const maxHeartRateTime = heartRateLabels[heartRateLabels.length - 1];

  const chartOptions = {
    chart: {
      type: 'line',
      height: 300,
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false, // Hide the toolbar
      },
      zoom: {
        enabled: false, // Disable zooming
      },
      pan: {
        enabled: false, // Disable panning
      },
      selection: {
        enabled: false, // Disable selection
      },
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: 'Time (min)',
      },
      labels: {
        formatter: (value) => {
          const totalSeconds = value;
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          return `${hours}:${minutes.toString().padStart(2, '0')}`; // Display hours and minutes only
        },
      },
      min: 0,
      max: maxHeartRateTime, // Set max to the maximum time in the data
    },
    yaxis: {
      title: {
        text: 'Heart Rate (bpm)',
      },
    },
    stroke: {
      curve: 'smooth', // Smoother line
      width: 3
    },
    tooltip: {
      x: {
        formatter: (value) => {
          const totalSeconds = value;
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
      },
    },
  };

  const chartSeries = [{
    name: 'Heart Rate',
    data: heartRateLabels.map((label, index) => [label, heartRateValues[index]])
  }];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Activity Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="l" mb="4" fontWeight="bold">
            Activity Type: {eventDetails?.activity_type === 'RUNNING' ? 'Run' : 
                    eventDetails?.activity_type === 'OTHER' ? 'Other Activity' : 
                    eventDetails?.activity_type === 'STRENGTH_CONDITIONING' ? 'Strength & Conditioning' : 
                    'Unknown Activity'}
          </Text>

          {/* First Section: Data with Chakra UI Table */}
          <Table variant="simple" mb="4" size="sm">
            <Tbody>
              <Tr>
                <Td fontWeight="bold" fontSize="sm">Distance</Td>
                <Td isNumeric fontSize="sm">{(eventDetails?.distance_meters_total / 1000).toFixed(2)} km</Td>
                <Td fontWeight="bold" fontSize="sm" pl={8}>Duration</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.duration} min</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="sm">Average Heart Rate</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.average_heart_rate_in_bpm} bpm</Td>
                <Td fontWeight="bold" fontSize="sm" pl={8}>Max Heart Rate</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.max_heart_rate_in_bpm} bpm</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="sm">Active Calories</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.active_calories} kcal</Td>
                <Td fontWeight="bold" fontSize="sm" pl={8}>Average Speed</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.average_speed_km_h} km/h</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="sm">Max Speed</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.max_speed_km_h} km/h</Td>
                <Td fontWeight="bold" fontSize="sm" pl={8}>Average Pace</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.average_pace_min_per_km} min/km</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold" fontSize="sm">Max Pace</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.max_pace_min_per_km} min/km</Td>
                <Td fontWeight="bold" fontSize="sm" pl={8}>Elevation Gain</Td>
                <Td isNumeric fontSize="sm">{eventDetails?.elevation_gain_meters_total} m</Td>
              </Tr>
            </Tbody>
          </Table>

          <Divider my="4" /> {/* Divider between Data and Graph */}

          {/* Second Section: Graph */}
          <Text fontSize="l" mb="2" fontWeight="bold">
            Heart Rate
          </Text>
          <Box mb="4">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={300}
            />
          </Box>

          <Divider my="4" /> {/* Divider between Graph and Questionnaire */}

          {/* Third Section: Questionnaire */}
          <Text fontSize="l" mb="2" fontWeight="bold">
            How did you feel about this session?
          </Text>

          <FormControl id="recovery" mb="4">
            <FormLabel>How well recovered did you feel before the session?</FormLabel>
            <Select placeholder="Please select..." value={recovery !== null ? recovery : ''} onChange={(e) => setRecovery(parseFloat(e.target.value))}>
              {recoveryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="perceivedExertion" mb="4">
            <FormLabel>How fatigued do you feel after completing the session?</FormLabel>
            <Select placeholder="Please select..." value={perceivedExertion !== null ? perceivedExertion : ''} onChange={(e) => setPerceivedExertion(parseFloat(e.target.value))}>
              {exertionOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="trainingSuccess" mb="4">
            <FormLabel>How well did you feel the training went?</FormLabel>
            <Select placeholder="Please select..." value={trainingSuccess !== null ? trainingSuccess : ''} onChange={(e) => setTrainingSuccess(parseFloat(e.target.value))}>
              {trainingSuccessOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
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
