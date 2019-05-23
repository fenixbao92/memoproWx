//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  },
  handleData: function (res) {
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
  },
  getErrorMsgByErrorNo: function (error_no) {
    let error_msg;
    switch (error_no) {
      case 100: error_msg = '操作失败，请稍后再试！'; break;
      default: error_msg = '网络错误，请稍后再试！'; break;
    }
    return error_msg;
  },
  //全局对象httpClient
  httpClient: {
    request: function (method, url, data) {
      //返回一个promise实例
      return new Promise((resolve, reject) => {
        wx.request({
          url: url,
          data: data,
          mehtod: method,
          success: function (res) {
            resolve(handleData(res))
          },
          fail: function (err) {
            console.log('request fail ', err);
            resolve({
              error_no: 100,
              error_msg:getErrorMsgByErrorNo(100)
            })
          },
          complete: function () {
            console.log('complete');
          },
          
        })
      })
    },
    //get方法：用来获取数据
    get: function (url) {
      return this.request('GET', url);
    },
    //post方法：用来更新数据
    post: function (url, data) {
      return this.request('POST', url, data);
    }
  },
})