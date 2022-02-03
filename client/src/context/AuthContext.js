import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: true,
  error: false,
};

const AuthContext = createContext(INITIAL_STATE);

function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      if (data) dispatch({ type: 'LOGIN_SUCCESS', payload: data })
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