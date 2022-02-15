// const fs = require("fs");
// let path = `log.txt`;
//
// function logging(content) {
//   fs.appendFile(path, content + '\n', err => {
//     if (err) {
//       console.error(err)
//     }
//     //完成！
//   })
// }
//
// function tmp(typeName,data) {
//   const res = data.split("{")[1].split(",");
//   // const res = data.split(",");
//   let obj = {}
//   for (let i = 0; i < res.length; i++) {
//     let temp = res[i].split(":");
//     if (temp[1]?.indexOf('"') !== -1) {
//       obj[temp[0]] = "string"
//     } else if(temp[1]?.indexOf("'") !== -1){
//       obj[temp[0]] = "string"
//     }
//     else {
//       obj[temp[0]] = "number"
//     }
//   }
//   fs.writeFile(path, "", err => {
//     if (err) {
//       console.error(err)
//     }
//     //完成！
//   })
//   logging(`type ${typeName} = {`);
//   for (let key in obj) {
//     logging(`${(key.replace("'", "")).replace('"', '').replace('"', '')}?:${obj[key].replace("'", "")}`);
//   }
//   logging(`}`);
//   console.log(obj)
//   return obj
// }
//
// // tmp("activity"+"Param",JSON.stringify(
// //     {
// //       "activity_name":"吃饭",
// //       "category_name":"文化",
// //       "activity_unit":'土木学院',
// //       "content":'吃100碗饭',
// //       "activity_place":'学生街',
// //       "sign_up_start_time":1642215286,
// //       "sign_up_end_time":1642301685,
// //       "code":"secret-action007",
// //       "recruitment":45,
// //       "basic_score":3,
// //       "sign_in_place":"一区田径场",
// //       "sign_in_range":100,
// //       "responsible_people":"lw",
// //       "responsible_people_phone":110120119,
// //     }
// //     )
// // )
// // tmp("activity"+"Param",JSON.stringify(
// // tmp("activity"+"Res",JSON.stringify(
// tmp("personActivity"+"ResItem",JSON.stringify(
//     {
//       "activity_id": 10,
//       "activity_name": "睡觉",
//       "category_name": "睡觉睡觉睡觉睡觉睡觉",
//       "activity_unit": "土木学院",
//       "publisher_number": "031904102",
//       "publisher_name": "FanOne",
//       "image": "http://localhost:3000/static/imgs/activity/1642217894.jpg",
//       "content": "吃100碗饭",
//       "activity_place": "学生街",
//       "sign_up_start_time": 1642215286,
//       "sign_up_end_time": 1642301685,
//       "activity_start_time": 1642215286,
//       "activity_end_time": 1642858735,
//       "code": "secret-action002",
//       "recruitment": 45,
//       "basic_score": 1.23,
//       "sign_in_place": "一区田径场",
//       "sign_in_range": 100,
//       "responsible_people": "lw",
//       "responsible_people_phone": "110120119",
//       "status": 1    }
//     )
// )
//
// // tmp("activity"+"Res",JSON.stringify(
// //     {
// //       "status": 200,
// //       "data": "231",
// //       "msg": "ok",
// //       "error": ""
// //     }
// //     )
// // )
let pathname="/SignOut/0"
console.log("http://www.dogcatux.com/SignOut/0".replace(pathname,''))
