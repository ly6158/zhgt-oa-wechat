import Toast from '@vant/weapp/toast/toast';
import * as API from "~/api/sign";
import {
  formatTime
} from '~/utils/util';

Page({
  data: {
    list: [],
    longitude: 0, // 经度
    latitude: 0, // 纬度
    accuracy: 0, // 精确度

    sign_in: {},
    sign_out: {}
  },
  onLoad(options) {
    this.getSignList()
  },
  sign() {
    wx.getLocation({
      isHighAccuracy: true,
      success: (res) => {
        const {
          latitude,
          longitude,
          accuracy
        } = res

        this.setData({
          longitude,
          latitude,
          accuracy,
        })

        this.add()
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        console.log('complete');
      },

    })
  },
  signIn() {
    if (this.data.sign_in?.type === 'sign-in') {
      Toast.fail("已签到");
    } else {
      this.add('sign-in')
    }

  },
  signOut() {
    if (this.data.sign_out?.type === 'sign-out') {
      Toast.fail("已签退");
    } else {
      this.add('sign-out')
    }
  },
  add(type) {
    const {
      latitude,
      longitude,
      accuracy
    } = this.data
    const params = {
      type: type,
      lat: latitude.toString(),
      lon: longitude.toString(),
      accuracy: accuracy.toString()
    }

    API.add(params).then(res => {
      Toast.success('打卡成功!');
    }).catch(err => {
      Toast.fail(err.message);
    }).finally(() => {
      this.getSignList()
    })
  },
  getSignList() {
    API.user_all({
      create_time: formatTime(new Date().getTime())
    }).then(res => {
      const list = res.data.reduce((r, c) => {
        r.push({
          type: c.type,
          lon: c.lon.substring(0, 8),
          lat: c.lat.substring(0, 8),
          create_time: formatTime(new Date(c.create_time).getTime())
        })
        return r
      }, [])

      const sign_in = list.find(item => item.type === 'sign-in') || {}
      const sign_out = list.find(item => item.type === 'sign-out') || {}

      this.setData({
        sign_in,
        sign_out
      })
    }).catch(err => {
      // 
    })
  }
})