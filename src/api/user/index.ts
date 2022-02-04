import _ from 'lodash';
import request from '../index';

export async function login(body: API.loginParam, options?: { [key: string]: any }) {
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

export async function amendPassword(
  body: API.AmendPasswordParams,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    params.append(key, value);
  });
  // @ts-ignore
  return request<API.CommonRes>('/api/v1/user', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function rank(options?: { [key: string]: any }) {
// @ts-ignore
  return request<API.rankRes>(`api/v3/rank`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function allScore(options?: { [key: string]: any }) {
// @ts-ignore
  return request<API.allScoreResGet>(`api/v3/all-score`, {
    method: 'GET',
    ...(options || {}),
  });
}

// export async function activityAppliedNumber(options?: { [key: string]: any }) {
// // @ts-ignore
//   return request<API.allScoreResGet>(`api/v3/activity-applied-number`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

export async function activityAppliedNumber(options?: { [key: string]: any }) {
// @ts-ignore
  return request<API.allScoreResGet>(`api/v3/activity-applied-number`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function personRankNumber(options?: { [key: string]: any }) {
// @ts-ignore
  return request<API.allScoreResGet>(`api/v3/person-rank-number`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function allScorePost(body?: API.allScoreResPostParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
// @ts-ignore
  return request<API.allScoreResPost>(`api/v3/all-score`, {
    method: 'POST',
    data:params,
    ...(options || {}),
  });
}

export async function userInfo(options?: { [key: string]: any }) {
// @ts-ignore
  return request<API.userInfoRes>(`api/v3/user-info`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function changeAvatar(body: { file: string }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<{
    status?: number
    data?: string
    error?: string
    msg?: string
  }>(`api/v3/avatar`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function personActivity(body?: { status: number }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.personActivityRes>(`api/v3/person-activity`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function activityApplied(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.personActivityRes>(`api/v3/activity-applied`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function semesterList(
  body: API.SemesterListParam,
  options?: { [key: string]: any },
) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.SemesterListRes>('/api/v3/activity-semester', {
    method: 'GET',
    data: params,
    ...(options || {}),
  });
}

export async function yearList(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.YearListRes>('/api/v3/activity-year', {
    method: 'GET',
    ...(options || {}),
  });
}
