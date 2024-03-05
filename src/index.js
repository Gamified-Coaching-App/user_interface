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

Amplify.configure(config);

//import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { TrainingDataProvider } from './contexts/TrainingDataContext';

import { AuthProvider } from './components/Authentication/authContext';

const MainApp = () => {  
  
  return (
    <AuthProvider>
    <TrainingDataProvider>
      <HashRouter>
        <Switch> 
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Redirect from={`/`} to='/admin/dashboard' />
        </Switch>
      </HashRouter>
    </TrainingDataProvider>
    </AuthProvider>
  );
};

const AppWithAuth = withAuthenticator(MainApp);

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));