export const USER_NAME_REGEXP = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
export const PHONE_REGEXP = /^0?(13|14|15|18|17)[0-9]{9}$/;
export const EMAIL_REGEXP = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
// 可以包含数字、字母、下划线，并且要同时含有数字和字母，且长度要在8-16位之间
export const PWD_REGEXP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{8,16}$/;
