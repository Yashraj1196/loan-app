import React from 'react'
import { Outlet, useRoutes } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import LoanRepayments from './components/LoanRepayments';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import LoanRequests from './components/LoanRequests';

const Router = () => {
  let isLoggedInUser= localStorage.getItem('isLoggedInUser') ? true : false;
  const routes = useRoutes(
    [
        { path: '/', element: <LoginPage /> },
        {
          path: '/userDashboard',
          element: (
            <ProtectedRoute isLoggedIn={isLoggedInUser}>
              <Outlet/>
            </ProtectedRoute>
          ),
          children: [
            { path: '', element: <UserDashboard /> },
            { path: 'request-for-loan', element: <LoanRequests/> },
            { path: 'repayments', element: <LoanRepayments /> },
          ],
        },
    ]
  );
  return routes;
}

export default Router;