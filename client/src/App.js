import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { AuthContextProvider } from "./context/AuthContext";
import axios from 'axios';
import ProtectedRoute from "./components/ProtectedRoute";
import Dialog from "./components/Dialog";

import "./App.css";

axios.defaults.withCredentials = true;

function App() {
  // const location = useLocation();
  // const background = location.state && location.state.background;

  return (
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          {/* <Switch location={background || location}> */}
          <Switch>
            <Route path="/" component={SignUp} exact />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/dashboard" component={Dashboard}/>
            <ProtectedRoute path="/settings" component={Settings}/>
            <ProtectedRoute path="/mention/:id" component={<Dialog />} />
          </Switch>
          {/* {background && <ProtectedRoute path="/mention/:id" component={<Dialog />} />} */}
        </BrowserRouter>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
