import axios from 'axios'

//形参里面配置相当于一个config
export default function request(url = '', params = {}, type = 'GET') {
    // 1. 变量
    let promise;
    // 2. 返回一个promise对象
    return new Promise((resolve, reject) => {
      // 2.1 判断请求的类型
      if (type.toUpperCase() === 'GET') { // get请求
        let paramsStr = '';
        // 2.2 遍历并拼接字符串
        Object.keys(params).forEach(key => {
          paramsStr += key + '=' + params[key] + '&';
        })
        // 2.3 过滤最后的&
        /*
          注意：为了防止请求缓存，在尾部加了时间戳
        */
        if (paramsStr) {
          paramsStr.substr(0, paramsStr.lastIndexOf('&'));
          // 2.4 拼接完整路径
          //从mock
          if(url.indexOf('127.0.0.1') === -1) {
            url += '?' + paramsStr + '&Geek-James=' + randomCode(20);
          } else {
            //从本地
            url += '?' + paramsStr;
          }
        } else {
          if (url.indexOf('127.0.0.1') === -1) {
            url += '?Geek-James=' + randomCode(20)
          }
        }
        // 发起get请求
        promise = axios.get(url);
      } else if (type.toUpperCase() === 'POST') { // post请求
        promise = axios.post(url, params);
      }
      //处理结果并返回
      promise.then((response) => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })      
    })
}

/*生成指定长度的随机数*/
function randomCode(length) {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = "";
  for (let i = 0; i < length; i++) {
      let index = Math.ceil(Math.random() * 9);
      result += chars[index];
  }
  return result;
}