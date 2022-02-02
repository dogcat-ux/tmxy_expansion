import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate, useNavigate} from "react-router-dom";
import {Button, Result, Typography} from "antd";
import MyTabBar from "./myTabBar";
import {AutoCenter, Modal, NavBar} from "antd-mobile";

const {Text, Title} = Typography;
// import "../assets/styles/components/layout.scss"

const MyLayout: React.FC<any> = ({children, title, isBack = false, isBackConfirm = false}) => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const back = () => {
    if(isBackConfirm){
      Modal.confirm({
        content:"确定要放弃此次编辑",
        onConfirm: () => {
          navigate(-1)
        }
      })
    }else {
      navigate(-1)
    }
  }
  return (
    <>
      {user.authority === -1 ? (
        children
      ) : (
        <div className="layoutBox">
          {/*<header>*/}
          <NavBar onBack={back} style={{fontSize: 12}} backArrow={isBack} className="header">
            {title}
          </NavBar>
          {/*</header>*/}
          <section>
            {children}
            <div className="box"/>
          </section>
          <footer>
            <MyTabBar/>
          </footer>
        </div>
      )}
    </>
  );
};

// const Auth: FC<{ children: React.ReactNode; title: string, isBack?: boolean }> = ({children, title, isBack = false}) => {
const Auth: FC<{ children: any; title: string, isBack?: boolean, isBackConfirm?: boolean }> = ({children, title, isBack = false, isBackConfirm = false}) => {
  const navigate = useNavigate();
  const [isForbidden, setIsForbidden] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    document.title = '土木工程学院';
  }, []);
  return (
    <>
      {user?.authority !== 0 && <Navigate to="/login"/>}
      {isForbidden ? (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={() => {
              navigate('/')
            }}>
              Back Home
            </Button>
          }
        />
      ) : (
        <MyLayout title={title} isBack={isBack} isBackConfirm={isBackConfirm}>
          {(children)}
        </MyLayout>
      )}
    </>
  );
};

export default Auth;
