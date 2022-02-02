import React, {useEffect, useState} from "react";
import Auth from "../../components/auth";
import {activityApplied, rank} from "../../api/user";
import {useNavigate} from "react-router-dom";
import EmptyBox from "../../components/emptyBox";
import {Avatar, Card, Grid, Image, List, Space, Tag} from "antd-mobile";
import "../../assets/styles/userCenter/rank.scss"
const Rank: React.FC = () => {
  const [items, setItems] = useState<API.rankResItem[]>();
  const sendApi = async (key?: number) => {
    const {data:{item}} = await rank()
    console.log("item",item)
    setItems(item);
  }
  useEffect(() => {
    sendApi()
  }, [])
  const navigator = useNavigate()
  return <Auth title={"排行榜"} isBack>
    <EmptyBox isEmpty={!items || items.length < 0}>
      <List>
        {items?.map((item,index) => (
          <List.Item
            key={index}
            prefix={
              index+1
            }
            extra={item?.score?.toFixed(2)+"分"}
          >
            <Space>
              <Image
                src={item.avatar||''}
                style={{ borderRadius: 20 }}
                fit='cover'
                width={40}
                height={40}
              />
              <div className="name_box">
                {item?.user_name||''}
              </div>
            </Space>
          </List.Item>
        ))}
      </List>
    </EmptyBox>
  </Auth>
}
export default Rank;
