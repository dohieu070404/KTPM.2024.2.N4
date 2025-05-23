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
<<<<<<< HEAD
import TourPage from './pages/user/Tourpage.jsx';
import ComboSearchPage from './pages/user/ComboSearchPage.jsx';
import OrderPage from './pages/user/orderpage.jsx';
import PaymentPage from './pages/user/payment.jsx';
import CustomerDashboard from './pages/customer/customercontrolHV/Customer.jsx';
import CustomerSupport from './pages/customer/customercontrolHV/CustomerSP.jsx';
import HotelManagement from './pages/customer/customercontrolHV/Hotelmanagement.jsx';
import RevenueManagement from './pages/customer/customercontrolHV/Revenuemanagement.jsx';
import RoomManagement from './pages/customer/customercontrolHV/Roommanagement.jsx';

=======
import OrderPage from './pages/user/orderpage.jsx';
import PaymentPage from './pages/user/payment.jsx';
>>>>>>> 74f77a4 (HuyVuong)

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
      {
    path: "/TourPage",
    element: <TourPage/>
      },
       {
    path: "/ComboSearchPage",
    element: <ComboSearchPage/>
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
<<<<<<< HEAD

=======
>>>>>>> 74f77a4 (HuyVuong)
  },
  {
    path: "/OrderPage",
    element: <OrderPage/>
  },
  {
    path: "/PaymentPage",
    element: <PaymentPage/>
<<<<<<< HEAD
  },
  {
    path: "/CustomerDashboard",
    element: <CustomerDashboard/>
  },
  {
    path: "/HotelManagement",
    element: <HotelManagement/>
  },
  {
    path: "/CustomerSP",
    element: <CustomerSupport/>
  },
  {
    path: "/Revenuemanagement",
    element: <RevenueManagement/>
  },
  {
    path: "/RoomManagement",
    element: <RoomManagement/>

=======
>>>>>>> 74f77a4 (HuyVuong)
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
