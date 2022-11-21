<template>
    <div class="login">
        <div class="login-shadow"></div>
        <loginHead :page-type="pageType" />
        <nuxt-child></nuxt-child>
    </div>
</template>

<script>
import loginHead from "~/components/user/loginHead";
export default {
    components: {
        loginHead,
    },

    data() {
        return {
            curPath: this.$route.name,
        };
    },

    computed: {
        // 进入的页面 1.登录 2.注册
        pageType() {
            return this.$route.name === "users-login" ? 1 : 2;
        },
    },
};
</script>

<style lang="scss">
.login {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 610px;
    background-color: #000;
    background-image: url("/login.jpg");
    background-size: cover;
}

.login-shadow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 50px;
    left: 0;
    background-color: rgba(0, 0, 0, 0.15);
}
</style>
