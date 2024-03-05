// Configurator.js
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Link,
  Switch,
  Text,
  DarkMode,
  LightMode,
} from "@chakra-ui/react";
import GitHubButton from "react-github-btn";
import { Separator } from "components/Separator/Separator";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

// Garmin OAuth import
import { initiateGarminOAuth, checkForGarminCallback  } from "../Authentication/useGarminConnect";

import { useAuth } from '../Authentication/authContext';

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { jwtToken } = useAuth();

  const [oauthInProgress, setOauthInProgress] = useState(false);

   // Effect to track the 'oauthInProgress' state based on session storage
   useEffect(() => {
    const oauthInProgressValue = localStorage.getItem('oauthInProgress') === 'true';
    setOauthInProgress(oauthInProgressValue);
    }, []);
    
    useEffect(() => {
      if (oauthInProgress) {
      checkForGarminCallback();
    }
  }, [oauthInProgress]); // Depend on jwtToken and the state tracking 'oauthInProgress'

  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }
  let colorButton = "white";
  const secondaryButtonColor = "white";
  const settingsRef = React.useRef();

  // PARTNERS CONNECT PAGE
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}>
        <DrawerContent
          bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)'
          backdropFilter='blur(42px)'>
          <DrawerHeader pt='24px' px='24px'>
            <DrawerCloseButton color='white' />
            <Text color='white' fontSize='xl' fontWeight='bold' mt='16px'>
              Settings
            </Text>
            <Text color='white' fontSize='md' mb='16px'>
              Connect to partners.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w='340px' ps='24px' pe='40px'>
            <Flex flexDirection='column'>
                <Box>
                    <Button
                      onClick={initiateGarminOAuth}
                      disabled={!jwtToken}
                      w='100%'
                      color={colorButton}
                      fontSize='xs'
                      variant='brand'
                      px='20px'
                      mb='16px'>
                      <Text textDecorationColor='none'>Connect to Garmin</Text>
                    </Button>
                </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
