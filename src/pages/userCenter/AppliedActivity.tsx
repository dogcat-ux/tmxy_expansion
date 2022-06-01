import React, {useEffect, useState} from "react";
import Auth from "../../components/auth";
import {Tabs} from "antd-mobile";
import {personActivity} from "../../api/user";
import ActivityItem from "../../components/activityItem";
import EmptyBox from "../../components/emptyBox";
// 0 申请中	 1 申请通过 2 申请失败
const AppliedActivity: React.FC = () => {
  const [all, setAll] = useState<API.noticeResItem[]>();
  const sendApi = async (key?: number) => {
    // 0 申请中	 1 申请通过 2 申请失败
    const res = await personActivity({status: -1})
    setAll(res?.data);
  }
  const onChange = async (key: string) => {
    if(key==="all"){
      const res = await personActivity({status: -1})
      setAll(res?.data);
    }else if(key==="items"){
      const res = await personActivity({status: 0})
      setAll(res?.data);
    }else if(key==="items1"){
      const res = await personActivity({status: 1})
      setAll(res?.data);
    }else if (key==="items2"){
      const res = await personActivity({status: 2})
      setAll(res?.data);
    }
  }
  useEffect(() => {
    sendApi()
  }, [])
  return <Auth title={"已申请活动"} isBack>
    <Tabs onChange={onChange}>
      <Tabs.Tab title='全部' key='all'>
        <EmptyBox isEmpty={!all || all.length <= 0}>
          {all?.map((value, index) => <ActivityItem value={value} key={index}></ActivityItem>)}
        </EmptyBox>
      </Tabs.Tab>
      <Tabs.Tab title='申请中' key='items'>
        <EmptyBox isEmpty={!all || all.length <= 0}>
          {all?.map((value, index) => <ActivityItem value={value} key={index}></ActivityItem>)}
        </EmptyBox>
      </Tabs.Tab>
      <Tabs.Tab title='申请通过' key='items1'>
        <EmptyBox isEmpty={!all || all.length <= 0}>
          {all?.map((value, index) => <ActivityItem value={value} key={index}></ActivityItem>)}
        </EmptyBox>
      </Tabs.Tab>
      <Tabs.Tab title='申请失败' key='items2'>
        <EmptyBox isEmpty={!all || all.length <= 0}>
          {all?.map((value, index) => <ActivityItem value={value} key={index}></ActivityItem>)}
        </EmptyBox>
      </Tabs.Tab>
    </Tabs>
  </Auth>;
}
export default AppliedActivity;
