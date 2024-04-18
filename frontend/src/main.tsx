import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/root.tsx";
import AppPage from "./pages/app.tsx";
import ErrorPage from "./pages/error.tsx";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import AuthProvider from "./store/auth-context.tsx";
import PrivateRoute from "./lib/routes/private.tsx";
import UnauthenticatedRoute from "./lib/routes/unauthenticated.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <UnauthenticatedRoute>
            <LoginPage />
          </UnauthenticatedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <UnauthenticatedRoute>
            <RegisterPage />
          </UnauthenticatedRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
