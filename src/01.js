const fs = require('fs');
let path = `log.txt`;

function logging(content) {
  fs.appendFile(path, content + '\n', err => {
    if (err) {
      console.error(err);
    }
  });
}

function empty() {
  fs.writeFile(path, '', err => {
    if (err) {
      console.error(err);
    }
    //完成！
  });
}

function tmpPost(funName, paramName, res, url) {
  empty();
  logging(`export async function ${funName} (body: API.${paramName}, options?: { [key: string]: any }) {`);
  logging('  let params = new FormData();\n' +
    '  _.forIn(body, function (value, key) {\n' +
    '    // @ts-ignore\n' +
    '    return params.append(key, value);\n' +
    '  })');
  logging(`return request` + '<' + 'API.' + res + '>' + "(`"+url+"`, {");
  logging('    method: \'POST\',\n' +
    '    data: params,\n' +
    '    ...(options || {}),\n' +
    '  });\n' +
    '}\n');
}
function tmpPut(funName, paramName, res, url) {
  empty();
  logging(`export async function ${funName} (body: API.${paramName}, options?: { [key: string]: any }) {`);
  logging('  let params = new FormData();\n' +
    '  _.forIn(body, function (value, key) {\n' +
    '    // @ts-ignore\n' +
    '    return params.append(key, value);\n' +
    '  })');
  logging(`return request` + '<' + 'API.' + res + '>' + "(`"+url+"`, {");
  logging('    method: \'PUT\',\n' +
    '    headers: {\n' +
    '      \'Content-Type\': \'application/json\',\n' +
    '    },\n' +
    '    data: params,\n' +
    '    ...(options || {}),\n' +
    '  });\n' +
    '}\n');
}

//funName, paramName,res,url
tmpPost('login',
  'loginParam',
  'loginRes',
  'api/v3/user/login');
// tmpPut('amendActivity', 'AmendActivityParam', 'AmendActivityRes', 'api/v2/activity/${activity_id}');
