const PBULICFUNC = {

  /* 证件号码验证 */
  validateNumLet (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let numZimu = /^[0-9a-zA-Z]*$/g;
    let format = numZimu.test(value);
    if (!format) {
      callback(new Error('号码只能为数字或字母'));
    } else {
      callback();
    }
  },

  /* 数字验证 */
  validateNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let numZimu = /^[0-9]*$/g;
    let format = numZimu.test(value);
    if (!format) {
      callback(new Error('只能输入数字'));
    } else {
      callback();
    }
  },

  /* 4位数验证码验证 */
  validateSixNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let numZimu = /^\d{4}$/g;
    let format = numZimu.test(value);
    if (!format) {
      callback(new Error('验证码应该为4位数字'));
    } else {
      callback();
    }
  },

  /* 手机号码或者电话号码验证 */
  validatephone (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let mobile = /^1[3|4|5|7|8|9]\d{9}$/;
    let phone = /^0\d{2,3}-?\d{7,8}$/;
    let format = mobile.test(value) || phone.test(value);
    if (!format) {
      callback(new Error('请输入正确号码'));
    } else {
      callback();
    }
  },

  /* 网址地址验证 */
  validaWww (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let mobile = /\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|\/)))/;
    let format = mobile.test(value);
    if (!format) {
      callback(new Error('网址输入格式不正确'));
    } else {
      callback();
    }
  },

  /* 邮箱地址输入验证 */
  validaEmails (value) {
    if (value === '' || value === undefined) {
      return false;
    }
    let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return email.test(value);
  },

  /* 移动内部邮箱邮箱地址输入验证 */
  validaCmccEmails (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@(chinamobile.)+[A-Za-z\d]{2,4}$/;
    let format = email.test(value);
    if (!format) {
      callback(new Error('邮件输入格式不正确'));
    } else {
      callback();
    }
  },
  /* 验证邮政编码 */
  validatePostalCode (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let validate = /^[0-9]{6}$/;
    let format = validate.test(value);
    if (!format) {
      callback(new Error('邮政编码格式不对'));
    } else {
      callback();
    }
  },
  /* 可以中文、大小写字母、数字任意组合（特殊字符不可以） */
  checkIsChEnNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let vailde = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi;
    let format = vailde.test(value);
    if (!format) {
      callback(new Error('不可输入特殊字符'));
    } else {
      callback();
    }
  },
  /* 字母或数字组合 */
  checkstaffApply (rule, value, callback) {
    let Regx = /^[A-Za-z0-9]*$/;
    if (!Regx.test(value)) {
      callback(new Error('账号只可以为字母或数字组合'));
    } else {
      callback();
    }
  },

  /* 中文 */
  checkIsCH (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback();
    }
    let vailde = /^[\u4e00-\u9fa5]+$/gi;
    let format = vailde.test(value);
    if (!format) {
      callback(new Error('不可输入特殊字符'));
    } else {
      callback();
    }
  },

  /* 身份证号码校验 */
  validateIdCard (rule, value, callback) {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'));
    } else {
      callback();
    }
  }
};

export default PBULICFUNC;
