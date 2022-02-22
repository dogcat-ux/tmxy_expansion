import React, {useEffect, useState} from 'react';
import {TabBar} from 'antd-mobile';
import "../assets/styles/components/layout.scss"
import {
  AppOutline,
  ContentOutline,
  UserContactOutline,
} from 'antd-mobile-icons';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useLocation, useNavigate} from "react-router-dom";
import Dialog from "./Dialog";

const MyTabBar: React.FC = () => {
  const navigate = useNavigate();
  const [isShowDialog, setIsShowDialog] = useState(false);
  const location = useLocation()
  const { pathname } = location
  const closeDialog = () => {
    setIsShowDialog(false);
  }
  const onSure = () => {
    console.log('确定...');
    setTimeout(() => {
      setIsShowDialog(false);
    }, 2000);
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <ContentOutline/>,
    },
    {
      key: '/ActivityApply',
      title: '参与活动',
      icon: <AppOutline/>,
    },
    {
      key: '/UserCenter',
      title: '个人中心',
      icon: <UserContactOutline/>,
    },
  ];
  // const [activeKey, setActiveKey] = useState('home');
  // const handleChange = (key: string) => {
  //   setActiveKey(key);
  //   key !== "ActivityApply" && navigate(`/${key}`);
  //   if(key === "ActivityApply"){
  //     setIsShowDialog(!isShowDialog);
  //   }
  // };
  const setRouteActive = (key: string) => {
    if(key === "/ActivityApply"){
      setIsShowDialog(!isShowDialog);
    }else{
      navigate(`${key}`);
    }
  }
  useEffect(()=>{
    console.log(pathname)
  },[])
  return (
    <>
      <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
      {/*<TabBar onChange={handleChange} style={{background: '#ffffff'}} activeKey={activeKey}>*/}
      {/*  {tabs.map((item) => (*/}
      {/*    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>*/}
      {/*  ))}*/}
      {/*</TabBar>*/}
      {
        isShowDialog
        && <Dialog
            title="这是标题"
            dialogWidth='80%'
            onCancle={closeDialog}
            onOk={onSure}
            cancelText="残忍离开"
            sureText="我再想想"
        >
          <div className='dialog-content'>具体内容请写在这里...</div>
        </Dialog>}
    </>
  );
};
export default MyTabBar;
