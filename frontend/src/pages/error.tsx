import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function isErrorResponse(error: unknown): error is Error {
  return error instanceof Error;
}

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <p>
        <i>{isRouteErrorResponse(error) ? error.statusText : null}</i>
        <i>{isErrorResponse(error) ? error.message : null}</i>
      </p>
    </div>
  );
}
