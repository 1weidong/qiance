<template>
    <div class="content">
        <div class="describe">
            <div style="min-width: 455px">
                <div class="describefirst">
                    我们提供
                    <span>贴心</span>的服务
                </div>
                <div class="describesecond">让一切变的更简单</div>
                <div class="describethird"></div>
            </div>
        </div>
        <login />
    </div>
</template>

<script>
import login from "@/components/user/login";
export default {
    components: {
        login,
    },
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}

.describe {
    z-index: 2;
    display: flex;
    align-items: center;
    float: left;
    height: 100%;
    margin: auto 220px;

    .describefirst {
        width: 100%;
        color: #fff;
        font-size: 48px;
        font-family: MicrosoftYaHei;
        letter-spacing: 2.4px;
        text-align: left;

        span {
            color: #118ee9;
        }
    }

    .describesecond {
        float: left;
        width: 100%;
        margin-top: 43px;
        color: #fff;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        letter-spacing: 2px;
        text-align: left;
        opacity: 0.74;
    }

    .describethird {
        float: left;
        width: 60px;
        height: 5px;
        margin-top: 42px;
        text-align: left;
        background: #fff;
        opacity: 0.34;
    }
}
</style>
