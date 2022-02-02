import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Auth from "../components/auth";
import {Swiper, Image, List, Empty} from "antd-mobile";
import "../assets/styles/home.scss"
import {Col, Row} from "antd";
import {Tabs} from 'antd-mobile'
import {noticeApi} from "../api/ann";
import {dateChange, dateChangeDay} from "../utils/account";
import {activityApplied} from "../api/user";
import {activityList} from "../api/activity";
import {carousels} from "../api/slideshow";
import EmptyBox from "../components/emptyBox";
import ActivityItem from "../components/activityItem";
import {category} from "../api/category";
import {PAGE1, PAGE_SIZE} from "../constant";

const Carousels: React.FC = () => {
  const [items, setItems] = useState<API.carouselsResItem[]>();
  const [total, setTotal] = useState<number>();
  const swiper = async () => {
    const {data: {item, total}} = await carousels();
    setItems(item);
    setTotal(total);
  }
  useEffect(() => {
    swiper()
  }, [])
  return (
    <Swiper autoplay>
      {
        total && total > 0 ? items?.map(value => {
          return (<Swiper.Item>
            <div className="home_content">
              <Image src={value?.img_path || ''} width={375} height={200} fit='cover' className="img"/>
            </div>
          </Swiper.Item>)
        }) : <Swiper.Item className="home_content">
          <Image src="../assets/img/0.jpg" width={375} height={200} fit='cover' className="img"/>
        </Swiper.Item>
      }
    </Swiper>
  )
};

const Ann: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<API.noticeResItem[]>();
  const [total, setTotal] = useState<number>();
  const notice = async () => {
    const {data: {item, total}} = await noticeApi({page_size: 3, page_num: 0});
    setItems(item);
    setTotal(total);
  }
  useEffect(() => {
    notice()
  }, [])
  return <>
    {
      items && items.length > 0 ? (<List>
        {
          items.map((value, index) => {
            if (index < 2) {
              return <List.Item extra={dateChangeDay(value.created_at)} onClick={() => {
                navigate(`/AnnDetail/${value.id}`)
              }} key={index}>{value?.title}</List.Item>
            }
          })
        }
        <List.Item>
          <Row>
            <Col span={5} offset={19}>
              <Link to="/AnnList" className="link">更多{">>>"}</Link>
            </Col>
          </Row>
        </List.Item>
      </List>) : (<Empty description='暂无数据'/>)
    }
  </>
}

const Activity = () => {
  const [items, setItems] = useState<API.personActivityResItem[]>();
  const [categorys, setCategorys] = useState<API.categoryItem[]>([]);
  const sendApi = async () => {
    const {data: {item}} = await category()
    setCategorys(item);
    const list = await activityList({
      category_name: item[0].category_name || '',
      page_num: PAGE1,
      page_size: PAGE_SIZE
    })
    setItems(list?.data?.item);
  }
  const onChange = async (key: string) => {
    const list = await activityList({
      category_name: key,
      page_num: PAGE1,
      page_size: PAGE_SIZE
    })
    setItems(list?.data?.item);
  }
  useEffect(() => {
    sendApi()
  }, [])
  return (
    <EmptyBox isEmpty={!categorys || categorys.length < 0}>
      {/*<Tabs defaultActiveKey={categorys[0]?.category_name}>*/}
      <Tabs defaultActiveKey={"0"} onChange={onChange}>
        {categorys?.map((value, index) => {
          return <Tabs.Tab title={value.category_name} key={value.category_name}>
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
          </Tabs.Tab>
        })}
      </Tabs></EmptyBox>
  )
}

const HomeBody = () => {
  return <>
    <Carousels/>
    <Ann/>
    <Activity/>
  </>
}

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      {user.authority === -1 ? (
        <Navigate to="/login"/>
      ) : (
        <Auth title={"土木工程学院"}>
          <HomeBody/>
        </Auth>
      )}
    </>
  );
}
export default Home;
