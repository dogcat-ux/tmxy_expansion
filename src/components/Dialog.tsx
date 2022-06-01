import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import "../assets/styles/components/dialog.scss"
import {Button, Space} from "antd-mobile";
import {useNavigate} from "react-router-dom";

const Dialog = (props: any) => {
  const navigate=useNavigate();
  const node = document.createElement('div');
  document.body.appendChild(node);
  useEffect(() => {
    return () => {
      document.body.removeChild(node);
    };
  }, []);
  return createPortal(
    <div className="dialog-box">
      <div className="com-dialog">
        <Space>
          {/*0 是签到  1是签退*/}
          <Button  color="primary" className="com-dialog-item" onClick={()=>{navigate('/ActivityApply')}} >申请</Button>
          <Button  color="primary" className="com-dialog-item" onClick={()=>{
            if(window.location.pathname==="/SignUpOut/0"){
              window.location.reload()
            }
            navigate(`/SignUpOut/0`)
          }}>签到</Button>
          <Button  color="primary" className="com-dialog-item" onClick={()=>{
            if(window.location.pathname==="/SignUpOut/1"){
              window.location.reload()
            }
            navigate(`/SignUpOut/1`)}
          }>签退</Button>
        </Space>
      </div>
    </div>,
    node
  )
}

export default Dialog;
