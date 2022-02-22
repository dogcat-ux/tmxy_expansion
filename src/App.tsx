import React, {useEffect} from 'react';
import {useRoutes} from "react-router-dom";
import router from "./router";

function App() {
  useEffect(() => {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin) {
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=888"
    }
  }, [])
  return useRoutes(router)
}

export default App;
