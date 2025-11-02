Page({
  data: {

  },
  onLoad(options) {

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
  }
})