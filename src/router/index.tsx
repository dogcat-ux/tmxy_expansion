import {RouteObject} from "react-router-dom"
import Home from "../pages/Home";
import React from "react";
import NoFoundPage from "../pages/404";
import Login from "../pages/Login";
import Middle from "../pages/middle";
import SignUpOut from "../pages/SignUpOut";
import ActivityApply from "../pages/ActivityApply";
import ActivityDetail from "../pages/ActivityDetail";
import AnnList from "../pages/AnnList";
import AnnDetail from "../pages/AnnDetail";
import UserCenter from "../pages/UserCenter";
import AppliedActivity from "../pages/userCenter/AppliedActivity";
import CumulativeScore from "../pages/userCenter/CumulativeScore";
import AttendedActivity from "../pages/userCenter/AttendedActivity";
import Rank from "../pages/userCenter/Rank";
import UserInfo from "../pages/userCenter/UserInfo";

const router: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: <Home/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/404",
    element: <NoFoundPage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/middle",
    element: <Middle/>,
  },
  {path: "/SignUpOut/:type", element: <SignUpOut/>,},
  {path: "/ActivityApply", element: <ActivityApply/>,},
  {path: "/ActivityDetail/:id", element: <ActivityDetail/>,},
  {path: "/AnnList", element: <AnnList/>,},
  {path: "/AnnDetail/:id", element: <AnnDetail/>,},
  {path: "/UserCenter", element: <UserCenter/>,},
  {path: "/UserCenter/AppliedActivity", element: <AppliedActivity/>,},
  {path: "/UserCenter/CumulativeScore", element: <CumulativeScore/>,},
  {path: "/UserCenter/AttendedActivity", element: <AttendedActivity/>,},
  {path: "/UserCenter/Rank", element: <Rank/>,},
  {path: "/UserCenter/UserInfo", element: <UserInfo/>,},
  {path: "*", element: <NoFoundPage/>,},
]

export default router;
