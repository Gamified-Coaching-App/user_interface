import React from "react";
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Button, Text, Flex } from "@chakra-ui/react";

Amplify.configure(config);

import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { TrainingDataProvider } from './contexts/TrainingDataContext';
import { LeaderboardDataProvider } from './contexts/LeaderboardDataContext';
import { ChallengesDataProvider } from './contexts/ChallengesDataContext';
import { CoachingDataProvider } from './contexts/CoachingDataContext';

import { AuthProvider } from './components/Authentication/authContext';

const MainApp = ({ signOut: amplifySignOut }) => { 
  
  const signOut = async () => {
    sessionStorage.clear(); // This also clears the 'oauthInProgress' flag to start new OAuth process
    localStorage.clear();
    await amplifySignOut();
  };
  
  return (
    <AuthProvider>
      <CoachingDataProvider>
      <TrainingDataProvider>
        <LeaderboardDataProvider>
        <ChallengesDataProvider>
          <HashRouter>
          <Flex 
              position="sticky" 
              top="100px" 
              right="150px"  // Align to the right side of its parent container
              p="4" 
              justifyContent="flex-end" 
              zIndex="10"
              bg="gray.900"
              boxShadow="md"
              width="97%" // Ensure the flex container spans the full width of the viewport
              height="100%"
            >
              <Button
                onClick={signOut}
                color="white"
                fontSize='xs'
                variant='brand'
                px='20px'
                mb='16px'
              >
                <Text display={{ sm: "none", md: "flex" }} fontWeight="bold">Sign Out</Text>
              </Button>
            </Flex>
            <Switch> 
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RTLLayout} />
              <Redirect from={`/`} to='/admin/dashboard' />
            </Switch>
          </HashRouter>
          </ChallengesDataProvider>
        </LeaderboardDataProvider>
      </TrainingDataProvider>
      </CoachingDataProvider>
    </AuthProvider>
  );
};

const AppWithAuth = withAuthenticator(MainApp);

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));