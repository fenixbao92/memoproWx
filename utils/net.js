function handleData(res) {
  if (res.data.success) {
    if (typeof (res.data.body) === 'string') {
      return [];
    } else if (Array.isArray(res.data.body) === false) {
      const _arr = [];
      _arr.push(res.data.body);
      return _arr;
    } else {
      return res.data.body;
    }
  } else {
    if (res.data.error_no) {
      return {
        error_no: res.data.error_no,
        error_msg: getErrorMsgByErrorNo(res.data.error_no)
      };
    } else {
      return {
        error_no: 123456,
        error_msg: '服务器维护中，请稍后!'
      }
    }
  }
}

function getErrorMsgByErrorNo(error_no) {
  let error_msg;
  switch (error_no) {
    case 100: error_msg = '操作失败，请稍后再试！'; break;
    default: error_msg = '网络错误，请稍后再试！'; break;
  }
  return error_msg;
}

const baseUrl = "https://memopro.fenixbao92.com";

const httpClient = {
  request: function (method, url, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: method,
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("success first");
          console.log(res);
          resolve(handleData(res))
        },
        fail: function (err) {
          console.log("error first");
          console.log(err);
          resolve({
            error_no: 100,
            error_msg: getErrorMsgByErrorNo(100)
          })
        },
        complete: function (res) {
          console.log("request completed!");
        }
      })
    });
  },
  get: function (url) {
    return this.request('GET', url);
  },
  post: function (url, data) {
    return this.request('POST', url, data);
  },
  put: function (url, data) {
    return this.request('PUT', url, data);
  },
  delete: function (url, data) {
    return this.request('DELETE', url, data);
  },
};

module.exports = httpClient;