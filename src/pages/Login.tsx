import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from "../store";
import {Navigate} from "react-router-dom";

const LoginBody=()=>{
  return(<>
    <div className={styles.container}>
      <Title level={2}>土木学院素质拓展平台</Title>
      <Text type="secondary">学生账号为学号,所有账号将由学院统一分发</Text>
      <div className={styles.customBody}>
        <Form
          className={styles.form}
          onFinish={handleSubmit}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary">
              确认
            </Button>
          }
        >
          <Form.Item
            className={styles.form}
            name="role"
            label="身份"
            initialValue={role}
            rules={[{ required: true, message: '身份不能为空' }]}
          >
            <Space className={style.scoped}>
              <div className="my-adm-dropdown">
                <div className="my-adm-dropdown-nav">
                  <div
                    className={
                      isRoleActive
                        ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                        : 'my-adm-dropdown-item'
                    }
                    onClick={handleRoleDropClick}
                  >
                    <div
                      className={
                        isRoleActive
                          ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                          : 'my-adm-dropdown-item-title'
                      }
                    >
                      <span className="my-adm-dropdown-item-title-text">
                        {role}
                      </span>
                      <span
                        className={
                          isRoleActive
                            ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                            : 'my-adm-dropdown-item-title-arrow'
                        }
                      >
                        <DownFill fontSize={8} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Form.Item>
          <Form.Item
            className={styles.form}
            name="stu_number"
            label="账号"
            rules={[
              { required: true, message: '账号不能为空' },
              {
                pattern: /^\w{6,15}$/,
                message: '账号在6-15位内且不含空格！',
              },
            ]}
          >
            <Input onChange={console.log} clearable placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            className={styles.form}
            name="password"
            label="密码"
            rules={[
              { required: true, message: '密码不能为空' },
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
