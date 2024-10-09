import { lazy } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../pages/layout";
import RoutesOfAllPage from "./RoutesOfAllPage";

const Login = lazy(() => import("../pages/login/index"));

const Page404 = lazy(() => import("../pages/page404"));

export const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <Layout />,
    children: RoutesOfAllPage,
    loader: protectedLoader,
  },
  {
    index: true,
    path: `${process.env.PUBLIC_URL}/login/*`,
    element: <Login />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const useToken = localStorage.getItem("userInfo");
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (!useToken && !code) {
    let params = new URL(request.url).pathname;
    return redirect(
      `https://la-sso.teca.vn/auth?client_id=laeid3a-web&redirect_uri=http://localhost:3033${params}`
    );
  }
  return null;
}
