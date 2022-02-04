import React, {FC} from 'react';
import {Card, Image, Space} from "antd-mobile";
import "../assets/styles/components/ActivityItem.scss"
import {dateChange, dateChangeDay} from "../utils/account";
import {Col, Divider, Row, Typography} from "antd";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;
const ActivityItem: FC<{ value: API.personActivityResItem }> = ({value}) => {
  const navigator = useNavigate()
  return (
    <>
      <div className="activity-item-box theme-main" onClick={() => {
        navigator(`/ActivityDetail/${value?.activity_id}`, {
          state: value
        })
      }}>
        <Space>
          <Image src={value?.image || ''}  fit='fill' className="activity-item-img" lazy/>
          <div className="activity-item">
            <Title level={4}>{value?.activity_name}</Title>
            <Row>
              <Col span={20}>
                <div>{dateChange(value?.activity_start_time)} -- {dateChange(value?.activity_end_time)}</div>
              </Col>
              <Col span={4}>
                <div>{value?.recruitment}人</div>
              </Col>
            </Row>
          </div>
        </Space>
      </div>
    </>
  );
};

export default ActivityItem;
