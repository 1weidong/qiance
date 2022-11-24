<template>
    <div class="content">
        <span class="top">公司名称检测报告</span>
        <div class="imgbor">
            <div class="icon"></div>
            <span class="tip">公司名称检测报告</span>
            <span class="componname">北京111投资管理有限公司</span>
            <span class="fen1">80</span>
            <span class="fen2">分</span><br />
            <span class="info">
                注册成功率
                <label class="l1" style="color: rgb(99, 181, 31)">"</label>
                <label class="s2" style="color: rgb(99, 181, 31)">高</label>
                <label class="l1" style="color: rgb(99, 181, 31)">"</label>
            </span>
            <span class="fot">
                专家建议:
                <label>
                    检测到当前公司名称非常不错，建议您尽快注册，避免被别人抢注哦
                </label>
            </span>
            <span class="left">最终以工商核名为准</span>
            <span class="right">2022 年 11 月 21 日</span>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.content {
    display: block;
    width: 1000px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    text-align: center;
    background: white;
    border-radius: 3px;
    box-shadow: 0 0 9px 0 rgba(186, 186, 186, 0.5);

    .top {
        display: block;
        width: 100%;
        height: 90px;
        margin: 27px auto;
        color: #333;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        line-height: 90px;
        text-align: center;
        border-bottom: 1px solid #dbd9d9;
    }

    .imgbor {
        display: inline-block;
        width: 960px;
        height: 770px;
        background-image: url("/company_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .tip {
        display: block;
        width: auto;
        height: 32px;
        margin: 168px auto 20px;
        color: #517bae;
        font-weight: bold;
        font-size: 26px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        line-height: 32px;
    }

    .componname {
        display: block;
        width: 544px;
        height: 40px;
        margin: 20px auto;
        color: #333;
        font-weight: bold;
        font-size: 32px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        line-height: 40px;
        text-align: center;
    }

    .fen1 {
        display: inline-block;
        width: auto;
        height: 76px;
        margin-top: 20px;
        color: #ffbe02;
        font-weight: bold;
        font-size: 70px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        line-height: 76px;
    }

    .fen2 {
        display: inline-block;
        width: 40px;
        height: 76px;
        margin-top: 30px;
        color: #ffbe02;
        font-weight: 600;
        font-size: 40px;
        font-family: PingFangSC-Semibold, "PingFang SC";
        line-height: 76px;
    }

    .info {
        display: inline-block;
        width: 224px;
        height: 28px;
        margin: 30px;
        color: #333;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        line-height: 28px;
    }

    .info label {
        color: red;
    }

    .fot {
        display: block;
        width: 591px;
        height: 16px;
        margin: 29px auto;
        color: #444;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        line-height: 16px;
    }

    .left {
        display: inline-block;
        width: auto;
        height: 14px;
        margin-top: 90px;
        margin-bottom: 20px;
        margin-left: 0;
        color: #517bae;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        line-height: 14px;
    }

    .right {
        display: inline-block;
        width: auto;
        height: 14px;
        margin-top: 90px;
        margin-left: 500px;
        color: #517bae;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        line-height: 14px;
    }
}
</style>
