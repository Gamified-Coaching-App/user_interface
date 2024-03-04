// index.js
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";

// implement oauth here
import { TrainingDataProvider } from './contexts/TrainingDataContext';

ReactDOM.render(
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
//comment