<template>
    <div>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            :class="['login-form', { 'reset-form': type }]"
        >
            <template v-if="!type">
                <div v-if="pageType === 1" class="title">
                    <div
                        :class="{ cur: titleActive === 1 }"
                        @click="handelTitle(1)"
                    >
                        验证码登录
                    </div>
                    <i class="spline"></i>
                    <div
                        :class="{ cur: titleActive === 2 }"
                        @click="handelTitle(2)"
                    >
                        密码登录
                    </div>
                </div>
                <h3 v-if="pageType === 2" class="register-title">注册</h3>
            </template>
            <div class="error"></div>
            <el-form-item prop="phonenumber" class="mt0">
                <el-input
                    v-model="ruleForm.phonenumber"
                    placeholder="请输入11位手机号码"
                >
                    <template slot="prepend">
                        <i class="icon el-icon-mobile-phone"></i>
                    </template>
                </el-input>
            </el-form-item>
            <template v-if="isShowPasswordInput">
                <div class="error"></div>
                <el-form-item prop="password" class="mt0">
                    <el-input
                        v-model="ruleForm.password"
                        placeholder="请输入登录密码"
                        type="password"
                    >
                        <template slot="prepend">
                            <i class="icon el-icon-lock"></i>
                        </template>
                    </el-input>
                </el-form-item>
            </template>
            <template v-if="isShowCode">
                <div class="error"></div>
                <el-form-item prop="code" class="mt0">
                    <el-col :span="15">
                        <el-input
                            v-model="ruleForm.code"
                            placeholder="请输入图片验证码"
                        >
                            <template slot="prepend">
                                <i class="icon el-icon-lock"></i>
                            </template>
                        </el-input>
                    </el-col>
                    <el-col :offset="1" :span="8" style="height: 46px">
                        <img
                            :src="captchaImage"
                            alt=""
                            style="
                                width: 100%;
                                height: 100%;
                                border-radius: 5px;
                            "
                            @click="getCaptchaImage"
                        />
                    </el-col>
                </el-form-item>
                <div class="error"></div>
                <el-form-item prop="smsCode" class="mt0">
                    <el-col :span="15">
                        <el-input
                            v-model="ruleForm.smsCode"
                            placeholder="请输入验证码"
                        >
                            <template slot="prepend">
                                <img
                                    class="qc-icon"
                                    src="~/assets/imgs/codeIcon.png"
                                    alt=""
                                />
                            </template>
                        </el-input>
                    </el-col>
                    <el-col :offset="1" :span="8" style="height: 46px">
                        <el-button
                            :disabled="isSendCode"
                            type="primary"
                            class="submitbutton"
                            @click="sendCode()"
                        >
                            {{ sendCodeText }}
                        </el-button>
                    </el-col>
                </el-form-item>
            </template>
            <template v-if="!type">
                <div class="error"></div>
                <div v-if="pageType === 2" class="common">
                    <a href="/users/login">立即登录</a>
                </div>
                <div v-if="pageType === 1" class="common register">
                    <el-link type="primary" href="/users/register">
                        没有账号？去注册
                    </el-link>
                    <a href="/retrieve" style="margin-left: 16px">忘记密码</a>
                </div>
                <el-form-item style="margin-bottom: 12px">
                    <el-button
                        type="primary"
                        class="submitbutton"
                        @click="validateForm"
                    >
                        {{ pageType === 1 ? "登录" : "注册" }}
                    </el-button>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import utils from "~/utils/utils";
import { aesEncrypt, aesDecrypt } from "@/utils/crypto";
export default {
    props: {
        type: {
            type: String,
            default: undefined,
        },
    },

    data() {
        return {
            titleActive: 1,
            ruleForm: {
                phonenumber: "",
                password: "",
                code: "",
                smsCode: "",
            },
            rules: {
                phonenumber: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "手机格式不正确",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                    {
                        required: true,
                        min: 6,
                        message: "密码最小六位",
                        trigger: "blur",
                    },
                ],
                code: [
                    {
                        required: true,
                        pattern: /\d/,
                        message: "请输入图形验证码",
                        trigger: "blur",
                    },
                ],
                smsCode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur",
                    },
                ],
            },
            sendCodeText: "获取验证码",
            countDownTimer: null,
            isSendCode: false,
            seconds: 60,
            captchaImage: undefined,
            uuid: undefined,
        };
    },

    computed: {
        // 进入的页面 1.登录 2.注册
        pageType() {
            return this.$route.name === "users-login" ? 1 : 2;
        },
        // 是否展示密码输入框
        isShowPasswordInput({ pageType, titleActive, type }) {
            if (type) return false;
            return pageType === 2 || titleActive === 2;
        },
        // 是否展示图形验证码和短信验证码
        isShowCode({ pageType, titleActive }) {
            return pageType === 2 || titleActive === 1;
        },
        // 短信类型（1 登录 2 找回密码 3 注册）
        smsType(pageType) {
            if (pageType === 1) return 1;
            if (pageType === 2) return 3;
            return 2;
        },
    },

    watch: {
        titleActive: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal === oldVal) return;
                if (newVal === 1) {
                    this.$set(this.ruleForm, "code", undefined);
                    this.$set(this.ruleForm, "smsCode", undefined);
                    delete this.ruleForm.password;
                    return;
                }
                this.$set(this.ruleForm, "password", undefined);
                delete this.ruleForm.code;
                delete this.ruleForm.smsCode;
            },
        },
    },

    mounted() {
        this.getCaptchaImage();
    },

    methods: {
        ...mapActions([
            "CAPTCHA_IMAGE",
            "SMS_CODE",
            "REGISTER",
            "LOGIN",
            "LOGIN_SMS",
        ]),
        // 获取图形验证码
        getCaptchaImage() {
            this.CAPTCHA_IMAGE().then((res) => {
                const { data } = res;
                this.captchaImage = data.img
                    ? `data:image/png;base64,${data.img}`
                    : null;
                this.uuid = data.uuid;
            });
        },
        handelTitle(type) {
            this.titleActive = type;
            this.resetForm();
        },
        // 发送验证码
        sendCode() {
            this.$refs.ruleForm.validateField(
                ["phonenumber", "code"],
                (phoneError) => {
                    if (phoneError || this.isSendCode) return;
                    this.getVerificationCode();
                }
            );
        },
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
                this.sendCodeText = "重新发送";
                //重置发送按钮状态
                this.isSendCode = false;
                return;
            }
            this.sendCodeText = `${this.seconds}秒后重发`;
        },
        // 获取验证码
        async getVerificationCode() {
            try {
                const { phonenumber, code } = this.ruleForm;
                const params = {
                    phonenumber,
                    code,
                    uuid: this.uuid,
                    type: this.smsType,
                };
                let res = await this.SMS_CODE(params);
                const { data } = res;
                if (data?.success) {
                    this.$message.success(data?.message);
                    this.isSendCode = true;
                    this.countDown();
                } else {
                    this.$message.error(res.msg);
                }
            } catch (error) {
                console.error(error);
            }
        },
        // 注册/登录
        validateForm() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    if (this.pageType === 1) {
                        this.titleActive === 1
                            ? this.loginSms()
                            : this.login(this.ruleForm);
                        return;
                    }
                    this.register();
                }
            });
        },
        // 注册
        async register() {
            const form = _.cloneDeep(this.ruleForm);
            form.password = aesEncrypt(
                _.cloneDeep(JSON.stringify(form.password))
            );
            const res = await this.REGISTER(form);
            if (res.code === 200) {
                const params = {
                    phonenumber: this.ruleForm.phonenumber,
                    password: this.ruleForm.password,
                };
                this.login(params);
            }
        },
        // 密码登录
        async login(params) {
            // console.log(aesDecrypt("PqOXQSt486GXRkDmsylMmA=="));
            params.password = aesEncrypt(
                _.cloneDeep(JSON.stringify(params.password))
            );
            const res = await this.LOGIN(params);
            this.submit(res || {});
        },
        // 验证码登录
        async loginSms() {
            const res = await this.LOGIN_SMS(this.ruleForm);
            this.submit(res || {});
        },
        submit(data) {
            if (data?.code !== 200) {
                this.$message.error(data?.msg);
                return;
            }
            this.loginUrl(data?.data || {});
        },
        // 登录要跳转的地址
        loginUrl(data) {
            utils.setToken(data);
            const redirect = this.getQueryRedirectUrl(this.$route.fullPath);
            const url = redirect || "/";
            location.href = url;
        },
        /**
         * @description: 获取登陆成功后重定向路由地址
         * @param {string} fullPath - 全名路由地址
         * @return {string}
         */
        getQueryRedirectUrl(fullPath) {
            const queryName = "redirect";
            // 全名路由中如果存在redirect字符串时，它的索引值
            const index = fullPath.indexOf(queryName);
            let url = "/";
            if (index > -1) {
                // redirect字符串长度和一个=的字符长度
                const leng = queryName.length + 1;
                const total = index + leng;
                url = decodeURIComponent(fullPath.substr(total));
            }
            return url;
        },
        // 重置表单
        resetForm() {
            this.$refs["ruleForm"].resetFields();
        },
    },
};
</script>

<style lang="scss" scoped>
.login-form {
    position: relative;
    z-index: 1;
    float: right;
    width: 400px;
    margin: 60px 91px 0 0;
    padding: 50px 35px 30px;
    background: #fff;
    border-radius: 5px;

    &.reset-form {
        margin: 0;
        padding: 0;
    }

    .title {
        height: 28px;
        margin: 0 0 7px;
        color: #aaa;
        font-size: 20px;
        line-height: 28px;

        div {
            float: left;
            height: 28px;
            margin-right: 16px;
            cursor: pointer;
        }

        .spline {
            float: left;
            width: 16px;
            height: 28px;

            &::before {
                display: block;
                height: 18px;
                margin-top: 5px;
                border-left: 1px solid #ddd;
                content: "";
            }
        }
    }

    .cur {
        color: #484848;
    }

    .register-title {
        height: 40px;
        margin: -5px 0 0;
        color: #484848;
        font-size: 28px;
        line-height: 40px;
    }

    .error {
        height: 30px;
        color: #e4393c;
        font-size: 14px;
        line-height: 30px;
        letter-spacing: 0;
    }

    .submitbutton {
        width: 100%;
        height: 46px;

        span {
            padding: 0;
            color: #fff;
            font-size: 18px;
            letter-spacing: 0;
        }
    }

    ::v-deep .el-input input {
        height: 46px;
        border: 1px solid #eee;
        border-radius: 3px;
    }

    ::v-deep .el-form-item__error {
        padding-top: 8px;
    }

    ::v-deep .el-input--prefix .el-input__inner {
        padding-left: 57px;
    }

    ::v-deep .el-input-group--prepend .el-input__inner {
        padding: 0;
        border-left: none;
        border-radius: 0 4px 4px 0;
    }

    ::v-deep .el-input-group__prepend {
        background-color: #fff;
        border-color: #cfdae5;
        border-right: none;
        border-radius: 4px 0 0 4px;
    }

    ::v-deep .el-form-item .el-input-group--prepend:active,
    ::v-deep .el-form-item .el-input-group--prepend:hover,
    ::v-deep .el-form-item .el-input-group--prepend:focus {
        border-color: #409eff;
    }

    ::v-deep .el-form-item .el-input__inner,
    ::v-deep .el-form-item .el-input__inner:focus {
        border-color: #cfdae5;
    }

    .icon {
        color: #333;
    }
}

.register {
    text-align: right;

    > a {
        font-size: 14px;
    }
}

.common {
    height: 14px;
    margin-bottom: 35px;
}
</style>
