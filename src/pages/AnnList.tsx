import React, {useEffect, useState} from "react";
import Auth from "../components/auth";
import {Empty, List} from "antd-mobile";
import {noticeApi} from "../api/ann";
import {dateChangeDay} from "../utils/account";
import {Col, Row} from "antd";
import {Link, useNavigate} from "react-router-dom";
import EmptyBox from "../components/emptyBox";

const Ann: React.FC = () =>{
  const navigate = useNavigate();
  const [items,setItems]=useState<API.noticeResItem[]>();
  const [total,setTotal]=useState<number>();
  const notice = async ()=>{
    const {data:{item,total}}=await noticeApi({page_size:3,page_num:0});
    setItems(item);
    setTotal(total);
  }
  useEffect(()=>{
    notice()
  },[])
  return <>
    {
      items&&items.length>0?( <List>
        {
          items.map((value,index) => {
            if(index<2){
              return <List.Item extra={dateChangeDay(value.created_at)} onClick={()=>{navigate(`/AnnDetail/${value.id}`)}} key={index}>{value?.title}</List.Item>
            }
          })
        }
      </List>):( <Empty description='暂无数据' />)
    }
  </>
}


const AnnList: React.FC = () => {
  return <>
    <Auth title={"公告"} isBack>
      <Ann/>
    </Auth>
  </>;
}
export default AnnList;
