import Toast from '@vant/weapp/toast/toast';
import * as API from "~/api/user"
Page({
  data: {
    account: "",
    password: "",
  },
  onLoad(options) {

  },

  onAccountChange(e) {
    // this.form.account = e.detail.value
  },
  onPasswordChange(e) {
    // this.form.password = e.detail.value
  },
  login() {
    API.login({
      account:this.data.account,
      password:this.data.password,
      code: "000000",
      t: new Date().getTime()
    }).then(res => {
      wx.setStorageSync('Authorization', res.data)
      API.getCurrentInfo().then(res=>{
        const flag = res.data?.permission_role?.flag
        wx.setStorageSync('flag', flag)

        Toast('登录成功');
        wx.reLaunch({
          url: '/pages/home/index'
        })
      }).catch(err=>{
        Toast.fail(err.message);
      })
    }).catch(err => {
      Toast.fail(err.message);
    })
  }
})