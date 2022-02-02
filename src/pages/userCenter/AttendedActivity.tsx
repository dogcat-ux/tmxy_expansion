import React, {useEffect, useState} from "react";
import Auth from "../../components/auth";
import {useNavigate} from "react-router-dom";
import {activityApplied} from "../../api/user";
import EmptyBox from "../../components/emptyBox";
import "../../assets/styles/userCenter/attendedActivity.scss"
import ActivityItem from "../../components/activityItem";

const AttendedActivity: React.FC = () => {
  const [items, setItems] = useState<API.personActivityResItem[]>();
  const sendApi = async () => {
    const {data} = await activityApplied()
    setItems(data);
  }
  useEffect(() => {
    sendApi()
  }, [])
  const navigator = useNavigate()
  return <Auth title={"已参加活动"} isBack>
    <EmptyBox isEmpty={!items || items.length < 0}>
      {
        items?.map((value, index) => {
            return (
              <div key={index}>
                <ActivityItem value={value}/>
              </div>
            )
          }
        )
      }
    </EmptyBox>
  </Auth>;
}
export default AttendedActivity;
