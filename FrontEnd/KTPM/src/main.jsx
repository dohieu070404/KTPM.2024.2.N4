import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,
         RouterProvider,
}from "react-router-dom";

import App from './App.jsx'
import LoginPage from './pages/user/login.jsx';
import HomePage from './pages/home.jsx';
import RegisterPage from './pages/user/register.jsx';
import AdminPage from './pages/admin/adminpage.jsx';
import CustomerPage from './pages/customer/customerpage.jsx';
import HotelPage from './pages/user/hotelpage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index: true,
        element: <HomePage/>
      },
      {
    path: "/HoltelPage",
    element: <HotelPage/>
      },
    //   {
    // path: "/home",
    // element: <HomePage/>
    //   },
    ]
  }
  ,
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  
  {
    path: "/adminpage",
    element: <AdminPage/>
  },
  {
    path: "/CustomerPage",
    element: <CustomerPage/>
  }

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
