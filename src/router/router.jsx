import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import ErrorPage from './../pages/shared/error page/ErrorPage';
import Home from "../pages/home/Home";
import Event from "../pages/event/event";
import About from "../pages/about/About";
import Auth from "../layout/Auth";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import PrivateRoute from "../routes/PrivateRoute";


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
                element: <PrivateRoute><Event></Event></PrivateRoute>
            },
            {
                path: "/about",
                element: <About></About>
            },
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
            },
        ]
    }
]);