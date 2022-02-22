import React, {useEffect, useState} from 'react';
import Map from "react-bmapgl/Map";
import Marker from "react-bmapgl/Overlay/Marker";
import {Button, Input, Modal, Form, Toast, Dialog} from "antd-mobile";
import Auth from "../components/auth";
import "../assets/styles/SignUpOut.scss"
import {ScaleControl, ZoomControl} from "react-bmapgl";
import {sign} from "../api/activity";
import {useParams} from "react-router-dom";
import feedBack from "../utils/apiFeedback";
// @ts-ignore
import wx from 'weixin-js-sdk'
import {toWxConfig, wxConfig} from "../api/baidu";
import {APP_ID} from "../constant";

const SignUpOut = () => {
  const [lng, setLng] = useState<number>(0)
  const [lat, setLat] = useState<number>(0)
  const [visible, setVisible] = useState(true)
  // const [targetLng, setTargetLng] = useState<number>(119.204299)
  // const [targetLat, setTargetLat] = useState<number>(26.064609)
  const {type} = useParams();
  const getLocation = async () => {
    let u = navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let androidUrl=decodeURIComponent(document.URL.split("#")[0]);
    let pathname=window.location.pathname;
    let iosUrl=androidUrl.replace(pathname,'/');
    let url=isIOS?iosUrl:androidUrl;
    const res = await wxConfig({url: url});
    const {app_id, nonce_str, timestamp, signature} = res?.data
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      appId: app_id, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonce_str, // 必填，生成签名的随机串
      signature: signature,// 必填，签名
      // jsApiList: ["checkJsApi", "getLocation","openLocation"], // 必填，需要使用的JS接口列表
      jsApiList: ["checkJsApi", "getLocation"], // 必填，需要使用的JS接口列表
    });
    wx.checkJsApi({
      jsApiList: ['getLocation'],
      success: function (res: any) {
        if (res.checkResult.getLocation == false) {
          Toast.show('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
          return;
        }
      },
      fail: function (res: any) {
        console.log('checkJsApi fail=' + JSON.stringify(res))
      }
    });
    wx.error(function (res: any) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      // Toast.show("微信接口信息验证失败")
      Dialog.confirm({content:"微信接口信息验证失败,请联系管理员"})
    });
    wx.ready(function () {
      wx.getLocation({
        isHighAccuracy: true, // 高精度定位，会调用gps获取高精度坐标
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res: any) {
          const {latitude, longitude} = res;
          var convertor = new BMapGL.Convertor();
          convertor.translate([new BMapGL.Point(longitude,latitude)], 3, 5, (data)=>{
            setLng(data.points[0].lng);
            setLat(data.points[0].lat);
          })
          return res;
        },
        cancel: function (res: any) {
          // Toast.show('请先授权位置信息')
          Dialog.confirm({
            content: "请先授权位置信息！"
          })
        },
        fail: (error: any) => {
          // Toast.show('出现故障，请联系管理员')
          Dialog.confirm({
            content: "请开启微信获得定位的权限！"
          })
        }
      })
    });
  }
  useEffect(() => {
    getLocation();
    setVisible(true);
  }, [type])
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
