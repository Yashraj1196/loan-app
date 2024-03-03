import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    return ( 
        isLoggedIn === true ? children : <Navigate to="/" replace/> 
      );
}

export default ProtectedRoute