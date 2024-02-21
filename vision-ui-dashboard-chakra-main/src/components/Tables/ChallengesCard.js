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
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { RiRunFill} from "react-icons/ri";
import Card from "components/Card/Card.js";

function ChallengesCard(props) {
  const { challenge_id, completed_meters, target_meters, status, points, start_date, end_date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card>
        <Flex
            direction='column'
            color='white'
            h='100%'
            p='0px 10px 20px 10px'
            w='100%'>
            <Flex justify='space-between' align='center'>
            <Text fontSize='lg' fontWeight='bold'>
                Challenge {challenge_id}
            </Text>
            <Icon
                as={RiRunFill}
                w='48px'
                h='auto'
                color='gray.400'
            />
            </Flex>
            <Spacer />
            <Flex direction='column'>
            <Progress
                colorScheme='brand'
                maxW='125px'
                h='3px'
                bg='#2D2E5F'
                value={100 * completed_meters / target_meters}
                borderRadius='15px'
            />
            <Box>
                <Text
                fontSize='md'
                letterSpacing='2px'
                fontWeight='bold'>
                Run {target_meters} meters
                </Text>
            </Box>
            <Flex mt='14px'>
                <Flex direction='column' me='34px'>
                <Text fontSize='xs'>START</Text>
                <Text fontSize='xs' fontWeight='bold'>
                    {start_date}
                </Text>
                </Flex>
                <Flex direction='column'>
                <Text fontSize='xs'>END</Text>
                <Text fontSize='xs' fontWeight='bold'>
                    {end_date}
                </Text>
                </Flex>
            </Flex>
            </Flex>
        </Flex>
    </Card>
  );
}

export default ChallengesCard;
