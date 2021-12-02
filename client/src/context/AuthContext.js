import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

async function getUser(userEmail) {

  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const authRes = await axios.post("http://localhost:3001/user", userEmail);
  console.log("FE: " + JSON.stringify(authRes));
  console.log("FE email: " + authRes.data.email);
  console.log("FE company: " + authRes.data.company);
  console.log("FE loggedIn: " + authRes.data.loggedIn);
  setEmail(authRes.data.email);
  setCompany(authRes.data.company);
  setLoggedIn(authRes.data.loggedIn);
  // let status = await axios.get("http://localhost:3001/auth/");
  // console.log("sTATUS: " + status);
  // setLoggedIn(status);
  //setUser(authRes);
}



function AuthContextProvider(props) { 

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, email, company }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };