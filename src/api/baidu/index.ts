import _ from 'lodash';
import request from '../index';
import {stringify} from "querystring";
import {AK, BaiDu_URL, BASE_URL} from "../../constant";
import axios from "axios";
import MAP from "./data";

const url= process.env.NODE_ENV === 'development' ? "http://localhost:3000/apc/" : BaiDu_URL;
// https://api.map.baidu.com/location/ip?ak=HtSGgaOXU4ABpx84uFyjC04urQdGYq0s&coor=bd09ll%20
export async function userLocation(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<MAP>(
    `${url}location/ip?ak=${AK}&coor=bd09ll`,
    {
      method: 'GET',
      ...(options || {}),
    });
}





