<template>
    <div class="four">
        <section>
            <el-image class="not-find" :src="url" fit="fit" alt="404" />
            <p>404Text</p>
            <a href="/">404backIndex</a>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: require("~/assets/imgs/404.png"),
        };
    },
    mounted() {
        setTimeout(function () {
            location.href = "/";
        }, 3000);
    },
};
</script>
<style lang="scss" scoped>
.four {
    color: #666;
}

.four header {
    height: 60px;
    background-color: #fff;
}

.four header > a {
    display: block;
    width: 112px;
    height: 26px;
    margin: 0 auto;
    padding: 17px;
}

.four header > h2 {
    color: #333;
    font-weight: normal;
    font-size: 16px;
    line-height: 74px;
}

.four section {
    padding: 75px 0;
    text-align: center;
}

.four section > .not-find {
    height: 365px;
}

.four section p {
    margin: 24px auto;
    color: #333;
    font-size: 20px;
}

.four section a {
    display: block;
    width: 178px;
    height: 69px;
    margin: 0 auto;
    color: #fff;
    font-size: 24px;
    line-height: 69px;
    text-decoration: none;
    background-color: #ff5a5f;
    border-radius: 10px;
}
</style>
