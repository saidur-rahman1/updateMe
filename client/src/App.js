import React, { useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

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
          <Route path="/" component={SignUp} exact />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/settings" component={Settings}/>
        </BrowserRouter>
      </AuthContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
