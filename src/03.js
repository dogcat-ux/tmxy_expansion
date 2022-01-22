const fs = require("fs");
let path = `log.txt`;

function logging(content) {
  fs.appendFile(path, content + '\n', err => {
    if (err) {
      console.error(err)
    }
    //完成！
  })
}

function tmp(typeName,data) {
  const res = data.split("{")[1].split(",");
  // const res = data.split(",");
  let obj = {}
  for (let i = 0; i < res.length; i++) {
    let temp = res[i].split(":");
    if (temp[1]?.indexOf('"') !== -1) {
      obj[temp[0]] = "string"
    } else {
      obj[temp[0]] = "number"
    }
  }
  fs.writeFile(path, "", err => {
    if (err) {
      console.error(err)
    }
    //完成！
  })
  logging(`type ${typeName} = {`);
  for (let key in obj) {
    logging(`${(key.replace("'", "")).replace('"', '').replace('"', '')}?:${obj[key].replace("'", "")}`);
  }
  logging(`}`);
  console.log(obj)
  return obj
}


// tmp(  "ActivityParam",
//   ""
//   )
tmp("loginRes",JSON.stringify(
  {
    "msg": "ok",
    "error": ""

  }
))

