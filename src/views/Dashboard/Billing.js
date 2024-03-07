import React, { useEffect, useState, useContext } from 'react';
import { Flex, Grid , Box, Text} from '@chakra-ui/react';
import ChallengesCard from 'components/Tables/ChallengesCard';
import ChallengesDataContext from '../../contexts/ChallengesDataContext';

function Billing() {
  const { challengesData, loading } = useContext(ChallengesDataContext);

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }} mx='auto'>
      <Grid templateColumns='1fr'>
        <Box>
          {loading ? (
            <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>
          ) : (
            <Grid templateColumns='1fr' gap='26px'>
              {challengesData
                .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
                .map((row) => (
                  <ChallengesCard
                    key={row.id}
                    description={row.description}
                    completed_meters={row.completed_meters}
                    target_meters={row.target_meters}
                    status={row.status}
                    points={row.points}
                    start_date={row.start_date}
                    end_date={row.end_date}
                  />
                ))}
            </Grid>
          )}
        </Box>
      </Grid>
      {challengesData.length === 0 && loading === false && (
            <Text color="white" textAlign="center" mt="5" fontWeight={"bold"}>
              There are no challenges for you yet! <br />
              Season start is right around the corner - then you will see the first challenges coming up!
            </Text>
            )}
    </Flex>
  );
}

export default Billing;