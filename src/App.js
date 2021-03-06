import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import Weights from "./pages/Weights";
import Settings from "./pages/Settings";
import Modal from "./pages/Modal";
import ThemeProvider from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/Metrics" exact component={Metrics} />
          <Route path="/Weights" exact component={Weights} />
          <Route path="/Settings" exact component={Settings} />
          <Route path="/Modal" exact component={Modal} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
