import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { AuthContextProvider } from "./context/AuthContext";
import axios from 'axios';
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

axios.defaults.withCredentials = true;

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={SignUp} exact />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/dashboard/:id" component={Dashboard} />
            <ProtectedRoute path="/dashboard" component={Dashboard}/>
            <ProtectedRoute path="/settings" component={Settings}/>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
