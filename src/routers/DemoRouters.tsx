import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const DemoRedux = lazy(() => import("../pages/demo/DemoRedux"));

const Demo2 = lazy(() => import("../pages/demo/Demo2"));

const TrangChu = lazy(() => import("../pages/layout"));

const DemoRouters: RouteObject[] = [
  {
    path: "demo-redux",
    index: true,
    element: <DemoRedux />,
  },
  {
    path: "demo-2",
    index: true,
    element: <Demo2 />,
  },
  {
    path: "trang-chu",
    index: true,
    element: <TrangChu />,
  },
];

export default DemoRouters;
