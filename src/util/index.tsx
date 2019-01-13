class Utils {
  checkMobile(mobile) {
    if (!/^1[34578]\d{9}$/.test(mobile)) {
      return false;
    } else {
      return true;
    }
  }
}
export default new Utils();
