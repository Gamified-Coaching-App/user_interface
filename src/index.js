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

//import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { TrainingDataProvider } from './contexts/TrainingDataContext';
import { LeaderboardDataProvider } from './contexts/LeaderboardDataContext';
import { ChallengesDataProvider } from './contexts/ChallengesDataContext';

import { AuthProvider } from './components/Authentication/authContext';

const MainApp = ({ signOut: amplifySignOut }) => { 
  
  const signOut = async () => {
    sessionStorage.clear(); // This also clears the 'oauthInProgress' flag to start new OAuth process
    localStorage.clear();
    await amplifySignOut();
  };
  
  return (
    <AuthProvider>
      <TrainingDataProvider>
        <LeaderboardDataProvider>
        <ChallengesDataProvider>
          <HashRouter>
          <Flex position="fixed" top="40" right="150" p="4" justifyContent="flex-end"  zIndex="10">
              <Button
                  onClick={signOut}
                  w='100%'
                  color="white"
                  fontSize='xs'
                  variant='brand'
                  px='20px'
                  mb='16px'>
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
    </AuthProvider>
  );
};

const AppWithAuth = withAuthenticator(MainApp);

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));