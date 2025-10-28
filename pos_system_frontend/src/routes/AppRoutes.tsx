import { createBrowserRouter, Navigate } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Root from "../root/Root";
import Dashboard from "../pages/Dashboard";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgetPage from "../pages/SendOtpPage";
import OTPVerifyPage from "../pages/OtpVerifyPage";
import ResetPassowrdPage from "../pages/ResetPassowrdPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/registration',
                element: <Registration/>
            },
            {
                path: '/login',
                element: <GuestRoute><Login/></GuestRoute>
            },
            {
                path: '/dashboard',
                element:  <ProtectedRoute><Dashboard/></ProtectedRoute>
            },
            {
                path: '/send-otp',
                element:  <ForgetPage />
            },
            {
                path: '/otp-verify',
                element:  <OTPVerifyPage />
            },
             {
                path: '/reset-password',
                element:  <ResetPassowrdPage />
            },
        ]
    }, {
        path:"*", 
        element:<Navigate to="/dashboard" />
    }
]);

export default router;
