import { createBrowserRouter } from "react-router-dom"; // Fixed import
import Root from "../layout/Root";
import ErrorPage from './../pages/shared/error page/ErrorPage';
import Home from "../pages/home/Home";
import Event from "../pages/event/Event";
import About from "../pages/about/About";
import Auth from "../layout/Auth";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import Donor from "../pages/donor/Donor";
import SearchDonor from "../pages/donor/SearchDonor";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/event",
                element: <Event></Event>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/donor_form",
                element: <PrivateRoute><Donor></Donor></PrivateRoute>
            },
            {
                path: "/donor",
                element: <PrivateRoute><SearchDonor></SearchDonor></PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: '/edit-profile',
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: Auth,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);