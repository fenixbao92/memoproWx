//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  login: function(){
    wx.login({
      success(res){
        console.log(res);
        console.log(11111);
      }
    })
  },
  getUserInfo: function(){
    wx.getUserInfo({
      success(res){
        console.log(res);
      },
      fail(){
        console.log("fail");
      }
    })
  },
  getSetting:function(){
    wx.getSetting({
      success(res){
        console.log(res);
      }
    })
  },
  bindgetuserinfo:function(e){
    console.log(e);
    var data = e.detail.userInfo;
    data.account = 'baoruo';
    data.password = 'br123456';
    console.log(1111111);
    console.log(JSON.stringify(data));
    wx.request({
      url: 'https://memopro.fenixbao92.com/wx/register',
      data: data,
      success(res){
        console.log(res);
      }
    })
  },
  sendTestHttp:function(){
    var data = {};
    app.httpClient.post("https://memopro.fenixbao92.com/wx/text",data)
    .then(res =>{console.log("success callback!");console.log(res)})
    .catch(res => { console.log("fail callback!");console.log(res) })
  }
})
