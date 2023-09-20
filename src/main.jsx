import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './RequireAuth';
import { UserContextProvider } from './context/UserContextProvider';
import Register from './pages/Register/Register';
import Verify from './components/Verify/Verify';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import EnterOtp from './pages/EnterOtp/EnterOtp';
import ResetPassword from './pages/ResetPassword/ResetPassword';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth>
      <Home />
    </RequireAuth>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/verify/:email",
    element: <Verify />
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />
  },
  {
    path: "/enter-otp",
    element: <EnterOtp />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />

      <ToastContainer className="capitalize" />
    </UserContextProvider>
  </React.StrictMode>
)
