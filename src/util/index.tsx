class Utils {
  isMobile(mobile) {
    return /^1[34578]\d{9}$/.test(mobile);
  }
  isMail(mail) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(mail);
  }
  checkPwd(pwd) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
    return reg.test(pwd);
  }
}
export default new Utils();
