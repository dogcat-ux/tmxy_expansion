import moment from 'moment';
export const dateChangeCommon = (time = +new Date()): string => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
};

// export const dateChangeDay = (time = +new Date()): string => {
//   return moment(time).add(8, 'hours').format('YYYY-MM-DD');
// };
export const dateChange = (time = +new Date()): string => {
// export const dateChange = (time: any): string => {
  return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
};

export const dateChangeDay = (time = +new Date()): string => {
  return moment.utc(time * 1000).add(8, 'hours').format('YYYY-MM-DD');
};

export const toTimeStamp = (time: any) => {
  return parseInt((time.valueOf() / 1000).toString());
};

export const timeStampToMoement = (time: any) => {
  return moment.utc(time * 1000).add(8, 'hours');
};

export const afterNow = (time: any) => {
  console.log("time",time)
  console.log("time",dateChange(time))
  if(typeof time==="number"){
    return moment(Date.parse(new Date().toString())).isBefore(moment(dateChange(time)))
  }
  return moment(Date.parse(new Date().toString())).isBefore(moment(time))
}

export const isTime1BeforeTime2 = (time1: any,time2: any) => {
  return moment(time1).isBefore(moment(time2))
}
