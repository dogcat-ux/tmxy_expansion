import React, {useState} from 'react';
import '../assets/styles/login.scss';
import {Toast, Form, Input, Button, Picker, Space} from 'antd-mobile';
import {DownFill} from 'antd-mobile-icons';
import {useSelector} from 'react-redux';
import {RootState} from "../store";
import {Navigate, useNavigate} from "react-router-dom";
import {Typography} from 'antd';
import {Code} from "../constant";
import {login} from "../api/user";
import {useDispatch} from 'react-redux';
import {save} from '../store/user';

const {Text, Title} = Typography;

const LoginBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values: {
    stu_number: string;
    password: string;
  }) => {
    const data = await login({...values});
    if (data.status === Code.SuccessCode) {
      console.log("data", data)
      dispatch(save({...data.data.user, token: data.data.token}));
      Toast.show({
        content: '登录成功',
      });
      navigate('/home');
    } else {
      Toast.show({
        content: '账号名/密码/身份错误',
      });
    }
  };
  return (<>
    <div className="container">
      <Title level={2} className="space">土木学院素质拓展平台</Title>
      <Text type="secondary">学生账号为学号,所有账号将由学院统一分发</Text>
      <div className="customBody">
        <Form
          className="form"
          onFinish={handleSubmit}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary">
              确认
            </Button>
          }
        >
          <Form.Item
            className="form"
            name="stu_number"
            label="账号"
            rules={[
              {required: true, message: '账号不能为空'},
              {
                pattern: /^\w{6,15}$/,
                message: '账号在6-15位内且不含空格！',
              },
            ]}
          >
            <Input onChange={console.log} clearable placeholder="请输入账号"/>
          </Form.Item>
          <Form.Item
            className="form"
            name="password"
            label="密码"
            rules={[
              {required: true, message: '密码不能为空'},
              {
                pattern: /^\w{6,16}$/,
                message: '密码在6-16位内且不含空格！',
              },
            ]}
          >
            <Input
              type="password"
              clearable
              onChange={console.log}
              placeholder="请输入密码"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  </>)
}

const Login = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      {user.authority === 0 ? (
        <Navigate to="/home"/>
      ) : (
        <LoginBody/>
      )}
    </>
  );
};

export default Login;
