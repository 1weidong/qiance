<template>
    <div class="contentbody">
        <div v-for="(item, index) in dataList" :key="index" class="item">
            <div class="itemleft">
                <div>
                    <span class="businessname">{{
                        item.title ? item.title : "-"
                    }}</span>
                    <!-- <span class="biao">发明</span>
                    <span class="biaotip">在审</span> -->
                </div>
                <br />
                <span class="b1">公告号: </span>
                <span class="b2">{{
                    item.publicationNumber ? item.publicationNumber : "-"
                }}</span>
                <span class="b3">公告日期: </span>
                <span class="b4">{{
                    item.publicationDate
                        ? timeFormated(item.publicationDate)
                        : "-"
                }}</span>
                <br />
                <span class="b5">申请号: </span>
                <span class="b6">{{
                    item.applicationNumber ? item.applicationNumber : "-"
                }}</span>
                <span class="b7">申请日期: </span>
                <span class="b8">{{
                    item.applicationDate
                        ? timeFormated(item.applicationDate)
                        : "-"
                }}</span>
                <br />
                <span class="b9">申请人: </span>
                <span class="b10">{{
                    item.assigneestringList[0]
                        ? item.assigneestringList[0]
                        : "-"
                }}</span>
                <span class="b11">发明/设计人: </span>
                <span class="b12">
                    <template v-for="inventor in item.inventorStringList">
                        {{ inventor }}
                    </template>
                </span>
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
    },

    data() {
        return {
            dataList: [],
        };
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
            return utils.timeFormated(time);
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    display: block;
    width: 100%;
    height: 180px;
    padding: 20px;
    background: #fff;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    border-left: 1px solid #e9e9e9;
    cursor: pointer;

    .itemleft {
        float: left;
        width: 100%;
        height: 109px;
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
            min-width: 68px;
            margin-left: 10px;
            padding: 5px 10px;
            color: #fff;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            line-height: 12px;
            text-align: center;
            background: #7a49e3;
            border-radius: 2px;
        }

        .biaotip {
            display: inline-block;
            box-sizing: border-box;
            margin-left: 10px;
            padding: 4px 10px;
            color: #118ee9;
            font-weight: 400;
            font-size: 12px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 14px;
            text-align: center;
            background: #ebf2ff;
            border-radius: 1px;
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
            width: 178px;
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
            margin-left: 190px;
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
            width: 178px;
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
            margin-left: 190px;
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
            width: 300px;
            height: 21px;
            margin-top: 4px;
            margin-left: 20px;
            overflow: hidden;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 27px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .b11 {
            display: inline-block;
            width: 88px;
            height: 20px;
            margin-left: 68px;
            color: #797979;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 20px;
        }

        .b12 {
            display: inline-block;
            width: 560px;
            margin-left: 20px;
            overflow: hidden;
            color: #484848;
            font-weight: 400;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
