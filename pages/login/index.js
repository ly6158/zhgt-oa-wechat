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
      Toast('登录成功');
      wx.setStorageSync('Authorization', res.data)
      wx.reLaunch({
        url: '/pages/home/index'
      })
    }).catch(err => {
      Toast.fail(err.message);
    })
  }
})