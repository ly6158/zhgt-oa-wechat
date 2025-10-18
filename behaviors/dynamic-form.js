/**
 * 动态表单通用方法
 */
module.exports = (form) => Behavior({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    isPopup: false,
    isEdit: false,
  },
  attached: function () {},
  methods: {
    onEdit(e) {
      const {
        item,
        index
      } = e.target.dataset

      this.setData({
        isPopup: true,
        isEdit: true,
        ...item
      })
    },
    onDelete(e) {
      const {
        item,
        index
      } = e.target.dataset
      let list = [...this.data.list]
      this.triggerEvent('delItem', {
        item
      })
      list.splice(index, 1)
      this.setData({
        list: list
      })
    },
    onAdd() {
      this.setData({
        isPopup: true,
        isEdit: false,
      })
    },
    onCancel() {
      this.setData({
        isPopup: false,
        ...form
      })
    },
    onConfirm() {
      let list = [...this.data.list]
      let item = {}
      Object.keys(form).forEach(key => {
        item[key] = this.data[key]
      })

      if (this.data.isEdit) {
        let index = list.findIndex(item => item._key === this.data._key)
        if (index !== -1) {
          list.splice(index, 1, item)
        }
      } else {
        list.push({
          ...item,
          _key: `${new Date().getTime()}`,
        })
      }

      this.setData({
        isPopup: false,
        ...form
      })

      this.triggerEvent('change', {
        list
      })
    },
  }
})