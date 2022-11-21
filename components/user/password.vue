<template>
    <el-form ref="formData" :model="formData" :rules="rules" class="login-form">
        <el-form-item prop="newPassword" class="mt0">
            <el-input
                v-model="formData.newPassword"
                placeholder="请输入新密码"
                type="password"
            >
                <template slot="prepend">
                    <i class="icon el-icon-lock"></i>
                </template>
            </el-input>
        </el-form-item>
        <div class="error"></div>
        <el-form-item prop="password" class="mt0">
            <el-input
                v-model="formData.password"
                placeholder="请再次输入新密码"
                type="password"
            >
                <template slot="prepend">
                    <i class="icon el-icon-lock"></i>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
    },

    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 6) {
                callback(new Error("密码最小六位"));
            } else {
                if (this.formData.password !== "") {
                    this.$refs.formData.validateField("password");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.formData.newPassword) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            formData: {
                newPassword: "",
                password: "",
            },
            rules: {
                newPassword: [
                    {
                        validator: validatePass,
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        validator: validatePass2,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.login-form {
    width: 400px;

    .error {
        height: 30px;
        color: #e4393c;
        font-size: 14px;
        line-height: 30px;
        letter-spacing: 0;
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
</style>
