import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,
         RouterProvider,
}from "react-router-dom";

import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import HomePage from './pages/home.jsx';
import RegisterPage from './pages/register.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/home",
    element: <HomePage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
