import React from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
  Spacer,
  Box,
  Grid,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { RiRunFill} from "react-icons/ri";
import Card from "components/Card/Card.js";

function ChallengesCard(props) {
  const { description, completed_meters, target_meters, status, points, start_date, end_date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card>
    <Grid
        templateColumns="1fr 1fr 1fr"
        gap='26px'>
        <Flex direction='column' color='white' h='100%' p='0px 10px 20px 10px' w='100%'>
  {/* Description */}
  <Box mb='20px'>
    <Text fontSize='lg' fontWeight='bold'>
      {description}
    </Text>
  </Box>

  {/* Start and End Dates */}
  <Flex justify='space-between' align='center'>
    {/* Start Date */}
    <Flex direction='column' textAlign='center'>
      <Text fontSize='xs'>START</Text>
      <Text fontSize='xs' fontWeight='bold'>
        {new Date(start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Text>
      <Text fontSize='xs' fontWeight='bold'>
        {new Date(start_date).toISOString().split('T')[0]}
      </Text>
    </Flex>

    {/* End Date */}
    <Flex direction='column' textAlign='center'>
      <Text fontSize='xs'>END</Text>
      <Text fontSize='xs' fontWeight='bold'>
        {new Date(end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Text>
      <Text fontSize='xs' fontWeight='bold'>
        {new Date(end_date).toISOString().split('T')[0]}
      </Text>
    </Flex>
  </Flex>
</Flex>

        <Flex
            direction='column'
            color='white'
            justify='center'
            alignItems='center'
            h='100%'
            p='0px 10px 20px 10px'
            w='100%'>
            <Flex direction='column' align='center'>
            <Box textAlign='center'>
                <Text
                fontWeight='bold'>
                Goal: {target_meters} meters
                </Text>
                <Text
                fontWeight='bold'>
                Completed: {completed_meters} meters
                </Text>
            <Progress
                colorScheme='brand'
                maxW='160px'
                h='10px'
                bg='#2D2E5F'
                value={100 * completed_meters / target_meters}
                borderRadius='15px'
                mt='30px'
            />
            </Box>
            </Flex>
            </Flex>
        <Flex
            direction='column'
            color='white'
            justify='center'
            alignItems='center'
            h='100%'
            p='0px 10px 20px 10px'
            w='100%'>
                <Text
                fontSize='lg'
                letterSpacing='2px'
                fontWeight='bold'>
                + {points}
                </Text>
            <Icon
                as={RiRunFill}
                w='48px'
                h='auto'
                color='gray.400'
            />
            </Flex>
        </Grid>
    </Card>
  );
}

export default ChallengesCard;
