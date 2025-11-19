import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import ErrorPage from './../pages/shared/error page/ErrorPage';
import Home from "../pages/home/Home";
import Event from "../pages/event/event";
import About from "../pages/about/About";


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
        ]
    },
]);