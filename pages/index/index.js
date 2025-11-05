import * as API from "~/api/user";

Page({
  data: {
    loading: true
  },
  onLoad: function () {
    const token = wx.getStorageSync('Authorization')
    
    if (token) {
      API.getCurrentInfo().then(res=>{
        const flag = res.data?.permission_role?.flag
        wx.setStorageSync('flag', flag)
        
        wx.reLaunch({
          url: '/pages/home/index'
        })
      }).catch(err=>{
        wx.reLaunch({
          url: '/pages/login/index'
        })
      })
    } else {
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
  },
})