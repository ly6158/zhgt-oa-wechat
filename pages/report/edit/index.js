import Toast from '@vant/weapp/toast/toast';
import * as ProjectAPI from "~/api/project";
import * as API from "~/api/report";


Page({
  data: {
    isLoading: true,

    isProjectPopup: false,
    projectName: "",
    projectList: [],

    isBusinessTypePopup: false,
    businessTypeList: ['外业', '内业', '手续', '其他'],

    isUnitPopup: false,
    unitList: ['天', '点'],

    content: "",

    form: {
      id: undefined, // id
      project: null,
      business_type: "外业",
      quantity: "1",
      unit: "天",
      content: "",
    },
  },
  onLoad(options) {
    this.getProjectList()
  },

  onChooseProject() {
    this.setData({
      isProjectPopup: true
    })
  },
  onProjectConfirm(e) {
    const form = {
      ...this.data.form,
      project: e.detail.value.id
    }

    this.setData({
      isProjectPopup: false,
      projectName: e.detail.value.text,
      form: form
    })
  },
  onProjectCancel(e) {
    this.setData({
      isProjectPopup: false
    })
  },
  getProjectList() {
    const params = {}
    if (this.data.form.id) {
      params['id'] = this.data.form.id
    }
    return ProjectAPI.user_all(params)
      .then((res) => {
        const list = res.data.map(item => {
          return {
            id: item.id,
            text: item.name
          }
        })
        this.setData({
          projectList: list
        })
      })
      .catch((err) => {
        this.setData({
          projectList: []
        })
      });
  },

  onChooseBusinessType() {
    this.setData({
      isBusinessTypePopup: true
    })
  },
  onBusinessTypeConfirm(e) {
    const form = {
      ...this.data.form,
      business_type: e.detail.value
    }

    this.setData({
      isBusinessTypePopup: false,
      form: form
    })
  },
  onBusinessTypeCancel(e) {
    this.setData({
      isBusinessTypePopup: false
    })
  },

  onChooseUnit() {
    this.setData({
      isUnitPopup: true
    })
  },
  onUnitConfirm(e) {
    const form = {
      ...this.data.form,
      unit: e.detail.value
    }

    this.setData({
      isUnitPopup: false,
      form: form
    })
  },
  onUnitCancel(e) {
    this.setData({
      isUnitPopup: false
    })
  },

  onContentChange(e) {
    const {
      value
    } = e.detail;

    this.setData({
      form: {
        ...this.data.form,
        content: value
      }
    })
  },

  onSubmit() {
    const form = {
      ...this.data.form,
      content: this.data.content
    }

    if (!form.content) {
      Toast.fail("日报内容不能为空!");
      return
    }

    Toast.loading({
      duration: 0,
      message: '提交中...',
      forbidClick: true,
      loadingType: 'spinner',
    });

    API.add(form).then(res => {
      Toast.success('操作成功!');
      wx.navigateBack({
        delta: 1
      });
    }).catch(err => {
      Toast.fail(err.message);
    })
  }
})