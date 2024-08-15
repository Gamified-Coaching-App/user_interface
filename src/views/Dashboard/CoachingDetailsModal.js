import React, { Component } from "react";
import Chart from "react-apexcharts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Divider,
  Box,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

class CoachingDetailsModal extends Component {
  constructor(props) {
    super(props);

    const { series, annotations, totalDistance } = this.processEventDetails(props.eventDetails);

    this.state = {
      options: {
        chart: {
          id: "workout-line",
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
            text: 'Distance (km)',
          },
          min: 0,
          max: totalDistance, // Explicitly set x-axis max to total cumulative distance
        },
        yaxis: {
          min: 1,
          max: 5,
          tickAmount: 4,
          title: {
            text: 'Heart Rate Zone',
          },
        },
        stroke: {
          curve: 'stepline', // Stepline for sharp edges
          width: 2,
        },
        fill: {
          type: 'solid', // Solid fill for the area below the line
          opacity: 1, // Match the line opacity to the area
        },
        legend: {
          show: false, // Hide the legend
        },
        annotations: {
          xaxis: annotations,
        },
        markers: {
          size: 0, // Completely remove markers
        },
        dataLabels: {
          enabled: false, // Disable numeric data labels to remove the "2"s or "4"s
        },
        tooltip: {
          enabled: false, // Disable tooltips to remove any info on hovering
        },
      },
      series: series,
      workoutDescription: this.generateWorkoutDescription(props.eventDetails), // Generate the workout description
    };
  }

  processEventDetails(eventDetails) {
    const series = [];
    const annotations = [];
    let cumulativeDistance = 0;

    const zoneColors = {
      "Z2": "#2563EB", // Darker blue
      "Z3": "#047857", // Darker green
      "Z4": "#D97706", // Darker yellow
      "Z5": "#DC2626", // Darker red
    };

    const processSegment = (phase, label) => {
      if (eventDetails[phase]) {
        Object.entries(eventDetails[phase]).forEach(([zone, distance]) => {
          if (Array.isArray(distance)) {
            distance.forEach((interval) => {
              const [zoneKey, distValue] = Object.entries(interval)[0];
              const zoneValue = parseInt(zoneKey.replace('Z', ''));
              const color = zoneColors[zoneKey];

              series.push({
                name: `Zone ${zoneValue}`,
                data: [
                  { x: cumulativeDistance, y: zoneValue },
                  { x: cumulativeDistance + distValue, y: zoneValue }
                ],
                color: color,
                fill: {
                  type: 'solid',
                  color: color,
                  opacity: 1, // Match opacity to the line
                },
                stroke: {
                  width: 2,
                  curve: 'line',
                },
              });

              const midpoint = cumulativeDistance + distValue / 2;

              annotations.push({
                x: midpoint,
                borderColor: 'transparent',
                label: {
                  text: label,
                  orientation: 'horizontal',
                  position: 'top',
                  offsetY: -10,
                  style: {
                    color: '#000',
                    background: 'transparent', // Remove background color
                    borderWidth: 0, // Remove border
                    borderColor: 'transparent', // Ensure border is transparent
                    padding: 0, // Remove padding around text
                    fontSize: '12px', // Optional: Adjust font size if needed
                  },
                },
              });

              cumulativeDistance += distValue;
            });
          } else {
            const zoneValue = parseInt(zone.replace('Z', ''));
            const color = zoneColors[zone];

            series.push({
              name: `Heart Rate Zone ${zoneValue}`,
              data: [
                { x: cumulativeDistance, y: zoneValue },
                { x: cumulativeDistance + distance, y: zoneValue }
              ],
              color: color,
              fill: {
                type: 'solid',
                color: color,
                opacity: 1, // Match opacity to the line
              },
              stroke: {
                width: 2,
                curve: 'line',
              },
            });

            // Add vertical line annotations for phase boundaries
            if (label === "Warmup") {
              annotations.push({
                x: cumulativeDistance + distance,
                borderColor: 'rgba(0, 0, 0, 0.5)',
                strokeDashArray: 4,
              });
            }
            
            if (label === "Cooldown") {
              annotations.push({
                x: cumulativeDistance, // Use cumulativeDistance without adding distance to mark the start
                borderColor: 'rgba(0, 0, 0, 0.5)',
                strokeDashArray: 4,
              });
            }

            const midpoint = cumulativeDistance + distance / 2;

            annotations.push({
              x: midpoint,
              borderColor: 'transparent',
              label: {
                text: label,
                orientation: 'horizontal',
                position: 'top',
                offsetY: -10,
                style: {
                  color: '#000',
                  background: 'transparent', // Remove background color
                  borderWidth: 0, // Remove border
                  borderColor: 'transparent', // Ensure border is transparent
                  padding: 0, // Remove padding around text
                  fontSize: '12px', // Optional: Adjust font size if needed
                  textAnchor: 'start', // Left-align labels
                },
              },
            });

            cumulativeDistance += distance;
          }
        });
      }
    };

    // Process each phase of the workout
    processSegment("warmup", "Warmup");
    processSegment("main", "Interval");
    processSegment("cooldown", "Cooldown");

    return {
      series,
      annotations,
      totalDistance: cumulativeDistance, // Return the total cumulative distance
    };
  }

  generateWorkoutDescription(eventDetails) {
    const description = [];

    // Warmup
    if (eventDetails.warmup) {
      description.push(`First, warm up in Zone 2 to prepare your body for the workout.`);
    }

    // Main intervals
    if (eventDetails.main) {
      Object.entries(eventDetails.main).forEach(([interval, efforts], index) => {
        if (efforts.length === 2) {
          const [effort1, effort2] = efforts;
          const effort1Zone = Object.keys(effort1)[0];
          const effort2Zone = Object.keys(effort2)[0];
          description.push(`For interval ${index + 1}, begin with an effort in Zone ${effort1Zone[1]}, followed by a recovery in Zone ${effort2Zone[1]}.`);
        }
      });
    }

    // Cooldown
    if (eventDetails.cooldown) {
      description.push(`Finally, cool down in Zone 2.`);
    }

    return description;
  }

  render() {
    const { isOpen, onClose, eventDetails, type } = this.props;

    let content;
    let heading;  // Define a variable for the heading

    switch (type) {
      case 'RUNNING':
        heading = "Your Run:";
        content = (
          <>
            <Text fontSize="l" fontWeight="bold" mb="4">{heading}</Text>
            <Box mb="4">
              <UnorderedList>
                {this.state.workoutDescription.map((desc, index) => (
                  <ListItem key={index} fontSize="sm">{desc}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box mb="4">
              <Box height="300px" width="100%">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="area" 
                  height="300"
                />
              </Box>
            </Box>
            
            <Divider my="4" /> {/* Divider between Data and Graph */}

            <Box mt="4">
              <Text fontSize="md" fontWeight="bold">Training Zone Explanations:</Text>
              <UnorderedList mt="2" fontSize="sm">
                <ListItem><strong>Zone 1:</strong> No effort, warmup</ListItem>
                <ListItem><strong>Zone 2:</strong> Conversational speed, can be maintained for long durations</ListItem>
                <ListItem><strong>Zone 3:</strong> Moderate effort, more difficult to talk while running </ListItem>
                <ListItem><strong>Zone 4:</strong> Hard effort, high-intensity running, hard to maintain</ListItem>
                <ListItem><strong>Zone 5:</strong> Maximum effort, sprinting, can be maintained for short bursts</ListItem>
              </UnorderedList>
            </Box>
          </>
        );
        break;
      case 'OTHER':
        heading = "Your Alternative Session:";
        content = (
          <>
            <Text fontSize="l" fontWeight="bold" mb="4">{heading}</Text>
            <Text>Do {eventDetails.duration} hours of alternative training of your choice.</Text>
          </>
        );
        break;
      case 'STRENGTH_CONDITIONING':
        heading = "Your Strength & Conditioning Session:";
        content = (
          <>
            <Text fontSize="l" fontWeight="bold" mb="4">{heading}</Text>
            <Text>Do a strength & conditioning session with focus on core and legs.</Text>
          </>
        );
        break;
      default:
        heading = "Invalid Activity Type";
        content = <Text>Invalid activity type.</Text>;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
}

export default CoachingDetailsModal;
