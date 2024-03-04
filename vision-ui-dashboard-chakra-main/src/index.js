// React imports
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// Import Amplify and configuration
// import { Amplify } from 'aws-amplify';
// import config from './config/aws-exports'; 

// Layouts and contexts
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { TrainingDataProvider } from './contexts/TrainingDataContext';

// Configure Amplify with your AWS configuration
// Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TrainingDataProvider>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Redirect from={`/`} to='/admin/dashboard' />
        </Switch>
      </HashRouter>
    </TrainingDataProvider>
  </React.StrictMode>
);
