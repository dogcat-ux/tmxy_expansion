import _ from 'lodash';
import request from '../index';

export async function carousels (body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.carouselsRes>(`api/v3/carousels`, {
    method: 'GET',
    ...(options || {}),
  });
}


