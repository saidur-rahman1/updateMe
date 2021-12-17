import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext.js';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { user, isFetching } = useContext(AuthContext);
    
        if (user && !isFetching) {
            return <Route path={props.path} component={props.component} />
        } else if (!user && !isFetching) {
                return <Redirect to={{
                    pathname: "/login",
                    state: { from: props.path }
                }} />
        } else {
            return <div>Loading...</div>
        }
    
}

export default ProtectedRoute;