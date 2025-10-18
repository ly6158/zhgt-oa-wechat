Component({
  options: {
    virtualHost: true,
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isLoading: {
      type: Boolean,
      value: false
    },
    isCompleted: {
      type: Boolean,
      value: false
    },
    refresherTriggered: {
      type: Boolean,
      value: false
    },
    total: {
      type: Number,
      value: 1
    }, // 数据量 没有数据时展示空状态
    showEmpty: {
      type: Boolean,
      value: true
    }, // 是否显示暂无数据提示
    refresherEnabled: {
      type: Boolean,
      value: true
    },
    isSrollY: {
      type: Boolean,
      value: true
    }, // 是否可以滑动
    usingSticky: {
      type: Boolean,
      value: false
    },
    scrollWithAnimation: {
      type: Boolean,
      value: true
    }, // 是否开启动画过度
    scrollTop: {
      type: [Number, String],
      value: 0
    },
    minHeight: {
      type: [Number, String],
      value: 0
    }, // 特定情况下最小高度，需要带单位
  },

  /**
   * 组件的初始数据
   */
  data: {
    top_height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoadMore() {
      this.triggerEvent('scrolltolower')
    },
    onDropDown() {
      this.triggerEvent('scrolltoupper')
    },
    onScroll(event) {
      this.triggerEvent('onscroll', event)
    }
  },
  lifetimes: {
    attached() {
      let that = this
      const query = wx.createSelectorQuery().in(this)
      query.select('#scrollViewTop').boundingClientRect(function (res) {
        console.log(res);
        that.setData({
          top_height: res.height
        })
      }).exec()
      
    },
  }
})