import CommonList from "~/behaviors/common-list"
import { formatTime } from '~/utils/util';
import * as API from "~/api/report"


Page({
  behaviors: [CommonList],
  data: {
    params: {
      start_time: '',
      end_time: '',
    },
  },
  onLoad(options) {
    
  },
  onShow(){
    this.onRefresh()
  },
  getList() {
    return new Promise((resolve, reject) => {
      API.user_search(this.data.params).then(res => {
        if (res && res.code === 200) {
          const list = res.data.list.reduce((r, c) => {
            r.push({
              ...c,
              create_time: formatTime(new Date(c.create_time).getTime(), '{y}年{m}月{d}日')
            })
            return r
          }, [])
          let allList = [].concat(this.data.list, list)
          this.setData({
            list: allList,
            total: res.data.total,
          })
          resolve()
        } else {
          this.setData({
            list: [],
            total: 0
          })
          reject()
        }
      }).catch(err => {
        this.setData({
          list: [],
          total: 0
        })
        reject()
      })
    })
  },
  toReport(){
    wx.navigateTo({
      url: '/pages/report/edit/index'
    })
  }
})