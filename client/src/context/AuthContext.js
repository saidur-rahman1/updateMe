import axios from "axios";
import React, { createContext, useEffect, useState, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const AuthContext = createContext(INITIAL_STATE);

// async function getUser(userEmail) {

//   const [email, setEmail] = useState(null);
//   const [company, setCompany] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const authRes = await axios.post("http://localhost:3001/user", userEmail);
//   console.log("FE: " + JSON.stringify(authRes));
//   console.log("FE email: " + authRes.data.email);
//   console.log("FE company: " + authRes.data.company);
//   console.log("FE loggedIn: " + authRes.data.loggedIn);
//   setEmail(authRes.data.email);
//   setCompany(authRes.data.company);
//   setLoggedIn(authRes.data.loggedIn);

//   let status = await axios.get("http://localhost:3001/auth/");
//   console.log("sTATUS: " + status);
//   setLoggedIn(status);
//   setUser(authRes);
// }



function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider 
      value={{ 
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };