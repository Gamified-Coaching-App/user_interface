// React imports
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";


// Contexts and layouts
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import { TrainingDataProvider } from './contexts/TrainingDataContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TrainingDataProvider>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from={`/`} to='/admin/dashboard' />
      </Switch>
    </HashRouter>
  </TrainingDataProvider>,
  document.getElementById("root")
);
