import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext.js';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { loggedIn } = useContext(AuthContext);
    
    if (loggedIn) {
        return <Route path={props.path} component={props.component} />
    } else {
        return <Redirect to="/login" />
    }
}

export default ProtectedRoute;