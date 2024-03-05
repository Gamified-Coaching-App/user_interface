/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useEffect, useState, useContext} from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Button,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineMinus } from "react-icons/ai";


// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import TablesLeaderboardRow from "components/Tables/TablesLeaderboardRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";
import { leaderboardData, fetchLeaderboard } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import LeaderboardDataContext from '../../contexts/LeaderboardDataContext';

const Leaderboard = () => {
  const { leaderboardData, refreshLeaderboard, loading, error } = useContext(LeaderboardDataContext);
  if (loading) return <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>
  if (error) return <h1 style={{ color: 'white', textAlign: 'center' }}>Error fetching the data</h1>

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* LEADERBOARD */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              Leaderboard
            </Text>
            <Flex align='center'>
              <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                <Text fontWeight='bold' as='span' color='gray.400'>
                  Your username:  {localStorage.getItem("username")}
                </Text>{" "}
              </Text>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'
                  width='20%'>
                  Position
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'
                  width='50%'>
                  Username
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'
                  width='30%'>
                  Points
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboardData.sort((a, b) => {
                return a.position_new - b.position_new;
              }).map((row, index, arr) => {
                return (
                  <TablesLeaderboardRow
                    username={row.username}
                    position_new={row.position_new}
                    position_old={row.position_old}
                    aggregate_skills_season={row.aggregate_skills_season}
                    lastItem={index === arr.length - 1 ? true : false}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Button onClick={refreshLeaderboard} colorScheme="blue" mt="4" alignSelf="center" width="200px">
        Refresh Data
      </Button>
    </Flex>
  );
}

export default Leaderboard;
