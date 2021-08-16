import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={SignUp} exact />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard}/>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
