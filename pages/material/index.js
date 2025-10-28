import CommonList from "~/behaviors/common-list"
import config from "~/config/index"
import * as API from "~/api/file"
const {
  BaseUrl,
  FilePath
} = config

import {
  getFileIcon
} from "./data"
import {
  formatTime
} from '~/utils/util';

Page({
  behaviors: [CommonList],
  data: {

  },
  onLoad(options) {
    this.onRefresh()
  },
  onShow() {

  },
  getList() {
    return new Promise((resolve, reject) => {
      API.all({
        module: "material",
        category: "0",
      }).then(res => {
        if (res && res.code === 200) {
          const list = res.data.reduce((r, c) => {
            r.push({
              ...c,
              create_time: formatTime(new Date(c.create_time).getTime()),
              icon: getFileIcon(c.suffix)
            })
            return r
          }, [])

          this.setData({
            list: list,
            total: list.length,
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
  shareFile(e) {
    const {item} = e.target.dataset
    const url = `${BaseUrl}${FilePath}${item.path}`
    wx.downloadFile({
      url: url,
      success:(res)=>{
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          wx.shareFileMessage({
            filePath: tempFilePath,
            fileName:`${item.originalname}.${item.suffix}`,
            success: () => {
              wx.showToast({
                title: '分享成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.showToast({
                title: '当前文件不支持分享',
                icon: 'none'
              });
            }
          });
        }
      }
    })
  }
})