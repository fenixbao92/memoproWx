// component/todolist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '编号'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    name: {
      type: String,
      value: '内容'
    },
    status: {
      type: String,
      value: '状态'
    },
    planTimeHour: {
      type: Number,
      value: '预计时间小时'
    },
    planTimeMinute: {
      type: Number,
      value: '预计时间分钟'
    },
    costTimeStr: {
      type: String,
      value: '已经消耗时间'
    },
    startTime: {
      type: String,
      value: '开始时间'
    },
    endTime: {
      type: String,
      value: '结束时间'
    },
    updateTime: {
      type: String,
      value: '更新时间'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
