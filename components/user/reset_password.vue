<template>
    <div class="reg-wrap">
        <loginHead :page-type="pageType" />
        <div class="reg-main">
            <div class="reg-header">
                <div class="reg-header-title">找回密码</div>
            </div>
            <div class="phone-edit">
                <login v-show="!isPassword" ref="login" type="reset" />
                <passwordComponent
                    v-show="isPassword"
                    ref="passwordComponent"
                    title="找回密码"
                />
                <el-button
                    :disabled="isSubmit"
                    class="setting-pwd"
                    type="primary"
                    @click="handleClick"
                >
                    {{ btnTxt }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { aesEncrypt } from "@/utils/crypto";
import login from "@/components/user/login";
import passwordMixin from "~/components/user/mixins/password";
import loginHead from "~/components/user/loginHead";

export default {
    components: {
        loginHead,
        login,
    },

    mixins: [passwordMixin],

    data() {
        return {
            secondCode: null,
        };
    },

    computed: {
        isResetPasswordPage() {
            return this.$route.name === "resetPassword";
        },
        // 进入的页面 1.登录 2.注册
        pageType() {
            return this.$route.name === "users-login" ? 1 : 2;
        },
    },

    methods: {
        ...mapActions(["RETRIEVE"]),
        // 验证账号信息
        nextStep() {
            this.$refs["login"]?.$refs["ruleForm"].validate((valid) => {
                if (!valid) return;
                this.isPassword = true;
                this.btnTxt = "确认";
            });
        },
        // 获取验证码
        async submitForm() {
            if (this.isSubmit) return;
            this.$refs["passwordComponent"]?.$refs["formData"].validate(
                (valid) => {
                    if (!valid) return;
                    this.isSubmit = true;
                    const loginData = this.$refs["login"]?.ruleForm || {};
                    const passwordData =
                        this.$refs["passwordComponent"]?.formData || {};
                    let qdata = {
                        phonenumber: loginData.phonenumber,
                        smsCode: loginData.smsCode,
                        ...passwordData,
                    };
                    qdata.newPassword = aesEncrypt(
                        _.cloneDeep(JSON.stringify(qdata.newPassword))
                    );
                    qdata.password = aesEncrypt(
                        _.cloneDeep(JSON.stringify(qdata.password))
                    );
                    this.resetPassword(qdata);
                }
            );
        },
        // 重置密码提交
        async resetPassword(qdata) {
            try {
                let res = await this.RETRIEVE(qdata);
                if (res.code == 200) {
                    this.$message.success(res.msg);
                    this.$router.push("/users/login");
                } else {
                    this.isSubmit = false;
                    this.$message.error(res.msg);
                }
            } catch (err) {
                console.error(err);
                this.isSubmit = false;
            }
        },
    },
};
</script>

<style lang="scss">
.reg-wrap {
    margin-bottom: 60px;
    padding-top: 60px;
}

.reg-main {
    .reg-header {
        height: 106px;
        padding: 40px 100px 0;
    }

    .reg-header-title {
        color: #484848;
        font-size: 32px;
        line-height: 46px;
        letter-spacing: 0;
    }
}

.has-account {
    justify-content: center;
    margin-top: 20px;
    color: #333;
    font-weight: 600;

    &::after {
        margin-left: 5px;
        color: #333;
        content: "\e607";
    }
}

.agreement {
    width: 350px;
    padding: 27px 0 10px;
    font-size: 12px;
    text-align: left;

    a {
        color: red;
    }
}

.phone-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    margin: 0 100px;
    overflow: hidden;
    background: #fff;

    .el-button--primary {
        margin-top: 0;
    }

    .btn-disabled {
        &.is-disabled,
        &.is-disabled:hover,
        &.is-disabled:focus,
        &.is-disabled:active {
            color: #fff;
            background-color: #c8c9cc;
            background-image: none;
            border-color: #c8c9cc;
            cursor: not-allowed;
        }
    }

    .setting-pwd {
        width: 400px;
        margin-top: 30px;
        padding: 15px 20px;
        font-size: 18px;
    }
}
</style>
