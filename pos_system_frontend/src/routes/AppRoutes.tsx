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
import UserProfle from "../pages/UserProfle";
import DashBoardLayout from "../root/DashBoardLayout";

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
                path: '/send-otp',
                element:  <ForgetPage />
            },
            {
                path: '/otp-verify',
                element:  <OTPVerifyPage />
            },
            {
                path: '/reset-password',
                element:  <ProtectedRoute><ResetPassowrdPage /></ProtectedRoute>
            },
        ]
    }, 
    {    
        path: '/dashboard',
        element:  <ProtectedRoute><DashBoardLayout/></ProtectedRoute>,
        // children: [
        //     {
        //         path: '/user-profile',
        //         element: <UserProfle />
        //     }
        // ]
    },
    
]);

export default router;
