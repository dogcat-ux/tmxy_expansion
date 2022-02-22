import React, {useEffect, useState} from "react";
import Auth from "../components/auth";
import {noticeDetail} from "../api/ann";
import {useParams} from "react-router-dom";
import EmptyBox from "../components/emptyBox";
import {Card} from 'antd-mobile'
import {AntOutline} from 'antd-mobile-icons'
import {dateChangeDay} from "../utils/account";
import {Space, Typography} from "antd";

const {Title} = Typography;

const AnnDetail:  React.FC = () => {
  const [items, setItems] = useState<API.noticeResItem>({});
  const {id} = useParams();
  const notice = async () => {
    if (id) {
      const {data} = await noticeDetail(id || 0);
      setItems(data);
    }
  }
  useEffect(() => {
    notice()
  }, [])
  return (
    <EmptyBox isEmpty={JSON.stringify(items) === "{}"}>
      <Auth title={items.title || "暂无"} isBack>
        <Card
          title={
            <div style={{fontWeight: 'normal'}}>
              <Space>
                <AntOutline style={{marginRight: '4px', color: '#1677ff'}}/>
                <Title level={5}>
                  {items.title}
                </Title>
              </Space>
            </div>
          }
          extra={dateChangeDay(items.created_at)}
          style={{borderRadius: '16px'}}
        >
          <div className="content">{items.content}</div>
          <div className="footer" onClick={e => e.stopPropagation()}>
          </div>
        </Card>
      </Auth>;
    </EmptyBox>
  )
}
export default AnnDetail;
