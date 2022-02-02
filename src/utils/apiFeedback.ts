import { Modal } from 'antd';
import {Code} from "../constant";
import {Toast} from "antd-mobile";

const feedBack = (res: any, sucMsg: string, failMsg: string) => {
  if (res?.status === Code.SuccessCode) {
    // Toast.show(sucMsg);
    Toast.show({
      content:sucMsg,
      icon:"success"
    });
  } else {
    // Toast.show(res?.msg + res?.data || failMsg);
    Toast.show({
      content:res?.msg + res?.data || failMsg,
      icon:"fail"
    });
    // Modal.error({
    //   content: res?.msg + res?.data || failMsg,
    // });
  }
};

export default feedBack;
