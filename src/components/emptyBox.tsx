import React, {FC} from 'react';
import {Empty} from "antd-mobile";
import "../assets/styles/components/emptyBox.scss"
const EmptyBox: FC<{ children: React.ReactNode; isEmpty?: boolean }> = ({children, isEmpty = false}) => {
  return (
    <>
      {
        isEmpty ? <div className="EmptyBox">
          <Empty description='暂无数据'/>
        </div> : children
      }
    </>
  );
};

export default EmptyBox;
