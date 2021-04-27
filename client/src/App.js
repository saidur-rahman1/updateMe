import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";

function App() {
  return (
    <div class="page-login">
      <div class="ui centered grid container">
        <div class="nine wide column">
          <div class="header">
            <h3><center>Sign in to your account</center></h3>
          </div>
          {/* <div class="ui icon warning message">
              <i class="lock icon"></i>
              <div class="content">
                <div class="header">
                  Login failed!
                </div>
                <p>You might have misspelled your username or password!</p>
              </div>
          </div> */}
          <div class="ui fluid card">
            <div class="content">
            <form class="ui form" method="POST">
              <div class="field">
                <input type="text" name="username" placeholder="Username" />
              </div>
              <div class="field">
                <input type="password" name="password" placeholder="Password" />
              </div>
              <button class="ui primary labeled icon button" type="submit">
                <i class="unlock alternate icon"></i>
                Login
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    // { <MuiThemeProvider theme={theme}>
    //   <BrowserRouter>
    //     <Route path="/" component={LandingPage} />
    //   </BrowserRouter>
    // </MuiThemeProvider> }
  );
}

export default App;
