/*
 * 数据验证插件
 * v0.01
 * const rules = [
			{ name: "approver", checkType: "required", errorMsg: "审批人不能为空" },
			{ name: "activity", checkType: "diyrule", errorMsg: "自定义正则",rule:/^(0|[1-9][0-9]*)$/},
		];

	let v = dataValidation.validate(e.detail.value, rules);
	if (!v.isOK) {
	  uni.showToast({ title: v.errorMsg, icon: 'none' });
	  return
	}
	
	checkType：
	required 必填
	number  数字
	int  整数
	gt_no  不大于多少
	lt_no 不小于多少
	tel 固定电话
	phone  手机
	email 邮箱
	idCard  身份证
	creditCode  统一社会信用代码查询
	qq  QQ
	ip  IP地址
	postcode  邮政编码
	car  普通车牌号
	xcar  新能源车牌号
	chinese 中文
 */
class DataValidation {
  constructor(regular = {}) {
    this._regular = Object.assign({}, {
      required(val, data, item) {
        return val === '' ? 0 : 1
      },
      number(val, data, item) {
        return /^(0|[1-9][0-9]*)$/.test(val-0)
      },
      int(val, data, item) {
        return /^[1-9]\d*$/.test(val-0)
      },
	  //不大于多少
	  gt_no(val, data, item){
		  return !(val > item.value)
	  },
	  //不小于多少
	  lt_no(val, data, item){
		  return !(val < item.value)
	  },
	  tel(val, data, item) {
	    return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(val)
	  },
      phone(val, data, item) {
        return /^1[0-9]{10,10}$/.test(val)
      },
      email(val, data, item) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
      },
      idCard(val, data, item) {
        return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)
      },
      password(val, data, item) {
        return /^.{6,16}$/.test(val)
      },
      inviteCode(val, data, item) {
        return /^[a-zA-Z0-9]{6,16}$/.test(val)
      },
      //统一社会信用代码查询
      creditCode(val, data, item){
        return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(val)
      },
	  qq(val, data, item) {
	    return /[1-9][0-9]{4,}/.test(val)
	  },
	  ip(val, data, item) {
	    return /\d+\.\d+\.\d+\.\d+/.test(val)
	  },
	  //邮政编码
	  postcode(val, data, item) { 
	    return /[1-9]\d{5}(?!\d)/.test(val)
	  },
	  //普通车牌号
	  car(val, data, item) {
	    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/.test(val)
	  },
	  //新能源车牌号
	  xcar(val, data, item) {
	    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/.test(val)
	  },
	  //中文
	  chinese(val, data, item) {
	    return /^[\u4e00-\u9fa5]{0,}$/.test(val)
	  },
    }, regular);

    this.results = [];
  }
  validate(data, rules) {
    let _item = null;
    for (let item of rules) {
		console.log('validate1',data,item,data[item['name']]);
      if (typeof data[item['name']] ==='undefined'){
          continue;
      }

      //TODO：暂时未做空对象的判断
      //如果是空数组
      if (Array.isArray(data[item['name']])){
        console.log('Array',item['name'],data[item['name']])
        if (item['checkType'] =='required'){
          item['isOK'] = data[item['name']].length;
        }
      }else{
        //字符串的判断
        let value = this.trim(data[item['name']]);

        //如果自定义了正则, 使用自定义的
        if (typeof item['rule'] !== 'undefined' && item['rule'] !== '') {
          this._regular[item['checkType']] = function (val) {
            return item['rule'].test(val)
          }
        }

        item['isOK'] = this._regular[item['checkType']](value, data, item)
      }

      _item = item;
      if (!item['isOK']) {
        break;
      }
    }

    return _item
  }
  trim(str) {
    return str==''?'':str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
  }
}

export {
  DataValidation
}