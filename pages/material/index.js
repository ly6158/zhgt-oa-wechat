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
  download(e) {
    const {item} = e.target.dataset
    console.log("附件路径: ",item.path);

    const url = `${BaseUrl}${FilePath}${item.path}`

    console.log('下载路径: ',url);

    wx.downloadFile({
      url: url,
      success:(res)=>{
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;

          console.log('tempFilePath',tempFilePath);

          wx.getFileSystemManager().saveFile({
            tempFilePath: tempFilePath,
            filePath: `${wx.env.USER_DATA_PATH}/${item.originalname}.${item.suffix}`,
            success: (saveRes) => {
              const savedFilePath = saveRes.savedFilePath;

              wx.openDocument({
                filePath: savedFilePath,
                showMenu: true, // 关键：显示菜单，用户可进行转发、保存等操作
                success: () => {
                  console.log('打开文档成功');
                },
                fail: (openErr) => {
                  console.error('打开文档失败:', openErr);
                }
              });
            }
          })

          
        }
      }
    })
  }
})