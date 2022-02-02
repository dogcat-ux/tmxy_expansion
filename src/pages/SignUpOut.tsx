import React, {useEffect, useState} from 'react';
import Map from "react-bmapgl/Map";
import Marker from "react-bmapgl/Overlay/Marker";
import {Button, Input, Modal} from "antd-mobile";
import Auth from "../components/auth";
import {Action} from "antd-mobile/es/components/modal";
import {userLocation} from "../api/baidu";
import "../assets/styles/SignUpOut.scss"
import {AutoComplete, Circle, InfoWindow, NavigationControl, ScaleControl, ZoomControl} from "react-bmapgl";
import {sign} from "../api/activity";
import {useParams} from "react-router-dom";
import feedBack from "../utils/apiFeedback";

const SignUpOut = () => {
  const [value, setValue] = useState('')
  const [lng, setLng] = useState<number>(119.204299)
  const [lat, setLat] = useState<number>(26.064609)
  const [targetLng, setTargetLng] = useState<number>(119.204299)
  const [targetLat, setTargetLat] = useState<number>(26.064609)
  const firstPoint = {lng: Number(lng), lat: Number(lat)}
  const {type} = useParams();
  const getLocation = async (code: string) => {
    // @ts-ignore
    const {content, status} = await userLocation()
    if (status === 0) {
      const {x, y} = content.point;
      setLng(Number(x));
      setLat(Number(y));
      const res = await sign({
        code, signed: parseInt(type || "0"),
        stu_longitude: Number(x),
        stu_latitude: Number(y)
      });
      if (type === "0") feedBack(res, "签到成功", "签到失败")
      if (type === "1") feedBack(res, "签退成功", "签退失败")
    }
  }
  useEffect(() => {
    Modal.show({
      content: (
        <div>
          <Input
            placeholder='请输入活动码'
            onChange={val => {
              setValue(val);
              getLocation(val);
            }}
          />
        </div>
      ),
      actions: [
        {
          key: 'ok',
          text: '确定',
          primary: true,
        },
        // {
        //   key: 'cancel',
        //   text: '取消',
        //   primary: true,
        // },
      ],
      showCloseButton: true,
      onAction: (action: Action, index: number) => {
        if (action.key === "ok") {
          console.log(value)
        } else if (action.key === "cancel") {

        }
      }
    })
  }, [])
  return (
    <Auth title="签到">
      <div>
        <Map center={new BMapGL.Point(lng, lat)} zoom={15} tilt={60} enableScrollWheelZoom
             onClick={e => console.log(e)}
             className="map"
             enableDragging
        >
          <AutoComplete
            input="ac"
            onHighlight={e => {
              console.log(e)
            }}
            onConfirm={e => {
              console.log(e)
            }}
            onSearchComplete={e => {
              console.log(e)
            }}
          />
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
          <Circle
            center={new BMapGL.Point(targetLng, targetLat)}
            radius={500}
            strokeColor="#1890ff"
            strokeWeight={2}
            fillColor="#91d5ff"
            fillOpacity={0.3}/>
          {/*<NavigationControl />*/}
          {/*<InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>*/}
        </Map>
      </div>
    </Auth>
  );
};

export default SignUpOut;
