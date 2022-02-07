import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index';
import "../src/assets/styles/global.scss"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux';
import Home from "./pages/Home";
import NoFoundPage from "./pages/404";
import Login from "./pages/Login";
import Middle from "./pages/middle";
import SignUpOut from "./pages/SignUpOut";
import ActivityApply from "./pages/ActivityApply";
import ActivityDetail from "./pages/ActivityDetail";
import AnnList from "./pages/AnnList";
import AnnDetail from "./pages/AnnDetail";
import UserCenter from "./pages/UserCenter";
import AppliedActivity from "./pages/userCenter/AppliedActivity";
import CumulativeScore from "./pages/userCenter/CumulativeScore";
import AttendedActivity from "./pages/userCenter/AttendedActivity";
import Rank from "./pages/userCenter/Rank";
import UserInfo from "./pages/userCenter/UserInfo";
// import 'lib-flexible';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/404" element={<NoFoundPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/middle" element={<Middle/>}/>
          <Route path="/SignUpOut/:type" element={<SignUpOut/>}/>
          <Route path="/ActivityApply" element={<ActivityApply/>}/>
          <Route path="/ActivityDetail/:id" element={<ActivityDetail/>}/>

          <Route path="/AnnList" element={<AnnList/>}/>
          <Route path="/AnnDetail/:id" element={<AnnDetail/>}/>

          <Route path="/UserCenter" element={<UserCenter/>}/>
          <Route path="/UserCenter/AppliedActivity" element={<AppliedActivity/>}/>
          <Route path="/UserCenter/CumulativeScore" element={<CumulativeScore/>}/>
          <Route path="/UserCenter/AttendedActivity" element={<AttendedActivity/>}/>
          <Route path="/UserCenter/Rank" element={<Rank/>}/>
          <Route path="/UserCenter/UserInfo" element={<UserInfo/>}/>
          <Route path="*" element={<NoFoundPage/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
