import { Button, Result } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/user';
import {useNavigate} from "react-router-dom";

const NoFoundPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
