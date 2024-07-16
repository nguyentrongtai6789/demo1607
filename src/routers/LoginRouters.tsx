import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/login"));

const Page404 = lazy(() => import("../pages/page404"));

const LoginRouters: RouteObject[] = [
  {
    path: "login",
    index: true,
    element: <Login />,
  },
  {
    path: "*",
    index: true,
    element: <Page404 />,
  },
];

export default LoginRouters;
