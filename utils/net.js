const baseUrl = "https://memopro.fenixbao92.com";

const httpClient = {
  request: function (method, url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: data,
        method: method,
        header:{
          'content-type':'application/x-www-form-urlencoded',
          'sessionId':wx.getStorageSync("sessionId")
        },
        success: function (res) {
          if(res.statusCode!=200){
            reject(res)
          }
          resolve(res.data);
        },
        fail: function (err) {
          console.log(err);
          resolve(err);
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
};

module.exports.baseUrl = baseUrl;
module.exports.httpClient = httpClient;