import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { RoutesQuanLy } from "./RoutesQuanLy";
import { RoutesTraCuu } from "./RoutesTraCuu";
import { RoutesThongKe } from "./RoutesThongKe";

const Page404 = lazy(() => import("../pages/page404"));

const TrangChu = lazy(() => import("../pages/TrangChu/index"));

const RoutesOfAllPage: RouteObject[] = [
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "",
    element: <TrangChu />,
    index: true,
  },
  ...RoutesQuanLy,
  ...RoutesTraCuu,
  ...RoutesThongKe,
];

export default RoutesOfAllPage;
