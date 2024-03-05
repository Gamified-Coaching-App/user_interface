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
import React, {useEffect, useState} from "react";

// Chakra imports
import { Box, Button, Flex, Grid, Icon, Spacer, Text } from "@chakra-ui/react";

// Images
import BackgroundCard1 from "assets/img/billing-background-card.png";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import IconBox from "components/Icons/IconBox";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";
import ChallengesCard from "components/Tables/ChallengesCard";

// Icons
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { RiMastercardFill, RiRunFill, RiBikeFill } from "react-icons/ri";
import {
  BillIcon,
  GraphIcon,
  MastercardIcon,
  VisaIcon,
} from "components/Icons/Icons";

// Data
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
  //challengesData,
  fetchChallenges,
} from "variables/general";



function Billing() {
  const [loading, setLoading] = useState(true);
  const [challengesData, setChallengesData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChallenges();
      setChallengesData(data);
      setDataFetched(true);
      setLoading(false);
    };

    console.log(dataFetched);
    if (!dataFetched){
      fetchData();
    }
  }, [dataFetched]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    console.log('dataFetched:', dataFetched);
  }, [dataFetched]); // Log the value of dataFetched whenever it changes

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }} mx='auto'>
      <Grid templateColumns="1fr">
        <Box>
        {loading ? ( // Conditional rendering for loading message
             <h1 style={{ color: 'white', textAlign: 'center' }}>Loading...</h1>
          ) : (
          <Grid
            templateColumns="1fr"
            gap='26px'>
              {/* Mastercard */}
              {challengesData
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .map((row) => {
                return (
                  <ChallengesCard
                    description={row.description}
                    completed_meters={row.completed_meters}
                    target_meters={row.target_meters}
                    status={row.status}
                    points={row.points}
                    start_date={row.start_date}
                    end_date={row.end_date}
                  />
                );
              })}
          </Grid>
        )}
        </Box>
      </Grid>
    </Flex>
  );
}

export default Billing;
