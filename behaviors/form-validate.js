import Schema from 'async-validator';
/**
 * 表单校验
 */
module.exports = Behavior({
  properties: {

  },
  data: {
    // rules:{}
  },
  methods: {
    validate(form) {
      return new Promise((reslove, reject) => {
        if (this.data.rules) {
          new Schema(this.data.rules).validate(form, (errors, fields) => {
            if (errors) {
              // console.log('errors', errors);
              // console.log('fields', fields);
              reject(errors[0])
            }
            reslove()
          });
        } else {
          reslove()
        }
      })
    },
  }
})