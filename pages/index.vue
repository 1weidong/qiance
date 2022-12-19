<template>
    <div class="home">
        <div class="banner">
            <div class="bannerInfo">
                <h3>免费的商业查询工具</h3>
                <!-- <h3>浩瀚沙海 不做尘埃</h3>
                <p>
                    商标查询
                    <span>/</span>
                    图形对比
                    <span>/</span>
                    智能分析
                    <span></span>
                </p> -->
            </div>
        </div>
        <searchMain />
    </div>
</template>

<script>
import searchMain from "~/components/home/searchMain";
export default {
    components: {
        searchMain,
    },
};
</script>

<style lang="scss" scoped>
.home {
    max-width: 1920px;
    height: 100px;
    margin: 0 auto;

    .banner {
        position: relative;
        z-index: 1;
        height: 100vh;
        margin: 0 auto;
        background-color: #000;
        background-image: url("/banner.jpg");
        background-size: cover;
    }

    .bannerInfo {
        position: relative;
        z-index: 2;
        width: 1200px;
        margin: 0 auto;
        padding: 285px 242px 40px;
        text-align: center;

        > h3 {
            margin: 0;
            color: #fff;
            font: 700 68px/70px "Microsoft Yahei";
            line-height: 100px;
            text-shadow: 0 25px 24px rgba(0, 0, 0, 0.05);

            &:nth-child(2) {
                padding-bottom: 40px;
                background: url("/bannersplit.png") bottom no-repeat;
            }
        }

        > p {
            margin-top: 34px;
            margin-bottom: 84px;
            color: #fff;
            font: 400 20px/22px "Microsoft Yahei";
            text-shadow: 0 5px 14px rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
