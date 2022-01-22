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
import AnnDetail from "./pages/AnnList/AnnDetail";

function App() {
  return (
    //默认入口
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ActivityApply" element={<ActivityApply />} />
        <Route path="/ActivityDetail" element={<ActivityDetail />} />
        <Route path="/AnnList" element={<AnnList />} />
        <Route path="/AnnList/AnnDetail" element={<AnnDetail />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/UserCenter" element={<UserCenter />} />
        <Route path="/UserCenter/AppliedActivity" element={<AppliedActivity />} />
        <Route path="/UserCenter/CumulativeScore" element={<CumulativeScore />} />
        <Route path="/UserCenter/Rank" element={<Rank />} />
        <Route path="/UserCenter/UserInfo" element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
