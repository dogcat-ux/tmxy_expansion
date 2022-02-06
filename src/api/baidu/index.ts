import _ from 'lodash';
import request from '../index';
import {stringify} from "querystring";
import {AK, APP_ID, BaiDu_URL, BASE_URL} from "../../constant";
import axios from "axios";
import MAP from "./data";
import jsonp from "jsonp";
import {Toast} from "antd-mobile";
// @ts-ignore
import wx from 'weixin-js-sdk'

// const url = process.env.NODE_ENV === 'development' ? "http://localhost:3000/apc/" : BaiDu_URL;

export async function wxConfig(body: { url: string }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.WxConfig>(`api/v1/get-sign`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function userLocation(body?: { url: string }, options?: { [key: string]: any }) {
  if(localStorage.getItem('signature')){
    const app_id=window.localStorage.getItem('app_id')
    const timestamp=window.localStorage.getItem('timestamp')
    const nonce_str=window.localStorage.getItem('nonce_str')
    const signature=window.localStorage.getItem('signature')
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: app_id || APP_ID, // 必填，公众号的唯一标识
      timestamp: Number(timestamp), // 必填，生成签名的时间戳
      nonceStr: nonce_str, // 必填，生成签名的随机串
      signature: signature,// 必填，签名
      jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
    });
  }else{
    const res = await wxConfig({url: window.location.href});
    const {app_id, nonce_str, timestamp, signature} = res?.data
    window.localStorage.setItem("app_id",app_id)
    window.localStorage.setItem("timestamp",timestamp.toString())
    window.localStorage.setItem("nonce_str",nonce_str)
    window.localStorage.setItem("signature",signature)
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: app_id || APP_ID, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonce_str, // 必填，生成签名的随机串
      signature: signature,// 必填，签名
      jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
    });
  }
  wx.checkJsApi({
    jsApiList: ['getLocation'],
    success: function (res:any) {
      if (res.checkResult.getLocation == false) {
        Toast.show('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        return;
      }
    },
    fail: function (res:any) {
      console.info('checkJsApi fail=' + JSON.stringify(res))
    }
  });
  wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      isHighAccuracy: true, // 高精度定位，会调用gps获取高精度坐标
      success: function (res: any) {
        console.log("定位", res)
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var speed = res.speed; // 速度，以米/每秒计
        var accuracy = res.accuracy; // 位置精度
        return res;
      },
      cancel: function (res:any) {
        Toast.show('查看附件机器，首先要授权位置信息')
      },
      fail:(error:any)=>{
        console.log("error",error)
        console.info('ready getLocation fail=' + JSON.stringify(error))
        Toast.show('出现故障，请联系管理员')
      }
    })

  });
  wx.error(function (res: any) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    console.log("error", res)
  });
  // wx.onLocationChange((data: any) => {
  //   console.log("数据", data)
  // }) //注册位置更新时触发的回调函数
  // wx.offLocationChange() //注销回调函数
  // wx.startLocationUpdate(Object object) //开始监听位置变化
  // wx.stopLocationUpdate(Object object) //停止监听
}

// @ts-ignore
// jsonp(`${BaiDu_URL}location/ip?ak=${AK}&coor=bd09ll`, {
//   ...(options || {}),
// }, (error, data) => {
//   if (error) {
//     Toast.show({
//       content: `${error?.message}!`,
//     });
//     throw error;
//   } else {
//     console.log("jsonp", data)
//     return data;
//   }
// })
// return request<MAP>(
//   `${url}location/ip?ak=${AK}&coor=bd09ll`,
//   {
//     method: 'GET',
//     ...(options || {}),
//   });
// }


// jsonp(url,null,(err,data)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })
// https://api.map.baidu.com/location/ip?ak=HtSGgaOXU4ABpx84uFyjC04urQdGYq0s&coor=bd09ll%20
// export async function userLocation(options?: { [key: string]: any }) {
//   // wx.getLocation({
//   //   type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
//   //   isHighAccuracy: true, // 高精度定位，会调用gps获取高精度坐标
//   //   success: function (res: any) {
//   //     console.log("定位",res)
//   //     var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//   //     var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//   //     var speed = res.speed; // 速度，以米/每秒计
//   //     var accuracy = res.accuracy; // 位置精度
//   //     return res;
//   //   }
//   //
//   wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wxcc6cca4301adacf3', // 必填，公众号的唯一标识
//     timestamp:, // 必填，生成签名的时间戳
//     nonceStr: '', // 必填，生成签名的随机串
//     signature: '',// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
//   });
//   wx.onLocationChange((data: any) => {
//     console.log("数据", data)
//   }) //注册位置更新时触发的回调函数
//   // wx.offLocationChange() //注销回调函数
//   // wx.startLocationUpdate(Object object) //开始监听位置变化
//   // wx.stopLocationUpdate(Object object) //停止监听
// }
