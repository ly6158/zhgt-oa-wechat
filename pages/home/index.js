Page({
  data: {
    flag:"user"
  },
  onLoad(options) {
    const flag = wx.getStorageSync('flag')
    this.setData({
      flag
    })
  },

  report(){
    wx.navigateTo({
      url: '/pages/report/list/index'
    })
  },
  sign(){
    wx.navigateTo({
      url: '/pages/sign/index'
    })
  },
  project(){
    wx.navigateTo({
      url: '/pages/project/index'
    })
  },
  reportManager(){
    wx.navigateTo({
      url: '/pages/report/all/index'
    })
  }
})