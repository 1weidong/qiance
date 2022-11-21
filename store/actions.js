import apiPath from "~/service/api_path";
import utils from "~/utils/utils";

export default {
    // 图形验证码
    CAPTCHA_IMAGE(store, params) {
        return this.$axios.globalApi("get", apiPath.captchaImage, params);
    },
    // 图形验证码
    SMS_CODE(store, params) {
        return this.$axios.globalApi("get", apiPath.smsCode, params);
    },
    // 注册
    REGISTER(store, params) {
        return this.$axios.globalApi("post", apiPath.register, params);
    },
    // 登录
    LOGIN(store, params) {
        return this.$axios.globalApi("post", apiPath.login, params);
    },
    // 验证码登录
    LOGIN_SMS(store, params) {
        return this.$axios.globalApi("post", apiPath.loginSms, params);
    },
    // 验证码登录
    RETRIEVE(store, params) {
        return this.$axios.globalApi("post", apiPath.retrieve, params);
    },
    // 退出登录
    LOGIN_OUT(store, params) {
        return this.$axios.globalApi("post", apiPath.loginOut, params);
    },
    async QUIT_LOGIN(store) {
        let res = await store.dispatch("LOGIN_OUT");
        if (res && res.code === 200) {
            utils.removeToken();
            location.reload();
        }
    },
    // 个人信息
    GET_INFO(store, params) {
        return this.$axios.globalApi("get", apiPath.getInfo, params);
    },
    // 查商标
    GET_TRADEMARK(store, params) {
        return this.$axios.globalApi("get", apiPath.getTrademark, params);
    },
    // 查专利
    GET_TRADE_PATENT(store, params) {
        return this.$axios.globalApi("get", apiPath.getPatent, params);
    },
    // 免费核名
    GET_NUCLEAR(store, params) {
        return this.$axios.globalApi("get", apiPath.getNuclear, params);
    },
};
