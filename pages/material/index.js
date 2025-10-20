import CommonList from "~/behaviors/common-list"
import {
  formatTime
} from '~/utils/util';
import * as API from "~/api/file"

Page({
  behaviors: [CommonList],
  data: {

  },
  onLoad(options) {

  },
  onShow() {
    this.onRefresh()
  },
  getList() {
    return new Promise((resolve, reject) => {
      API.search({
        module: "material",
        category: "0",
      }).then(res => {
        if (res && res.code === 200) {
          const list = res.data.list.reduce((r, c) => {
            r.push({
              ...c,
              create_time: formatTime(new Date(c.create_time).getTime())
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
  }
})