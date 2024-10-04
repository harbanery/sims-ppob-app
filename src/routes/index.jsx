import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "../pages/layout/LayoutMain";
import LayoutAuth from "../pages/layout/LayoutAuth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Homepage from "../pages/main/Homepage";
import TopUp from "../pages/main/TopUp";
import Transaction from "../pages/main/Transaction";
import Account from "../pages/main/Account";
import Service from "../pages/main/Service";
import {
  authLoader,
  homepageLoader,
  mainLoader,
  serviceLoader,
  transactionLoader,
} from "../helpers/loaders";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LayoutAuth />,
    loader: authLoader,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutMain />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: homepageLoader,
      },
      {
        path: "top-up",
        element: <TopUp />,
      },
      {
        path: "transaction",
        element: <Transaction />,
        loader: transactionLoader,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "service/:code",
        element: <Service />,
        loader: serviceLoader,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
