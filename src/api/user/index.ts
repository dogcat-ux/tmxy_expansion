import _ from 'lodash';
import request from '../index';

export async function login (body: API.loginParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.loginRes>(`api/v3/user/login`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

