import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [auth, setAuth] = useState();

  async function getAuth() {
    const authRes = await axios.get("http://localhost:3001/auth");
    console.log(authRes);
    setAuth(authRes);
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, getAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };