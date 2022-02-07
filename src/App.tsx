import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ActivityApply from "./pages/ActivityApply";
import ActivityDetail from "./pages/ActivityDetail";
import AnnList from "./pages/AnnList";
import UserCenter from "./pages/UserCenter";
import AppliedActivity from "./pages/userCenter/AppliedActivity";
import CumulativeScore from "./pages/userCenter/CumulativeScore";
import Rank from "./pages/userCenter/Rank";
import UserInfo from "./pages/userCenter/UserInfo";
import AnnDetail from "./pages/AnnDetail";
import NoFoundPage from "./pages/404";
import AttendedActivity from "./pages/userCenter/AttendedActivity";
import Middle from "./pages/middle";
import SignUpOut from "./pages/SignUpOut";

function App() {
  return (
    //默认入口
    <div className="App">
      {/*<Routes>*/}
      {/*/!*<BrowserRouter >*!/*/}
      {/*  <Route path="/" element={<Home/>}/>*/}
      {/*  <Route path="/home" element={<Home/>}/>*/}
      {/*  <Route path="/404" element={<NoFoundPage/>}/>*/}
      {/*  <Route path="/login" element={<Login/>}/>*/}
      {/*  <Route path="/middle" element={<Middle/>}/>*/}
      {/*  <Route path="/SignUpOut/:type" element={<SignUpOut/>}/>*/}
      {/*  <Route path="/ActivityApply" element={<ActivityApply/>}/>*/}
      {/*  <Route path="/ActivityDetail/:id" element={<ActivityDetail/>}/>*/}

      {/*  <Route path="/AnnList" element={<AnnList/>}/>*/}
      {/*  <Route path="/AnnDetail/:id" element={<AnnDetail/>}/>*/}

      {/*  <Route path="/UserCenter" element={<UserCenter/>}/>*/}
      {/*  <Route path="/UserCenter/AppliedActivity" element={<AppliedActivity/>}/>*/}
      {/*  <Route path="/UserCenter/CumulativeScore" element={<CumulativeScore/>}/>*/}
      {/*  <Route path="/UserCenter/AttendedActivity" element={<AttendedActivity/>}/>*/}
      {/*  <Route path="/UserCenter/Rank" element={<Rank/>}/>*/}
      {/*  <Route path="/UserCenter/UserInfo" element={<UserInfo/>}/>*/}
      {/*  <Route path="*" element={<NoFoundPage/>}/>*/}
      {/*/!*</Routes>*!/*/}
      {/*</Routes>*/}
    </div>
  );
}

export default App;
