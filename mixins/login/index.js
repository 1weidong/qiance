import utils from "~/utils/utils";
export default {
    data() {
        return {
            countryCodes: null,
            countDownTimer: null,
            isSendCode: false,
            seconds: 60,
            sendCodeText: "自定义",
            formData: {
                country_code: 86,
                phone: "",
                code: "",
                canal: 1,
            },
            rules: {
                country_code: {
                    required: true,
                    message: "自定义",
                    trigger: "select",
                },
                phone: [
                    {
                        required: true,
                        message: "自定义",
                        trigger: "blur",
                    },
                    {
                        min: 7,
                        max: 11,
                        message: "自定义",
                        trigger: "blur",
                    },
                    {
                        pattern: /^\d+$/,
                        message: "自定义",
                        trigger: "change",
                    },
                ],
                code: [
                    {
                        pattern: "",
                        message: "自定义",
                        trigger: "blur",
                    },
                    { required: true, message: "自定义" },
                ],
            },
        };
    },

    mounted() {},

    methods: {
        // 发送验证码
        sendCode() {},
        //点击发送验证码之后的倒计时60秒
        countDown() {
            //如果正在倒计时,停止继续重复倒计时
            if (this.countDownTimer) return;
            //开启计时器
            this.start();
        },
        // 记时函数
        start() {
            this.seconds--;
            this.countDownTimer = setTimeout(this.start, 1000);
            if (this.seconds <= 0) {
                clearTimeout(this.countDownTimer);
                this.countDownTimer = null;
                this.seconds = 60;
                this.sendCodeText = "自定义";
                //重置发送按钮状态
                this.isSendCode = false;
                return;
            }
            this.sendCodeText = "自定义" + "(" + this.seconds + "s)";
        },
        // 获取验证码
        async getVerificationCode(qdata) {
            try {
                let res = await this.VERIFY_SENDV3(qdata);
                if (res.error_code == 0) {
                    this.isSendCode = true;
                    this.countDown();
                } else {
                    this.$alert(res.message, {
                        center: true,
                    });
                }
            } catch (err) {
                console.error(err);
                utils.toast(err?.data?.msg || err.message);
            }
        },
    },
};
