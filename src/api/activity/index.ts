import _ from 'lodash';
import request from '../index';

export async function activityCreat (body: API.activityParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.activityRes>(`api/v3/activity`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function activityList(body: { category_name?: string,page_size?:number,page_num?:number }, options?: { [p: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
// @ts-ignore
  return request<API.activityListRes>(`api/v3/activity-list`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

//报名
export async function activityApply(id?:string,body?:{code:string}, options?: { [p: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
// @ts-ignore
  return request<API.activityRes>(`api/v3/apply/${id}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function sign(body?:API.signParam, options?: { [p: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
// @ts-ignore
  return request<API.commonRes>(`api/v3/sign`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function activityPublicity(id?:string, options?: { [p: string]: any }) {
// @ts-ignore
  return request<API.activityPublicityRes>(`api/v3/activity/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}





