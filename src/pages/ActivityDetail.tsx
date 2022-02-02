import React, {useEffect, useState} from "react";
import Auth from "../components/auth";
import {noticeApi, noticeDetail} from "../api/ann";
import {useLocation, useParams} from "react-router-dom";
import EmptyBox from "../components/emptyBox";
import {Card, Toast, Button, Image, Dialog, Input, Tag} from 'antd-mobile'
import {AntOutline, RightOutline} from 'antd-mobile-icons'
import {dateChange, dateChangeDay} from "../utils/account";
import {Descriptions, Space, Table, Typography} from "antd";
import "../assets/styles/components/ActivityDetail.scss"
import {activityApply, activityPublicity} from "../api/activity";
import {Code} from "../constant";

const {Text, Title} = Typography;
const columns: Array<{ title: string, dataIndex: string, key: string }> = [
  {
    title: '学号',
    dataIndex: 'stu_number',
    key: 'stu_number',
  },
  {
    title: '姓名',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '得分',
    dataIndex: 'activity_score',
    key: 'activity_score',
  },
]

const ActivityDetail: React.FC = () => {
  const {state} = useLocation();
  const {id} = useParams();
  const [value, setValue] = useState('')
  const [items, setItems] = useState<any>(state);
  const [items1, setItems1] = useState<API.activityPublicityResItem[]>();//公示
  const [type, setType] = useState<number>();//0过期 1正常 2已经报名
  const handleSignUp = async () => {
    if (value) {
      const res = await activityApply(id, {code: value})
      if (res.status === Code.SuccessCode) {
        Toast.show({
          icon: "success",
          content: "报名成功！"
        })
      } else {
        Toast.show({
          icon: "fail",
          // @ts-ignore
          content: res?.msg || '报名失败！'
        })
      }
    } else {
      Toast.show({
        icon: "fail",
        content: "请输入活动码！"
      })
    }
  }
  const send = async () => {
    const {status} = await activityApply(id)
    status === Code.ActivityExpired && setType(0);
    status === Code.hasIn && setType(2);
    status === Code.SuccessCode && setType(1);
    const res = await activityPublicity(id)
    if(res?.status===Code.SuccessCode){
      setItems1(res?.data?.item);
    }
  }
  useEffect(() => {
    console.log("state", state)
    send()
  }, [])
  // @ts-ignore
  return (
    <EmptyBox isEmpty={JSON.stringify(items) === "{}"}>
      <Auth title={items.activity_name} isBack>
        <Image src={items.image} className="activity-detail-img" fit='cover'/>
        <Card
          title={
            <div style={{fontWeight: 'normal'}}>
              <Space>
                <Title level={5}>
                  <AntOutline color="var(--adm-color-primary)"/>
                  {items.activity_name}
                </Title>
              </Space>
            </div>
          }
          extra={<Button color="primary"
                         shape="rounded"
                         disabled={type !== 1}
                         onClick={() =>
                           Dialog.confirm({
                             content: <div>
                               <Input
                                 placeholder='请输入活动码'
                                 defaultValue={value}
                                 readOnly={false}
                                 onChange={val => {
                                   setValue(val)
                                 }}
                               />
                             </div>,
                             onConfirm: handleSignUp,
                           })
                         }>
            {type === 0 ? "报名截止" : (type === 1 ? "报名" : "已报名")}
          </Button>}
          style={{borderRadius: '16px'}}
        >
          <div className="content">
            {/*{items.content}*/}
            <Descriptions title={
              <Tag color='primary'>文化类型</Tag>
            }>
              <Descriptions.Item label="活动地点">{items.activity_place}</Descriptions.Item>
              <Descriptions.Item
                label="报名启止时间">{dateChange(items.sign_up_start_time)} --<br/>{dateChange(items.sign_up_end_time)}
              </Descriptions.Item>
              <Descriptions.Item
                label="活动启止时间">{dateChange(items.activity_start_time)} --<br/>{dateChange(items.activity_end_time)}
              </Descriptions.Item>
              <Descriptions.Item label="活动单位">{items.activity_unit}</Descriptions.Item>
              <Descriptions.Item label="招募人数">{items.recruitment}</Descriptions.Item>
              <Descriptions.Item label="素拓分">{items.basic_score}</Descriptions.Item>
              <Descriptions.Item label="负责人">{items.responsible_people}</Descriptions.Item>
              <Descriptions.Item label="联系方式">{items.responsible_people_phone}</Descriptions.Item>
            </Descriptions>
          </div>
          {/*<div className="footer" onClick={e => e.stopPropagation()}>*/}
          {/*</div>*/}
        </Card>
        {type === 0 && <Table dataSource={items1} columns={columns} pagination={false}/>}
      </Auth>;
    </EmptyBox>
  )
}
export default ActivityDetail;
