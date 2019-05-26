import net from "../../utils/net.js";
import codeAuth from "../../utils/codeAuth.js";

const app = getApp();

Page({
  data: {
    showModal: false,
    bindinfo: null,
    account:null,
    password:null
  },

  onLoad(){
    if (app.globalData.bindinfo) {
      console.log('case1');
      this.setData({
        bindinfo: app.globalData.bindinfo,
      })
    } else {
      console.log('case2');
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.bindInfoSuccessCallback = res => {
        this.setData({
          bindinfo: res
        })
      }
    } 
    
  },

  onShareAppMessage() {
    return {
      title: 'memopro',
      path: 'page/index/index'
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      rawBindInfo : e.detail.userInfo,
      showModal: true
    })
  },
  modalCancel: function() {

  },
  modalConfirm: function() {
    console.log(111);
    console.log(this.data.rawBindInfo);
    var data = {
      account : this.data.account,
      password : this.data.password,
      avatarUrl : this.data.rawBindInfo.avatarUrl,
      city: this.data.rawBindInfo.city,
      country: this.data.rawBindInfo.country,
      gender: this.data.rawBindInfo.gender,
      language: this.data.rawBindInfo.language,
      nickName: this.data.rawBindInfo.nickName,
      province: this.data.rawBindInfo.province,
    }
    console.log(data);
    net.httpClient.post("/wx/register", data)
    .then(res => {
      console.log("success callback!");
      console.log(res);
      this.setData({bindinfo:data});
      return '操作成功'
    }).catch(res => {
      console.log("fail callback!");
      console.log(res);
      return '操作失败'
    }).then(
      res=>{
        wx.showModal({
          title: '登录结果',
          content: res,
        })
      }
    );
  },
  bindKeyAccount: function(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bindKeyPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindStartTap: function () {
    wx.switchTab({
      url: '../todo/index'
    })
  },
})