import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/laoEid/quanLy/QuanLyHoSoCmnd9So")
);

export const RoutesQuanLy: RouteObject[] = [
  {
    path: "quan-ly",
    children: [
      {
        path: "hs-cmnd-9-so",
        element: <QuanLyHoSoCmnd9So />,
      },
    ],
  },
];
