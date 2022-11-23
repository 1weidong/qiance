import Cookie from "js-cookie";
import dayjs from "dayjs";

export default {
    setCookie(name, val, expires = 30) {
        let domain = location.hostname;
        Cookie.set(name, val, {
            domain,
            path: "/",
            expires,
        });
    },
    removeCookie(name) {
        try {
            let domain = location.hostname;
            Cookie.remove(name, {
                domain,
                path: "/",
            });
        } catch (error) {
            console.log(error)
        }
    },
    setToken(data) {
        this.setCookie("Authorization", `Bearer ${data.token}`, 7);
    },
    removeToken() {
        this.removeCookie("Authorization");
    },
    //获取客户端cookie
    getCookiesInClient: function (key) {
        return Cookie.get(key) || "";
    },
    // 页面tdk处理
    tdkHandle(obj) {
        let _obj = {
            title: obj.T,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: obj.D,
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: obj.K,
                },
            ],
        };
        return _obj;
    },

    // 登录密码规则验证
    handlerPwd(val, regTxt) {
        const msg = [];
        // 不能输入中文
        const ch = new RegExp("[\u4e00-\u9fa5]+");
        // 至少包含一个数字或特殊字符或字母
        const mandN = /[0-9]+/;
        const chartLowReg = /[a-z]/;
        const chartUpReg = /[A-Z]/;
        const chartTowReg = /[a-zA-Z]/;
        const chartReg =
            /[` ~!@#$%^&*()_\\\-+=<>?:"{},.\/;'[\]·！#￥（——）：；“”’‘、，|《。》？、【】[\]]/;
        const regArr = [
            (val) => {
                if (val.length >= 8 && val.length <= 22) return true;
                msg.push(regTxt[0]);
                return false;
            },
            (val) => {
                if (
                    mandN.test(val) &&
                    (chartReg.test(val) || chartTowReg.test(val)) &&
                    !ch.test(val)
                )
                    return true;
                msg.push(regTxt[1]);
                return false;
            },
            (val) => {
                const arr = [chartReg, chartLowReg, chartUpReg].filter(
                    (item) => {
                        return item.test(val);
                    }
                );
                if (arr.length >= 2) return true;
                return false;
            },
        ];
        const rule = regArr.filter((item) => item(val));
        if (!val.length) return { value: 0 };
        // 密码强度弱
        if (msg.length) {
            return {
                value: 1,
                msg,
            };
        }
        // 密码强度强
        if (rule.length >= 3) {
            return {
                value: 3,
                msg,
            };
        }
        // 密码强度良好
        return {
            value: 2,
            msg,
        };
    },

    toast(str) {
        let haveDiv = document.querySelector(".m-toast");
        if (haveDiv) haveDiv.parentNode.removeChild(haveDiv);

        let div = document.createElement("div");
        div.innerHTML = str || "error";
        div.className = "m-toast";
        document.body.appendChild(div);
        setTimeout(() => {
            div.className = "m-toast top";
        });
        setTimeout(() => {
            div.parentNode && div.parentNode.removeChild(div);
        }, 3000);
    },

    timeFormated(dataTime) {
        return  dayjs(dataTime).format('YYYY-MM-DD')
    },
};
