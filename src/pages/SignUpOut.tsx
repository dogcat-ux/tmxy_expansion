import React, {useEffect, useRef, useState} from 'react';
import Map from "react-bmapgl/Map";
import Marker from "react-bmapgl/Overlay/Marker";
import {Button, Input, Dialog, Modal, Toast, Form} from "antd-mobile";
// import {Button, Modal, Toast} from "antd-mobile";
import Auth from "../components/auth";
import {Action} from "antd-mobile/es/components/modal";
import {userLocation} from "../api/baidu";
import "../assets/styles/SignUpOut.scss"
import {AutoComplete, Circle, InfoWindow, NavigationControl, ScaleControl, ZoomControl} from "react-bmapgl";
import {sign} from "../api/activity";
import {useParams} from "react-router-dom";
import feedBack from "../utils/apiFeedback";
// import {Input} from "antd";

const SignUpOut = () => {
  const [value, setValue] = useState('')
  const [lng, setLng] = useState<number>(119.204299)
  const [lat, setLat] = useState<number>(26.064609)
  const father = useRef<HTMLDivElement>(null);
  const [targetLng, setTargetLng] = useState<number>(119.204299)
  const [targetLat, setTargetLat] = useState<number>(26.064609)
  const {type} = useParams();
  const toSign = async () => {
    if (!value) {
      Toast.show("请输入活动码！")
    } else {
      const res = await sign({
        code: value, signed: Number(type || "0"),
        stu_longitude: lng,
        stu_latitude: lat
      });
      if (type === "0") {
        if (!feedBack(res, "签到成功", "签到失败")) throw new Error();
      }
      if (type === "1") {
        if (!feedBack(res, "签退成功", "签退失败")) throw new Error();
        feedBack(res, "签退成功", "签退失败")
      }
    }
  }
  const getLocation = async () => {
    // @ts-ignore
    const {content, status} = await userLocation()
    if (status === 0) {
      const {x, y} = content.point;
      setLng(Number(x));
      setLat(Number(y));
    }
  }
  const onFinish = async (data: any) => {
    const res = await sign({
      ...data,
      signed: Number(type || "0"),
      stu_longitude: lng,
      stu_latitude: lat
    });
    if (type === "0") {
      if (!feedBack(res, "签到成功", "签到失败")) throw new Error();
    }
    if (type === "1") {
      if (!feedBack(res, "签退成功", "签退失败")) throw new Error();
      feedBack(res, "签退成功", "签退失败")
    }
  }
  useEffect(() => {
    getLocation();
    Modal.show({
      getContainer: father.current,
      content: (<div className="content">
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
      </div>),
      showCloseButton: true,
    })
    return () => {
    }
  }, [])
  return (
    <Auth title={type === "0" ? "签到" : "签退"}>
      <div id="father" ref={father}/>
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
