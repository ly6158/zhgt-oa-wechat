import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '/@vant/weapp/toast/toast';
 const app = getApp()

module.exports = Behavior({
  properties: {
    info: {
      type: Object,
      value: {},
    }
  },
  data: {
    dialog_lock: false,
    dialog_info: false,
    dialog_tip: false,
  },
  methods: {

    // 找红娘
    matchmaker() {
      if(app.globalData.UserInfo.is_complete === 0) {
        this.setData({
          dialog_tip: true
        })
        return 
      }
      if (!this.data.is_unlock) {
        this.showDialog('matchmaker')
      } else {
        wx.navigateTo({
          url: '/pages/matchmaker_list/index?id=' + this.data.info.id,
        })
      }
    },

    // 收藏/取消收藏
    changeCollect(e) {
      let {
        id
      } = this.data.info
      if (this.data.is_collect) {
        Dialog.confirm({
            message: '是否取消对该用户的收藏？',
          })
          .then(() => {
            this.cancelCollect(id)
            // on confirm
          })
          .catch(() => {});
      } else {
        this.collect(id)
      }

    },
    // 取消收藏
    cancelCollect(user_id) {
      cancel({
        user_id
      }).then(res => {
        this.getCollectStatus(user_id)
      }).catch(err => {})
    },

    // 收藏
    collect(user_id) {
      collect({
        user_id
      }).then(res => {
        this.getCollectStatus(user_id)
      }).catch(err => {})
    },
    // 获取收藏状态
    getCollectStatus(user_id) {
      console.log("获取收藏状态")
    },


    showDialog(type) {
      this.getRemainingTimes().then(nums => {
        let confirmButtonText = nums ? '立即解锁' : '立即充值',
          message = nums ? `解锁需扣除一次权益，目前剩余权益 ${nums} 次` : '解锁需扣除一次权益，您的剩余权益不够，是否进行充值？',
          that = this;

        Dialog.confirm({
            title: `解锁后方可查看${type === 'matchmaker' ? '红娘' : '对象'}信息`,
            message,
            confirmButtonText,
          })
          .then(() => {
            if (nums) {
              that.unlock(this.data.info.id).then(res => {
                if (type === 'matchmaker') {
                  this.setData({
                    is_unlock: true,
                  })
                  wx.navigateTo({
                    url: '/pages/matchmaker_list/index?id=' + this.data.info.id,
                  })
                } else {
                  this.setData({
                    is_unlock: true,
                    dialog_info: true
                  })
                }
              })
            } else {
              wx.navigateTo({
                url: '/pages/pay_info/index?id=' + this.data.info.id + '&source=info',
              })
            }
            // on confirm
          })
          .catch(() => {});
      }).catch(err => console.log(err))
    },


    // 联系对方
    contact() {
      if (this.data.is_unlock) {
        this.setData({
          dialog_info: true
        })
      } else {
        this.showDialog()
      }
    },

    // 解锁
    unlock(user_id) {
      return new Promise((resolve, reject) => {
        unlock({
          user_id
        }).then(res => {
          if (res && res.code === 200) {
            resolve(res)
          } else {
            reject()
          }
        }).catch(() => reject())
      })
    },

    // 获取权益次数
    getRemainingTimes() {
      return new Promise((resolve, reject) => {
        getRemainingTimes().then(res => {
          if (res && res.code === 200) {
            this.setData({
              nums: res.data
            })
            resolve(res.data)
          } else {
            reject()
          }
        }).catch(() => reject())
      })
    },
  }
})