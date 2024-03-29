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
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineMinus } from "react-icons/ai";


function getArrowElement(position_new, position_old) {
  const position_diff = position_old - position_new;
  let arrowIcon;
  if (position_diff > 0) {
    arrowIcon = <Icon as={AiOutlineArrowUp} color="green.500" />;
  } else if (position_diff < 0) {
    arrowIcon = <Icon as={AiOutlineArrowDown} color="red.500" />;
  } else {
    arrowIcon = <Icon as={AiOutlineMinus} color="gray.500" />;
  }
  return arrowIcon;
}
function LeaderboardTableRow(props) {
  const { username, position_new, position_old, lastItem, aggregate_skills_season } = props;
  const arrowIcon = getArrowElement(position_new, position_old);
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
            <Flex align="center">
              {position_new}
              {arrowIcon}
              <Text ml={0} color={"gray.500"}>
                {position_old}
              </Text>
            </Flex>
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {username}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {aggregate_skills_season}
        </Text>
      </Td>
    </Tr>
  );
}

export default LeaderboardTableRow;
