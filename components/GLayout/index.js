// components/Global/GLayout/index.js
const app = getApp()
const {
  StatusBarHeight, // 状态栏高度
  NavigateBarHeight, // 导航栏高度
  IndicatorHeight, // 底部指示线高度 
} = app.globalData.ScreenInfo

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: '#f5f5f5'
    },
    menu: {
      type: String,
      value: '',
    },
    showNavigation: {
      type: Boolean,
      value: true,
    },
    isTabBar: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    lineColor: {
      type: String,
      value: '#f5f5f5'
    },
    title: {
      type: String,
      value: ''
    },
    isBack: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navigationHeight: StatusBarHeight + NavigateBarHeight,
    indicatorHeight: IndicatorHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})