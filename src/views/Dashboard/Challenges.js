import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const ChallengeCard = ({ challenge, expanded, onClick }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Text fontSize="lg" fontWeight="bold">{challenge.title}</Text>
      {expanded && (
        <Box mt={2}>
          <Text>{challenge.description}</Text>
          <Button mt={2} onClick={onClick}>
            Collapse
          </Button>
        </Box>
      )}
    </Box>
  );
};

const ChallengesPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const challenges = [
    { title: "Challenge 1", description: "Description for Challenge 1" },
    { title: "Challenge 2", description: "Description for Challenge 2" },
    // Add more challenges as needed
  ];

  const handleCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={index}
          challenge={challenge}
          expanded={index === expandedIndex}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default ChallengesPage;