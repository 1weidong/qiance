<template>
    <div class="contentbody">
        <div v-for="(item, index) in dataList" :key="index" class="item">
            <img :src="item.imageUrl" alt="商标图" class="imgt" />
            <div class="itemleft">
                <div>
                    <span class="businessname">
                        {{ defaultTxt(item.name) }}
                    </span>
                    <span class="biao">{{ setClsTxt(item.intCls) }}</span>
                    <span class="biao">{{ item.regNo }}</span>
                    <span :class="['button1', flowClass(item.flowStatus)]">
                        <span class="buttonfont">
                            {{ item.flowStatusDesc }}
                        </span>
                    </span>
                </div>
                <br />
                <span class="b1">申请日期: </span>
                <span class="b2">{{ timeFormated(item.appDate) }}</span>
                <span class="b3">初审公告号: </span>
                <span class="b4">{{ defaultTxt("") }}</span>
                <br />
                <span class="b5">申请人: </span>
                <span class="b6">{{ defaultTxt(item.applicantCn) }}</span>
                <span class="b7">初审公告日期: </span>
                <span class="b8">{{ timeFormated("") }}</span>
                <br />
                <span class="b9">代理机构: </span>
                <span class="b10">{{ defaultTxt(item.agent) }}</span>
                <span class="b11">注册公告日期: </span>
                <span class="b12">{{ timeFormated("") }}</span>
                <br />
            </div>
        </div>
    </div>
</template>

<script>
import utils from "~/utils/utils";
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        groupItems: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            dataList: [],
        };
    },

    computed: {
        // 商标注册状态
        flowStatusList({ groupItems }) {
            return groupItems[1]?.items || [];
        },
        // 商标分类
        clsList({ groupItems }) {
            return groupItems[2]?.items || [];
        },
    },

    watch: {
        list: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.dataList = newVal;
            },
        },
    },

    methods: {
        timeFormated(time) {
            if (!time) return "-";
            return utils.timeFormated(time);
        },
        defaultTxt(txt) {
            if (!txt) return "-";
            if (Array.isArray(txt)) {
                return txt[0];
            }
            return txt;
        },
        flowIcon(data) {
            // 已注册
            if (data.flowStatus === 8) return "el-icon-circle-check";
        },
        // 国际分类
        setClsTxt(code) {
            const cls = _.find(this.clsList, (item) => item.value == code);
            return `${cls.value}类 ${cls.desc}`;
        },
        // 商标状态类
        flowClass(status) {
            let num = 4;
            switch (status) {
                // case "8":
                //     num = 1;
                //     break;
                case "1":
                    num = 2;
                    break;
                case "5":
                    num = 3;
                    break;
                default:
                    num = 4;
                    break;
            }

            return `button-${num}`;
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    display: block;
    width: 100%;
    height: 180px;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-top: none;
    cursor: pointer;

    .imgt {
        float: left;
        width: 190px;
        height: 109px;
        margin-top: 30px;
        margin-left: 21px;
    }

    .itemleft {
        float: left;
        width: 950px;
        height: 109px;
        margin-top: 30px;
        margin-left: 30px;

        .businessname {
            width: 54px;
            height: 25px;
            color: #333;
            font-weight: 600;
            font-size: 18px;
            font-family: PingFangSC-Semibold, "PingFang SC";
            line-height: 25px;
        }

        .biao {
            display: inline-block;
            box-sizing: border-box;
            width: 126px;
            height: 22px;
            margin-left: 10px;
            padding-top: 2px;
            color: #05a4ffff;
            text-align: center;
            background: rgba(230, 245, 255, 1);
            border-radius: 2px;
            opacity: 1;
        }

        .button1 {
            float: right;
            width: 85px;
            height: 28px;
            margin-right: 40px;
            line-height: 28px;
            text-align: center;
            background: rgba(10, 191, 91, 1);

            &.button-2 {
                background: rgb(5, 164, 255);
            }

            &.button-3 {
                background: rgb(240, 182, 75);
            }

            &.button-4 {
                background: rgb(211, 217, 227);
            }

            .buttonfont {
                display: inline-block;
                width: 42px;
                height: 28px;
                color: #fff;
                font-weight: 400;
                font-size: 14px;
                font-family: PingFangSC-Regular, "PingFang SC";
                line-height: 28px;
            }
        }

        .b1 {
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-top: 9px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b2 {
            display: inline-block;
            width: 280px;
            height: 20px;
            margin-top: 9px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b3 {
            display: inline-block;
            width: 88px;
            height: 20px;
            margin-left: 80px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b4 {
            width: 82px;
            height: 20px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b5 {
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-top: 9px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b6 {
            display: inline-block;
            width: 280px;
            height: 20px;
            margin-top: 9px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b7 {
            display: inline-block;
            width: 88px;
            height: 20px;
            margin-left: 80px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b8 {
            width: 82px;
            height: 20px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b9 {
            display: inline-block;
            width: 60px;
            height: 20px;
            margin-top: 9px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b10 {
            display: inline-block;
            width: 280px;
            height: 20px;
            margin-top: 9px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b11 {
            display: inline-block;
            width: 88px;
            height: 20px;
            margin-left: 80px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b12 {
            width: 82px;
            height: 20px;
            margin-left: 20px;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }
    }
}
</style>
