import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id="error-page" className="text-center flex-cols my-96">
            <h1 className="text-4xl font-bold">Oops!!</h1>
            <p className="text-xl">Sorry, an unexpected error has occurred.</p>
            <p className="text-2xl font-bold">
                <i>404 {error.statusText || error.message}</i>
            </p>
            <Link to='/'>
                <button className="btn btn-neutral btn-dash btn-lg my-5">Back to Home</button>
            </Link>
        </div>
    );
}