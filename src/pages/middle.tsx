import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {logout} from "../store/user";
import {useNavigate} from "react-router-dom";

const Middle = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [])
  return (
    <></>
  );
};

export default Middle;
