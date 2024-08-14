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
                    fontSize: '14px', // Optional: Adjust font size if needed
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
                  fontSize: '14px', // Optional: Adjust font size if needed
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
    processSegment("main", "Interval Set");
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
    const { isOpen, onClose } = this.props;
    const { workoutDescription } = this.state;

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="4">
              <UnorderedList>
                {workoutDescription.map((desc, index) => (
                  <ListItem key={index}>{desc}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box mb="4">
              <Box height="300px" width="100%">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="area" // Ensure area chart is used
                  height="300"
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
}

export default CoachingDetailsModal;
