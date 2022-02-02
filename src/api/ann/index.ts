import _ from 'lodash';
import request from '../index';
import {stringify} from "querystring";

export async function noticeApi(body: API.noticeParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.noticeRes>(`api/v3/notice`, {
    method: 'GET',
    data: params,
    ...(options || {}),
  });
}

export async function noticeDetail(id: number | string, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.noticeDetailRes>(`api/v3/notice/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}



