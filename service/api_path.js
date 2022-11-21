export default {
    // 注册
    register: "/_auth/register",
    // 账号密码登录
    login: "/_auth/login",
    // 账号验证码登录
    loginSms: "/_auth/smsLogin",
    // 用户信息
    getInfo: "/_auth/getInfo",
    loginOut: "/_auth/logout",
    // 找回密码
    retrieve: "/_auth/retrieve",

    // 前台获取图片验证码
    captchaImage: "/_system/captchaImage",
    // 前台获取手机验证码
    smsCode: "/_system/sms/sendQixt",

    // 查商标
    getTrademark: "/_business/trademark",
    // 查专利
    getPatent: "/_business/patent",
    // 免费核名
    getNuclear: "/_business/nuclear",
};
