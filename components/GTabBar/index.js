// components/Global/GTabBar/index.js
Component({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    menu: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBarList: [{
        name: '首页',
        icon: 'icon-shouye1',
        toPath: '/pages/home/index'
      },
      {
        name: '申请',
        icon: 'icon-guanyuwomen',
        toPath: '/pages/mine/index/index'
      },
    ],
    menu: '首页',
    current: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTabBar(e) {
      wx.switchTab({
        url: e.currentTarget.dataset.item.toPath,
      })
    },
  }
})