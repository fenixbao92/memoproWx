import net from "../../utils/net.js"
import timeUtil from "../../utils/timeUtil.js"

Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '小程序官方组件展示',
      path: 'page/component/index'
    }
  },

  data: {
    list: []
  },

  onLoad() {
    var offest = 0;
    var size = 10;
    var that = this;
    net.httpClient.post("/wx/todo/page/" + offest + "/" + size).then((res) => {
      console.log(res);
      res.todos.forEach((item=>{
        item.startTime = timeUtil.dateFormat(item.startTime);
        item.endTime = timeUtil.dateFormat(item.endTime);
        item.updateTime = timeUtil.dateFormat(item.updateTime);
        if (item.costTimeStr==='-'){
          item.costTimeStr=null;
        }
      }));
      that.setData({
        list: res.todos
      })
    });
    var s = "2019-05-20T02:25:31.000+0000";
    console.log(s);
    var d = new Date(s);
    console.log(d);
  },
  onReady: function(e) {
    this.list = this.selectComponent("#todolist");
  }
})