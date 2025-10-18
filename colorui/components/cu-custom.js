const app = getApp();
const {
  StatusBarHeight, // 状态栏高度
  NavigateBarHeight, // 导航栏高度
  CapsuleHeight,
  CapsuleWidth,
  CapsuleRight
} = app.globalData.ScreenInfo

Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBarHeight: StatusBarHeight,
    NavigateHeight: StatusBarHeight + NavigateBarHeight,
    CapsuleHeight: CapsuleHeight,
    CapsuleWidth: CapsuleWidth,
    CapsuleRight: CapsuleRight
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      console.log('back');
      wx.navigateBack({
        delta: 1
      });
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})