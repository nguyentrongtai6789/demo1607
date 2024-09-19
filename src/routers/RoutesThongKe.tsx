import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/laoEid/thongKe/HsCmnd9SoTheoDonVi")
);

export const RoutesThongKe: RouteObject[] = [
  {
    path: "thong-ke",
    children: [
      {
        path: "hs-cmnd-9-so-hop-nhat-theo-don-vi",
        element: <QuanLyHoSoCmnd9So />,
      },
    ],
  },
];
