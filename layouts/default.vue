<template>
    <section id="app">
        <div v-if="isIE" class="browser-outdate">
            <div class="box d-flex">
                <div class="compatibility-layer">
                    <h1>浏览器版本过低，建议您使用以下浏览器访问：</h1>
                    <ul class="clearfix">
                        <li class="firefox">
                            <a href="http://www.firefox.com.cn/download/">
                                Firefox
                            </a>
                        </li>
                        <li class="chrome">
                            <a href="http://www.google.cn/chrome/browser/">
                                Chrome
                            </a>
                        </li>
                        <li class="ie9">
                            <a
                                href="http://www.microsoft.com/en-us/windows/microsoft-edge"
                            >
                                IE9及以上
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="Index">
            <template v-if="!isLoginPage">
                <HeaderBox :route-name="routeName" />
                <nuxt />
            </template>
            <template v-else>
                <nuxt />
            </template>
        </div>
    </section>
</template>

<script>
import utils from "~/utils/utils";
import HeaderBox from "~/components/header/header_box";
export default {
    components: {
        HeaderBox,
    },

    data() {
        return {
            isIE: false,
            query: this.$route.query,
            routeName: this.$route.name,
        };
    },

    computed: {
        ...mapState(["userInfo"]),
        isLoginPage({ routeName }) {
            const routeArr = [
                "404",
                "reg-mobile",
                "users-login",
                "reset-password",
            ];
            return routeArr.includes(routeName) ? true : false;
        },
    },

    async created() {
        console.log(this.userInfo);
        if (process.browser && _.isEmpty(this.userInfo)) {
            await this.getUserInfo();
        }
    },

    methods: {
        ...mapActions(["GET_INFO"]),
        ...mapMutations(["SET_USER_INFO"]),
        async getUserInfo() {
            // 获取用户信息
            try {
                const userInfo = await this.GET_INFO();
                this.SET_USER_INFO(userInfo.data);
            } catch (err) {
                this.SET_USER_INFO(null);
                utils.removeToken();
            }
        },
    },
};
</script>

<style lang="scss">
#app {
    width: 100%;
    background-color: #000;
}

#app,
body,
html {
    height: 100%;
}

.Index {
    max-width: 1920px;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
}
</style>
