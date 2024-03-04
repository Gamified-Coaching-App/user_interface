import React from "react";
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

const MainApp = () => {
  return (
    <TrainingDataProvider>
      <HashRouter>
        <Switch> 
          <Route path={`/admin`} component={AdminLayout} />
          <Route path={`/rtl`} component={RTLLayout} />
          <Redirect from={`/`} to='/admin/dashboard' />
        </Switch>
      </HashRouter>
    </TrainingDataProvider>
  );
};

const AppWithAuth = withAuthenticator(MainApp);

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));