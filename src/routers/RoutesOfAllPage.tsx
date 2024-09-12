import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { RoutesQuanLy } from "./RoutesQuanLy";
import { RoutesTraCuu } from "./RoutesTraCuu";

const Page404 = lazy(() => import("../pages/page404"));

const TrangChu = lazy(() => import("../pages/TrangChu/index"));

const RoutesOfAllPage: RouteObject[] = [
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "trang-chu",
    element: <TrangChu />,
  },
  ...RoutesQuanLy,
  ...RoutesTraCuu,
];

export default RoutesOfAllPage;
