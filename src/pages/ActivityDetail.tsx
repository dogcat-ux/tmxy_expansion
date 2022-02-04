import React, {useEffect, useRef, useState} from "react";
import Auth from "../components/auth";
import {useLocation, useParams} from "react-router-dom";
import EmptyBox from "../components/emptyBox";
import {Card, Button, Image, Input, Tag, Modal, Form} from 'antd-mobile'
import {AntOutline} from 'antd-mobile-icons'
import {afterNow, dateChange} from "../utils/account";
import {Descriptions, Space, Table, Typography} from "antd";
import "../assets/styles/components/ActivityDetail.scss"
import {activityApply, activityPublicity} from "../api/activity";
import {Code} from "../constant";
import feedBack from "../utils/apiFeedback";

const {Title} = Typography;
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
  const [loading, setLoading] = useState(false)
  const [items] = useState<any>(state);
  const father = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false)
  const [items1, setItems1] = useState<API.activityPublicityResItem[]>();//公示
  const handleSignUp = async (data: { code: string }) => {
    setLoading(true)
    const res = await activityApply(id, {...data})
    setLoading(false)
    if (feedBack(res, "报名成功", "报名失败")) setVisible(false);
  }
  const send = async () => {
    const res = await activityPublicity(id)
    if (res?.status === Code.SuccessCode) {
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
      <div id="father" ref={father}/>
      <Modal
        visible={visible}
        showCloseButton={true}
        content={(<div className="content">
          <Form onFinish={handleSignUp}
                footer={
                  <Button block type="submit" color="primary" loading={loading}>
                    确认
                  </Button>}>
            <Form.Item rules={[{required: true, message: '活动码不能为空'},]}
                       name="code">
              <Input placeholder='请输入活动码'/>
            </Form.Item>
          </Form>
        </div>)}
        onClose={() => {
          setVisible(false)
        }}
      />
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
                         disabled={!afterNow(items?.sign_up_end_time)}
                         onClick={() => {
                           setVisible(true)
                           // Modal.show({
                           //   getContainer: father.current,
                           //   content: (<div className="content">
                           //     <Form onFinish={handleSignUp}
                           //           footer={
                           //             <Button block type="submit" color="primary" loading={loading}>
                           //               确认
                           //             </Button>
                           //           }
                           //     >
                           //       <Form.Item rules={[{required: true, message: '活动码不能为空'},]}
                           //                  name="code">
                           //         <Input placeholder='请输入活动码'/>
                           //       </Form.Item>
                           //     </Form>
                           //   </div>),
                           //   showCloseButton: true,
                           // })
                         }}>
            {afterNow(items?.sign_up_end_time) ? "报名" : "报名截止"}
          </Button>}
          style={{borderRadius: '16px'}}
        >
          <div className="content">
            {/*{items.content}*/}
            <Descriptions title={
              <Tag color='primary'>{items.category_name}</Tag>
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
        {items1 && items1.length > 0 && <Table dataSource={items1} columns={columns} pagination={false}/>}
      </Auth>;
    </EmptyBox>
  )
}
export default ActivityDetail;
