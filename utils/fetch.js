import config from "../config/index"
const {
  BaseUrl,
  ContextPath
} = config

const request = (url, method, params) => {
  const token = wx.getStorageSync('Authorization')
  return new Promise((resolve, reject) => {
    wx.request({
      url: BaseUrl + ContextPath + url,
      data: params,
      method,
      header: {
        token: token,
        platform: 's'
      },
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data);
        } else if (res.data.code === 401) {
          wx.setStorageSync('Authorization', '');
          wx.redirectTo({
            url: '/pages/login/index',
          })
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        console.log('请求失败：', err);
        reject(-1);
      }
    })
  })
}

export default request;