import React, { useEffect, useState, useContext } from 'react';
import { Flex, Grid , Box} from '@chakra-ui/react';
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
                .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
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
    </Flex>
  );
}

export default Billing;