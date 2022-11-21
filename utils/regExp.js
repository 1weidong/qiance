export default {
    //手机号 +86
    mobile: /^\d{6,11}$/,
    // 邮箱
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    //微信
    wechat: /^(([a-zA-Z]([-_a-zA-Z0-9]{5,19})+)|(\\d+))$/,
    // 验证码  提现密码
    code: /^[0-9]{6}$/,
    //密码  数字 字母 字符
    password: /^[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,22}$/,
    //数字
    number: /^[0-9]+$/,
    //英文
    english: /^[A-Za-z\s]+$/,
    //中文
    chinese: /^[\u4e00-\u9fa5]+$/,
    //仅支持英文、数字
    english_number: /^[A-Za-z0-9\s]+$/,
    //仅支持英文、数字、符号
    english_number_symbol: /^[0-9a-zA-Z\s@_.,，＃#－-]+$/
}