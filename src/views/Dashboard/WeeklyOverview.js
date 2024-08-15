import React, { useContext, useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Flex, Box, Text } from '@chakra-ui/react';
import TrainingDataContext from '../../contexts/TrainingDataContext';
import CoachingDataContext from '../../contexts/CoachingDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import '../../styles/custom-fullcalendar.css';
import TrainingDetailsModal from './TrainingDetailsModal';
import CoachingDetailsModal from './CoachingDetailsModal';
import { useAuth } from 'components/Authentication/authContext';

const CalendarComponent = () => {
  const { trainingData, refreshTrainingData, updateTrainingData, loading: trainingLoading, error: trainingError } = useContext(TrainingDataContext);
  const { coachingData, loading: coachingLoading, error: coachingError } = useContext(CoachingDataContext);
  const { jwtToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [isCoachingModalOpen, setIsCoachingModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const prevViewRef = useRef(currentView);

  useEffect(() => {
    if (jwtToken && trainingData && coachingData && !trainingLoading && !coachingLoading) {
      const parsedTrainingEvents = trainingData.map((workout) => {
        const pointsGained = JSON.parse(workout.points_gained);
        const timestamp = workout.timestamp_local.substring(0, 10) + 'T' + workout.timestamp_local.substring(11);
        const startDate = new Date(timestamp);

        if (isNaN(startDate.getTime())) {
          console.error('Invalid date:', workout.timestamp_local);
        }

        let title;
        switch (workout.activity_type) {
          case 'RUNNING':
            title = 'Run';
            break;
          case 'STRENGTH_CONDITIONING':
            title = 'Strength & Conditioning';
            break;
          default:
            title = 'Other Activity';
            break;
        }

        return {
          title: title,
          start: startDate,
          extendedProps: {
            ...workout,
            pointsGained,
            eventType: 'TRAINING',
          },
          classNames: workout.activity_type === 'RUNNING' ? 'fc-event-dot-running' : 'fc-event-dot-other',
        };
      });

      const parsedCoachingEvents = Object.entries(coachingData.workoutPlan).map(([key, value]) => {
        const date = key.split('_')[0];
    
        // Generate a random integer between 7 and 11 for the hour
        const randomHour = Math.floor(Math.random() * 5) + 7; // Math.random() * 5 gives a number between 0 and 4, then add 7
    
        // Construct the full date-time string
        const dateTimeString = `${date}T${randomHour.toString().padStart(2, '0')}:00:00`;

        let title;
        switch (value.type) {
          case 'RUNNING':
            title = 'Run';
            break;
          case 'STRENGTH_CONDITIONING':
            title = 'Strength & Conditioning';
            break;
          default:
            title = 'Other Activity';
            break;
        }
    
        return {
            title: title,
            start: new Date(dateTimeString),
            extendedProps: {
                ...value,
                eventType: 'COACHING',
            },
            classNames: value.type === 'RUNNING' ? 'fc-event-dot-running' : 'fc-event-dot-other',
        };
    });

      setEvents([...parsedTrainingEvents, ...parsedCoachingEvents]);
    }
  }, [trainingData, trainingLoading, coachingData, coachingLoading, jwtToken]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event.extendedProps);
    if (clickInfo.event.extendedProps.eventType === 'TRAINING') {
      setIsTrainingModalOpen(true);
    } else if (clickInfo.event.extendedProps.eventType === 'COACHING') {
      setIsCoachingModalOpen(true);
    }
  };

  const handleDatesSet = (dateInfo) => {
    const { start, end, view } = dateInfo;
    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    // Log the view changes and the dates
    console.log(`View changed to: ${startDate} to ${endDate}, View: ${view.type}`);

    if (view.type !== prevViewRef.current || currentView !== view.type || startDate !== currentDate.toISOString().split('T')[0]) {
      setCurrentView(view.type);
      setCurrentDate(view.currentStart);
  
      // Only refresh training data on view change
      refreshTrainingData(startDate, endDate);
      prevViewRef.current = view.type;
    }
  };

  const handleTrainingModalSubmit = async (data) => {
    try {
      const url = 'https://www.gamified-coaching-app-222.co.uk/subjparams'; // Replace with your actual API endpoint
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update training data context
      updateTrainingData(data.sessionId, data.perceivedExertion, data.perceivedRecovery, data.perceivedTrainingSuccess);

      return { success: true };
    } catch (error) {
      console.error('Submission error:', error);
      return { success: false };
    }
  };

  if (trainingLoading || coachingLoading || trainingError || coachingError) {
    if (trainingError) {
      console.error('Error fetching training data:', trainingError);
    }
    if (coachingError) {
      console.error('Error fetching coaching data:', coachingError);
    }
    return (
      <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
        <Box mb="6">
          <Text fontSize="lg" color="#fff" fontWeight="bold" mb="4">
            Training Calendar
          </Text>
          <Box className="fullcalendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
              themeSystem="bootstrap"
              initialView={currentView}
              initialDate={currentDate}
              events={[]}
              eventClick={handleEventClick}
              datesSet={handleDatesSet}
            />
          </Box>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Box mb="6">
        <Text fontSize="lg" color="#fff" fontWeight="bold" mb="4">
          Training Calendar
        </Text>
        <Box className="fullcalendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
            themeSystem="bootstrap"
            initialView={currentView}
            initialDate={currentDate}
            firstDay={1}
            events={events}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
          />
        </Box>
      </Box>

      {selectedEvent && isTrainingModalOpen && (
        <TrainingDetailsModal
          isOpen={isTrainingModalOpen}
          onClose={() => setIsTrainingModalOpen(false)}
          eventDetails={selectedEvent}
          onSubmit={handleTrainingModalSubmit} // Pass the onSubmit function here
        />
      )}

      {selectedEvent && isCoachingModalOpen && (
        <CoachingDetailsModal
          isOpen={isCoachingModalOpen}
          onClose={() => setIsCoachingModalOpen(false)}
          eventDetails={selectedEvent.workout}
          type={selectedEvent.type}
        />
      )}
    </Flex>
  );
};

export default CalendarComponent;