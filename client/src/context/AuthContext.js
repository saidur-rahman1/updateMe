import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const AuthContext = createContext(INITIAL_STATE);

function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      dispatch({ type: 'LOGIN_SUCCESS', payload: data })
    }
    getUser();
  }, []);

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