import React, {useEffect, useRef, useState} from "react";
import Auth from "../components/auth";
import {
  AutoCenter,
  Button,
  CheckList,
  DatePicker, Dialog,
  FloatingPanel,
  Form,
  Image,
  Space,
  Toast
} from "antd-mobile";
import {Input, Select, Upload} from "antd";
import {LocationFill} from 'antd-mobile-icons'
import {category} from "../api/category";
import {afterNow, dateChangeCommon, isTime1BeforeTime2, toTimeStamp} from "../utils/account";
import {PlusOutlined} from '@ant-design/icons';
import "../assets/styles/ActivityApply.scss"
import Map from 'react-bmapgl/Map'
import Marker from 'react-bmapgl/Overlay/Marker'
import AutoComplete from 'react-bmapgl/Services/AutoComplete'
import {ScaleControl, ZoomControl} from "react-bmapgl";
import {Typography} from 'antd';
import {activityCreat} from "../api/activity";
import {removeProperty} from "../utils/dataAmend";
import _ from "lodash";
import feedBack from "../utils/apiFeedback";
import {useLocation, useNavigate} from "react-router-dom";
// @ts-ignore
import wx from 'weixin-js-sdk'
import {wxConfig} from "../api/baidu";

const {Text} = Typography;
const {Search} = Input;
const {Option} = Select;
const {TextArea} = Input;
const ActivityApply: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [formData, setFormData] = useState<object>();
  // 1报名启动时间 2报名截止时间 3活动启动时间 4活动截止时间
  const [date1, setDate1] = useState<any>()
  const [date2, setDate2] = useState<any>()
  const [date3, setDate3] = useState<any>()
  const [date4, setDate4] = useState<any>()
  const [file, setFile] = useState()
  const [lists, setLists] = useState<any>()//推荐地址列表
  const [items, setItems] = useState<API.categoryItem[]>();
  const [lng, setLng] = useState<number>(119.204299)
  const [lat, setLat] = useState<number>(26.064609)
  const [position, setPosition] = useState<string>()
  const [isSign, setIsSign] = useState<boolean>(false)
  const anchors = [200, window.innerHeight * 0.4, window.innerHeight * 0.8]
  const ref = useRef(null);
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
  const onFinish = async (values: any) => {
    let v = _.cloneDeep(values)
    v = removeProperty("sign_up_time")(v)
    v = removeProperty("activity_time")(v)
    v = removeProperty("sign_in_place")(v)
    v = removeProperty("image")(v)
    var convertor = new BMapGL.Convertor();
    convertor.translate([new BMapGL.Point(lng,lat)], 5, 3, (data)=>{
      if (date1 && date2 && date3 && date4) {
         activityCreat({
          ...v,
          image: values?.image?.file,
          sign_in_place: position,
          sign_up_start_time: toTimeStamp(date1),
          sign_up_end_time: toTimeStamp(date2),
          activity_start_time: toTimeStamp(date3),
          activity_end_time: toTimeStamp(date4),
          activity_place_longitude: data.points[0].lng,
          activity_place_latitude: data.points[0].lat,
        }).then(res=>{
           if (feedBack(res, "创建成功并提交审核", "创建失败")) {
             navigate("/home");
           }
         });
      } else {
        Toast.show("请选择日期");
      }
    })
  }
  const sendApi = async (key?: number) => {
    const {data: {item}} = await category()
    setItems(item);
  }
  useEffect(() => {
    sendApi();
    getLocation();
  }, [])
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    //控制上传图片格式
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show({
        icon: 'fail',
        content: '您只能上传JPG/PNG 文件!',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show({
        icon: 'fail',
        content: '图片大小必须小于2MB!',
      });
      return;
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (imageUrl: any) => {
        // setLoading(false);
        setImageUrl(imageUrl);
      });
      setFile(file);
    }
    return false;
  };
  const handleSign = () => {
    setIsSign(!isSign)
    // @ts-ignore
    // ref && ref?.current?.setHeight(window.innerHeight * 0.8)
  }
  const checkListClick = (value: any) => {
    setIsSign(false);
    setLng(value[0]?.point?.lng);
    setLat(value[0]?.point?.lat);
    setPosition(value[0]?.address + "--" + value[0]?.title);
  }
  const mapClick = (e: any) => {
    // @ts-ignore
    setLng(e?.latlng?.lng.toFixed(6))
    // @ts-ignore
    setLat(e?.latlng?.lat.toFixed(6))
    const myGeo = new BMapGL.Geocoder();
    myGeo.getLocation(new BMapGL.Point(lng, lat), function (result) {
      // @ts-ignore
      setLists(result?.surroundingPoi || result?.surroundingPois);
    })
  }
  const onHighlight = (e: any) => {            // @ts-ignore
    const _value = e?.toitem?.value;
    const myValue = (_value?.province + _value?.city + _value?.district + _value?.street + _value?.business);
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(myValue, function (onePoint) {
      if (onePoint) {
        setLng(onePoint?.lng);
        setLat(onePoint?.lat);
      }
    }, "");
  }
  const onSearch = (myValue: string) => {
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(myValue, function (onePoint) {
      if (onePoint) {
        setLng(onePoint?.lng);
        setLat(onePoint?.lat);
      }
    }, "");
  }
  const locationConfirm = () => {
    setIsSign(false);
    const myGeo = new BMapGL.Geocoder();
    myGeo.getLocation(new BMapGL.Point(lng, lat), function (result) {
      // @ts-ignore
      setPosition(result?.address);
    })
  }
  // setIsSign(false);}
  // @ts-ignore
  return <Auth title={"活动申请"} isBack={true} isBackConfirm>
    {!isSign && <div className="theme-main">
      <Form
          onValuesChange={(_, allValues) => {
            setFormData({...allValues})
          }}
          initialValues={formData ? {
            ...formData,
            sign_in_place: position || "11",
            sign_up_time: "date",
            activity_time: "date",
            image: "image"
          } : {
            sign_in_place: position || "11",
            sign_up_time: "date",
            activity_time: "date",
            image: "image"
          }}
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
          }
      >
        <Form.Item name='activity_name'
                   rules={[{required: true, message: "请输入必填信息"}]}
                   label='活动名称'>
          <Input maxLength={50}/>
        </Form.Item>
        <Form.Item name='sign_in_place' rules={[{required: true, message: "请输入必填信息"}]} label='签到地点'>
          <Space>
            <LocationFill onClick={handleSign}/>
            <Input value={position} disabled></Input>
            {/*<div className="position-str">{position}</div>*/}
          </Space>
        </Form.Item>
        <Form.Item name='sign_in_range' rules={[{required: true, message: "请输入必填信息"}]} label='签到范围(米)'>
          <Input type="number"/>
        </Form.Item>
        <Form.Item name='category_name' rules={[{required: true, message: "请输入必填信息"}]} label='活动类型'>
          {/*<Select defaultValue={items?items[0]?.category_name:''} style={{width: 120}}>*/}
          <Select style={{width: 120}}>
            {items?.map(value => <Option value={value.category_name || ''}>{value.category_name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name='activity_unit' rules={[{required: true, message: "请输入必填信息"}]} label='活动单位'>
          <Input maxLength={50}/>
        </Form.Item>
        {/*  上传封面*/}
        <Form.Item name='image' rules={[{required: true, message: "请输入必填信息"}]} label='封面图' className="apply-upload">
          {/*<ImgCrop rotate shape="rect" aspect={375 / 200} modalWidth={20}>*/}
          <Upload
              name="image"
              listType="picture-card"
              className="cover_img"
              showUploadList={false}
              beforeUpload={beforeUpload}
            // onChange={handleChange}
              accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            {imageUrl ? <Image src={imageUrl} alt="img" className="cover_img" fit="cover"/> : <PlusOutlined/>}
          </Upload>
          {/*</ImgCrop>*/}
        </Form.Item>
        {/*活动内容*/}
        <Form.Item name='content' rules={[{required: true, message: "请输入必填信息"}]} label='活动内容'>
          <TextArea
              maxLength={1000}
              placeholder='请输入内容'
          />
        </Form.Item>
        {/*地点*/}
        <Form.Item name='activity_place' rules={[{required: true, message: "请输入必填信息"}]} label='活动地点'>
          <Input maxLength={100}/>
        </Form.Item>
        {/*时间*/}
        <Form.Item name='sign_up_time' rules={[{required: true, message: "请输入必填信息"}]} label='报名启止时间'>
          <Space>
            <Button onClick={() => {
              DatePicker.prompt({
                precision: 'minute',
                onConfirm: (value: Date) => {
                  if (afterNow(value)) {
                    setDate1(value)
                  } else {
                    Toast.show("必须晚于当前时间")
                  }
                }
              })
            }}>{date1 ? dateChangeCommon(date1) : "年-月-日-时-分"}</Button> ---
            <Button onClick={() => {
              DatePicker.prompt({
                precision: 'minute',
                onConfirm: (value: Date) => {
                  isTime1BeforeTime2(date1, value) ? setDate2(value) :
                    Toast.show("必须晚于报名时间")
                }
              })
            }}>{date2 ? dateChangeCommon(date2) : "年-月-日-时-分"}</Button>
          </Space>
        </Form.Item>
        <Form.Item name='activity_time' rules={[{required: true, message: "请输入必填信息"}]} label='活动启止时间'>
          {/*initialValue="date">*/}
          <Space>
            <Button onClick={() => {
              DatePicker.prompt({
                precision: 'minute',
                onConfirm: (value: Date) => {
                  if (afterNow(value)) {
                    setDate3(value)
                  } else {
                    Toast.show("必须晚于当前时间")
                  }
                }
              })
            }}>{date3 ? dateChangeCommon(date3) : "年-月-日-时-分"}</Button> ---
            <Button onClick={() => {
              DatePicker.prompt({
                precision: 'minute',
                onConfirm: (value: Date) => {
                  isTime1BeforeTime2(date3, value) ? setDate4(value) :
                    Toast.show("必须晚于活动开始时间")
                }
              })
            }}>{date4 ? dateChangeCommon(date4) : "年-月-日-时-分"}</Button>
          </Space>
        </Form.Item>
        <Form.Item name='code' rules={[{required: true, message: "请输入必填信息"}]} label='活动码'>
          <Input maxLength={50}/>
        </Form.Item>
        <Form.Item name='recruitment' rules={[{required: true, message: "请输入必填信息"}]} label='招募人数(人)'>
          <Input type="number"/>
        </Form.Item>
        <Form.Item name='basic_score' rules={[{required: true, message: "请输入必填信息"}]} label='基础分(分)'>
          <Input type="number"/>
        </Form.Item>
        <Form.Item name='responsible_people' rules={[{required: true, message: "请输入必填信息"}]} label='负责人'>
          <Input maxLength={50}/>
        </Form.Item>
        <Form.Item name='responsible_people_phone' rules={[{required: true, message: "请输入必填信息"},
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入正确格式的手机号码'
          }]} label='联系电话'>
          <Input/>
        </Form.Item>
      </Form>
    </div>}
    {isSign && <div className="location-select">
      <Search placeholder="搜索框如果要匹配准确请输入完整的省,市信息" id="ac" size="large" onSearch={onSearch}/>
      <AutoComplete input="ac" onHighlight={onHighlight} onConfirm={e => {
      }} onSearchComplete={e => {
      }}/>
      <div>
        <Map center={new BMapGL.Point(lng, lat)} zoom={18} tilt={60}
             className="map-main"
             enableScrollWheelZoom
             enableDragging
             ref={ref}
             onClick={mapClick}
        >
          {/*// @ts-ignore*/}
          <ZoomControl/>
          {/*// @ts-ignore*/}
          <ScaleControl/>
          {/*// @ts-ignore*/}
          <Marker position={new BMapGL.Point(lng, lat)}/>
        </Map>
      </div>
      <FloatingPanel anchors={anchors} ref={ref}>
        {/*<AutoCenter className=""> <Text type="secondary">最终将以地图上的红色标志处为签到中心</Text></AutoCenter>*/}
        <AutoCenter className=""> <Text type="secondary">直接确定将以图中红标作为签到中心</Text></AutoCenter>
        <Button color="primary" className="map-button" onClick={locationConfirm}>确定</Button>
        <div className="list">
          <CheckList defaultValue={[]} onChange={checkListClick} multiple={false}>
            {lists && lists?.map((value: any) =>
              <CheckList.Item
                title={value?.title}
                // value={value?.city+value?.address+value?.title || (value?.province + value?.city + value?.district + value?.street + value?.business)}>
                value={value}>
                {value?.address || (value?.province + value?.city + value?.district + value?.street + value?.business)}
              </CheckList.Item>
            )}
          </CheckList>
        </div>
      </FloatingPanel>
    </div>}
  </Auth>;
}
export default ActivityApply;
