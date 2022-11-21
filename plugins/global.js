import Vue from "vue";

// Vue.config.devtools = utils.getEnv === 'prod' ? false : true;
Vue.config.devtools = true;

Vue.prototype.scrollTop = () => {
    let top = document.querySelector("html");
    top.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};
/**
 * @description: 动态的iconfont解码
 * @param {string} code - 字体图标的值
 * @return {string}
 */
Vue.prototype.iconFontDecode = function (code) {
    if (!code) return "";
    return String.fromCharCode(code.replace("&#x", "0x").replace(/;$/, ""));
};
