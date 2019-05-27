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
    tabTxt: ['日期', '状态', '标签'],
    tab: [true, true, true],
    statusList: ["未开始", "进行中", "暂停中", "已完成",'无'],
    selectStatus: '',
    tagList: ["工作", "学习", "实践", "阅读", "生活", "其它",'无'],
    selectTag: '',
    selectDate: '',
    list: []
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true];
    var index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
  //筛选项点击操作
  filter: function (e) {
    var self = this, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    var index = parseInt(e.currentTarget.dataset.index);
    if(txt!='无'){
      tabTxt[index] = txt;
    }else{
      if (!this.data.tab[0]){
        tabTxt[0]='日期';
      }
      if (!this.data.tab[1]) {
        tabTxt[1] = '状态';
      }
      if (!this.data.tab[2]) {
        tabTxt[2] = '标签';
      }
    }
    if (!this.data.tab[0]){
      this.setData({ selectDate:(txt=='无'?"":txt)});
    }
    if (!this.data.tab[1]) {
      this.setData({ selectStatus: (txt == '无' ? "" : txt) });
    }
    if (!this.data.tab[2]) {
      this.setData({ selectTag: (txt == '无' ? "" : txt) });
    }
    this.setData({ tabTxt: tabTxt });
    this.setData({ tab: [true,true,true] })
    //数据筛选
    self.getDataList();
  },

  getDataList(){
    console.log(this.data.selectDate);
    console.log(this.data.selectStatus);
    console.log(this.data.selectTag);
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
  }
  // onReady: function(e) {
  //   this.list = this.selectComponent("#todolist");
  // }
})