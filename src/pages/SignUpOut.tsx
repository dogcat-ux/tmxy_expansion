import React, {useEffect, useState} from 'react';
import Map from "react-bmapgl/Map";
import Marker from "react-bmapgl/Overlay/Marker";
import {Button, Input, Modal, Form} from "antd-mobile";
import Auth from "../components/auth";
import {userLocation} from "../api/baidu";
import "../assets/styles/SignUpOut.scss"
import {ScaleControl, ZoomControl} from "react-bmapgl";
import {sign} from "../api/activity";
import {useParams} from "react-router-dom";
import feedBack from "../utils/apiFeedback";

const SignUpOut = () => {
  // const [value, setValue] = useState('')
  const [lng, setLng] = useState<number>(119.204299)
  const [lat, setLat] = useState<number>(26.064609)
  const [visible, setVisible] = useState(true)
  // const [targetLng, setTargetLng] = useState<number>(119.204299)
  // const [targetLat, setTargetLat] = useState<number>(26.064609)
  const {type} = useParams();
  const getLocation = async () => {
    await userLocation();
    const longitude = Number(window.localStorage.getItem("longitude"));
    const latitude = Number(window.localStorage.getItem("latitude"));
    setLng(longitude);
    setLat(latitude);
    console.log("签到签退页面的latitude，longitude",latitude,longitude)
  }
  useEffect(() => {
    getLocation();
    return () => {
    }
  }, [])
  const onFinish = async (data: any) => {
    const res = await sign({
      ...data,
      signed: Number(type || "0"),
      stu_longitude: lng,
      stu_latitude: lat
    });
    if (type === "0") {
      if (feedBack(res, "签到成功", "签到失败")) setVisible(false);
    }
    if (type === "1") {
      if (feedBack(res, "签退成功", "签退失败")) setVisible(false);
    }
  }

  return (
    <Auth title={type === "0" ? "签到" : "签退"}>
      <Modal
        visible={visible}
        showCloseButton={true}
        content={(<div className="content">
          <Form onFinish={onFinish}
                footer={
                  <Button block type="submit" color="primary">
                    确认
                  </Button>
                }
          >
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
      <div>
        <Map center={new BMapGL.Point(lng, lat)} zoom={15} tilt={60} enableScrollWheelZoom
             className="map"
             enableDragging
        >
          {/*// @ts-ignore*/}
          <ZoomControl/>
          {/*// @ts-ignore*/}
          <ScaleControl/>
          {/*// @ts-ignore*/}
          <Marker position={new BMapGL.Point(lng, lat)}/>
          {/*<NavigationControl map={}/>*/}
          {/*// @ts-ignore*/}
          {/*<InfoWindow position={firstPoint} text="内容" title="标题"/>*/}
          {/*// @ts-ignore*/}
          {/*<Circle*/}
          {/*  center={new BMapGL.Point(targetLng, targetLat)}*/}
          {/*  radius={500}*/}
          {/*  strokeColor="#1890ff"*/}
          {/*  strokeWeight={2}*/}
          {/*  fillColor="#91d5ff"*/}
          {/*  fillOpacity={0.3}/>*/}
          {/*<NavigationControl />*/}
          {/*<InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>*/}
        </Map>
      </div>
    </Auth>
  );
};

export default SignUpOut;
