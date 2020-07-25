/*
 * 数据验证插件
 * v0.01
 */
class DataValidation {
  constructor(regular = {}) {
    this._regular = Object.assign({}, {
      required(val, data, item) {
        return val === '' ? 0 : 1
      },
      number(val, data, item) {
        return /^-?[1-9][0-9]?.?[0-9]*$/.test(val)
      },
      int(val, data, item) {
        return /^-?[1-9][0-9]*$/.test(val)
      },
      phone(val, data, item) {
        return /^1[0-9]{10,10}$/.test(val)
      },
      email(val, data, item) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
      },
      password(val, data, item) {
        return /^.{6,16}$/.test(val)
      },
      inviteCode(val, data, item) {
        return /^[a-zA-Z0-9]{6,16}$/.test(val)
      },
      // 社会信用代码
      creditCode(val, data, item){
        return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(val)
      }
    }, regular);

    this.results = [];
  }
  validate(data, rules) {
    let _item = null;
    for (let item of rules) {
      if (typeof data[item['name']] ==='undefined'){
          continue;
      }

      let value = this.trim(data[item['name']]);

      //如果自定义了正则, 使用自定义的
      if (typeof item['rule'] !== 'undefined' && item['rule'] !== '') {
        this._regular[item['checkType']] = function (val) {
          return item['rule'].test(val)
        }
      }

      item['isOK'] = this._regular[item['checkType']](value, data, item)

      _item = item;
      if (!item['isOK']) {
        break;
      }
    }

    return _item
  }
  trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
  }
}

export {
  DataValidation
}