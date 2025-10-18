const app = getApp()

const {
  IndicatorHeight
} = app.globalData.ScreenInfo

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: '#f5f5f5'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorHeight: IndicatorHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})