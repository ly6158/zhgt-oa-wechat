const app = getApp()

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
      if (e.detail.code) {
        this.setData({
          isPhoneLoading: true
        })
        getPhoneNumber({
          code: e.detail.code
        }).then(res => {
          if (res.code == 200) {
            let info = {
              phone: res.data.phoneNumber
            }
            app.updatePersonInfo(info)
            this.setData({
              person_info: app.globalData.UserInfo,
            })
          }
        }).catch(err => {
          // 
        }).finally(() => {
          // this.setData({
          //   isPhoneLoading: false
          // })
        })
      }
    },
  }
})