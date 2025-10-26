module.exports = Behavior({
  properties: {},
  data: {
    isLoading: false, // 数据加载状态
    isRefresherTriggered: false, // 是否触发下拉刷新
    isCompleted: false, // 数据是否全部加载
    pageSize: 10,
    pageNum: 1,
    list: [],
    total: 0,
  },
  methods: {
    onDropDown() {
      this.setData({
        isRefresherTriggered: true
      })
      this.onRefresh()
    },
    onRefresh() {
      this.setData({
        isCompleted: false,
        pageNum: 1,
        list: [],
        total: 0,
      })
      this.handleList()
    },
    /**
     * 加载更多
     */
    onLoadMore() {
      console.log('length',this.data.list?.length);
      console.log('total',this.data.total);
      
      if (this.data.list?.length < this.data.total) {
        this.setData({
          pageNum: this.data.pageNum + 1,
        })
        this.handleList()
      }
    },
    handleList() {
      this.handleBefore()
      this.getList().finally(() => {
        this.handleAfter()
      })
    },
    handleBefore() {
      this.setData({
        isLoading: true
      })
    },
    handleAfter() {
      let isCompleted = this.data.list.length === this.data.total
      this.setData({
        isRefresherTriggered: false,
        isLoading: false,
        isCompleted
      })
    },
    getList() {
      return new Promise((resolve, reject) => {
        reject("未定义获取列表数据方法!")
      })
    },
  }
})