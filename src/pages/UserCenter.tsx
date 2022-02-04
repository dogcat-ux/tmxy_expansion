import React, {useEffect, useState} from "react";
import Auth from "../components/auth";
import ProfileHeader from "../components/profileHeader";
import {Form, Grid, Input, List, Modal, TabBar, Toast} from "antd-mobile";
import {
  EditSOutline,
  FillinOutline,
  UserAddOutline,
  PieOutline,
  HistogramOutline,
  TextDeletionOutline,
  FlagOutline
} from "antd-mobile-icons";
import Button from "antd-mobile/es/components/button";
import {useNavigate} from "react-router-dom";
import {activityAppliedNumber, allScore, allScorePost, amendPassword, personRankNumber, yearList} from "../api/user";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/user";
import {Code} from "../constant";
import "../assets/styles/userCenter.scss"

const UserCenter: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [appliedNumber, setAppliedNumber] = useState<number>(0);
  const [rankNumber, setRankNumber] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const sendApi = async (key?: number) => {
    const [allScoreRes, activityAppliedNumberRes, personRankNumberRes] = await Promise.all([allScore(), activityAppliedNumber(), personRankNumber()])
    setScore(allScoreRes?.data);
    setAppliedNumber(activityAppliedNumberRes?.data);
    setRankNumber(personRankNumberRes?.data);
  }
  useEffect(() => {
    sendApi()
  }, [])
  const handleSubmit = async (values: API.AmendPasswordParams) => {
    const res = await amendPassword({...values});
    if (res.status === Code.SuccessCode) {
      Toast.show({
        content: '修改密码成功！请重新登录！',
      });
      setVisible(false);
      dispatch(logout());
      navigator('/login');
    } else if (res.status === Code.NoMatchCode) {
      Toast.show({
        content: '旧密码错误，不匹配！',
      });
    } else {
      Toast.show({
        content: '修改密码失败',
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigator('/login');
  };

  return <Auth title={"个人中心"}>
    <ProfileHeader/>
    <TabBar activeKey={""}>
      <TabBar.Item key="累计分数" title={
        <div className="user_center_info">
          <div>{score.toFixed(2)}分</div>
          <div>累计分数</div>
        </div>}/>
      <TabBar.Item key="已参与活动" title={
        <div className="user_center_info">
          <div>{appliedNumber}次</div>
          <div>已参与活动</div>
        </div>}/>
      <TabBar.Item key="个人排名" title={
        <div className="user_center_info">
          <div>{rankNumber}名</div>
          <div>个人排名</div>
        </div>}/>
    </TabBar>
    <List>
      {/*<List.Item arrow={false} onClick={() => {*/}
      {/*  navigator("/UserCenter/UserInfo")*/}
      {/*}}>*/}
      {/*  <FillinOutline color="var(--adm-color-primary)" className="theme-pad"/>*/}
      {/*  修改个人信息*/}
      {/*</List.Item>*/}
      <List.Item arrow={false} onClick={() => {
        navigator("/UserCenter/AppliedActivity")
      }}>
        <FlagOutline color="var(--adm-color-primary)" className="theme-pad"/>
        已申请活动
      </List.Item>
      <List.Item arrow={false} onClick={() => {
        navigator("/UserCenter/AttendedActivity")
      }}>
        <UserAddOutline color="var(--adm-color-primary)" className="theme-pad"/>
        已报名活动
      </List.Item>
      <List.Item arrow={false} onClick={() => {
        navigator("/UserCenter/CumulativeScore")
      }}>
        <PieOutline color="var(--adm-color-primary)" className="theme-pad"/>
        累计分数明细
      </List.Item>
      <List.Item arrow={false} onClick={() => {
        navigator("/UserCenter/Rank")
      }}>
        <HistogramOutline color="var(--adm-color-primary)" className="theme-pad"/>
        分数排行榜
      </List.Item>

      <List.Item arrow={false} onClick={() => {
        setVisible(true)
      }}>
        <EditSOutline color="var(--adm-color-primary)" className="theme-pad"/>
        修改密码
      </List.Item>
      <List.Item arrow={false}
                 onClick={handleLogout}
      >
        <TextDeletionOutline
          color="var(--adm-color-primary)"
          className="theme-pad"/>
        退出登录
      </List.Item>
    </List>
    <Modal
      visible={visible}
      content={
        <div>
          <Form
            style={{}}
            mode="card"
            onFinish={handleSubmit}
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary">
                确认
              </Button>
            }
          >
            <Form.Item
              name="old_password"
              label="旧密码"
              rules={[
                {required: true, message: '密码不能为空'},
                {
                  pattern: /^\w{6,16}$/,
                  message: '密码在6-16位内！',
                },
              ]}
            >
              <Input
                className="pass_input"
                type="password"
                clearable
                onChange={console.log}
                placeholder="请输入旧密码"
              />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="新密码"
              rules={[
                {required: true, message: '新密码不能为空'},
                {
                  pattern: /^\w{6,16}$/,
                  message: '密码在6-16位内！',
                },
              ]}
            >
              <Input
                type="password"
                clearable
                onChange={console.log}
                placeholder="请输入新密码"
              />
            </Form.Item>
          </Form>
        </div>
      }
      closeOnMaskClick
      showCloseButton
      onClose={() => {
        setVisible(false);
      }}
    />

    {/*<AmendPassword isVisible={visible}/>*/}
  </Auth>;
}
export default UserCenter;
