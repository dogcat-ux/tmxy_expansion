import _ from 'lodash';
import request from '../index';

export async function category (body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.categoryRes>(`api/v3/category`, {
    method: 'GET',
    ...(options || {}),
  });
}


