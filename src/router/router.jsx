import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import ErrorPage from './../pages/shared/error page/ErrorPage';


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>
    },
]);