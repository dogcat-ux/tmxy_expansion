import _ from 'lodash';
import request from '../index';
import {APP_ID} from "../../constant";
import {Toast} from "antd-mobile";
// @ts-ignore
import wx from 'weixin-js-sdk'

// const url = process.env.NODE_ENV === 'development' ? "http://localhost:3000/apc/" : BaiDu_URL;
// var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
// var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
// var speed = res.speed; // 速度，以米/每秒计
// var accuracy = res.accuracy; // 位置精度

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

export async function toWxConfig() {
  const res = await wxConfig({url: window.location.href});
  const {app_id, nonce_str, timestamp, signature} = res?.data
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: app_id || APP_ID, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonce_str, // 必填，生成签名的随机串
    signature: signature,// 必填，签名
    jsApiList: ["checkJsApi", "getLocation"] // 必填，需要使用的JS接口列表
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
    Toast.show("微信接口信息验证失败")
  });
}
