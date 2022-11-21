<template>
    <div class="login-top">
        <div class="logo-wapper fl">
            <p class="company-title">千策官网</p>
        </div>
        <div class="reg-wapper fr">
            <ul>
                <li class="pr bor">
                    <a :href="pageType === 1 ? 'javascript:;' : '/users/login'">
                        登录
                    </a>
                </li>
                <li class="pl" style="margin-right: 40px">
                    <a
                        :href="
                            pageType === 2 ? 'javascript:;' : '/users/register'
                        "
                    >
                        注册
                    </a>
                </li>
                <!-- <li style="margin: 0 40px">400-679-8999</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pageType: {
            type: Number,
            default: undefined,
        },
    },
};
</script>

<style lang="scss" scoped>
.login-top {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: rgba(6, 16, 36, 0.6);
}

.login-wapper {
    float: left;
    width: 200px;
    height: 60px;
    margin-left: 15px;

    .company-title {
        position: relative;
        float: left;
        margin-top: 19px;
    }
}

.logo-wapper {
    float: left;
    width: 200px;
    height: 60px;
    margin-left: 15px;
    font-size: 20px;
    line-height: 60px;
}

.reg-wapper ul {
    height: 60px;
    margin: 0;
    padding: 23px 0;
    font-size: 0;
    list-style-type: none;

    .bor {
        position: relative;

        &::after {
            position: absolute;
            top: 2px;
            right: 0;
            bottom: 2px;
            border-right: 1px solid hsla(0deg, 0%, 100%, 0.3);
            content: "";
        }
    }

    .pr {
        padding-right: 14px;
    }

    .pl {
        padding-left: 14px;
    }

    li {
        display: inline;
        font-size: 14px;
    }
}
</style>
