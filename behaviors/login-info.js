const app = getApp()
import Toast from '/@vant/weapp/toast/toast';

const {
  bindPhone
} = require("../api/users");
/**
 * 获取相关信息
 */
module.exports = Behavior({
  properties: {

  },
  data: {
    // rules:{}

  },
  methods: {
    getPhoneNumber(e) {
      // this.callback()
      if (e.detail.code) {
        this.setData({
          isPhoneLoading: true
        })
        bindPhone({
          code: e.detail.code,
        }).then(res => {
          if (res.code == 200) {
            Toast('登录成功！')
            app.pageLogin().then(res => {
              this.setData({
                person_info: res,
              })
              this.callback()

            })
          }
        }).catch(err => {
          Toast('登录失败！', err)
        }).finally(() => {})
      }
    },

    getUserInfo() {
      console.log("获取用户信息")
    },
    getAllInfo() {
      console.log("获取用户信息")
    },
    onClose() {
      console.log("关闭弹框")
    },
    callback() {
      console.log("回调函数")
    }
  }
})