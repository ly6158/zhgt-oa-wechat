import Toast from '@vant/weapp/toast/toast';
import { formatTime } from '~/utils/util';
import * as API from "~/api/sign";

Page({
  data: {
    list: [],
    longitude: 0, // 经度
    latitude: 0, // 纬度
    accuracy: 0, // 精确度
  },
  onLoad(options) {
    this.getSignList()
  },
  sign() {
    wx.getLocation({
      isHighAccuracy: true,
      success: (res) => {
        console.log(res);

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
  add() {
    const {
      latitude,
      longitude,
      accuracy
    } = this.data
    const params = {
      lat: latitude.toString(),
      lon: longitude.toString(),
      accuracy: accuracy.toString()
    }

    API.add(params).then(res => {
      Toast.success('打卡成功!');
    }).catch(err => {
      Toast.fail(err.message);
    }).finally(()=>{
      this.getSignList()
    })
  },
  getSignList() {
    API.user_search({
      pageSize:5,
      create_time: formatTime(new Date().getTime())
    }).then(res => {
      const list = res.data.list.reduce((r, c) => {
        r.push({
          lon: c.lon.substring(0,8),
          lat: c.lat.substring(0,8),
          create_time: formatTime(new Date(c.create_time).getTime())
        })
        return r
      }, [])
    this.setData({
      list
    })
    }).catch(err => {})
  }
})