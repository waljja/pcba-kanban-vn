import axios from 'axios';

export async function getBlog(reqData) {
  let res = [];
  await axios.get('http://172.22.9.61:8888/api/newdata', { params: reqData }).then(function (response) {
    console.log('abc00');
    res = response.data;
  })
  .catch(function (error) {
    console.log('def');
    console.log(error);
  })
  return Promise.reject(res)
}

export function GetBlogV2(reqData) {
  return new Promise((resolve, reject) => {
    console.log("参数");
    console.log(reqData)
    axios.get('http://172.22.9.61:8888/api/newdata', { params: reqData }).then(res => {
      resolve(res.data);
    }).catch(error => {
      resolve(error);
    })
  })
}

export function GetBlogV3() {
  return new Promise((resolve, reject) => {
    axios.get('http://172.22.9.61:8888/api/kanban-report/download').then(res => {
      resolve(res);
    }).catch(error => {
      resolve(error);
    })
  })
}