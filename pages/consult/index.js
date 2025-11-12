import CommonList from "~/behaviors/common-list"
import * as API from "~/api/consult"
import {
  formatTime
} from '~/utils/util';

Page({
  behaviors: [CommonList],
  data: {
    params: {},
  },
  onLoad(options) {

  },
  onShow() {
    this.onRefresh()
  },
  getList() {
    return new Promise((resolve, reject) => {
      API.search({
        pageSize: this.data.pageSize,
        pageNum: this.data.pageNum
      }).then(res => {
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
  toMaterial(e) {
    const {
      item
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/material/index?id=${item.id}&module=consult`
    })
  }
})