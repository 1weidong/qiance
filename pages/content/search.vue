<template>
    <div class="search-main">
        <div class="header">
            <a href="/">
                <span>首页</span>
            </a>
            <span>
                / <label>{{ title }}</label>
            </span>
        </div>
        <client-only>
            <div :class="['search', { 'search-nuclear': nuclearType }]">
                <template v-if="nuclearType">
                    <searchSelect
                        class="search-main-nuclear"
                        :search-type="type"
                        @goListPage="getData"
                    />
                </template>
                <el-input
                    v-else
                    v-model="keyword"
                    :placeholder="searchPlaceholder"
                    :class="['input-grooup', `input-grooup-${type}`]"
                >
                    <el-select
                        v-if="type === '2'"
                        slot="prepend"
                        v-model="selectPatentType"
                        placeholder="请选择"
                        class="patent-type-select"
                    >
                        <el-option
                            v-for="(item, index) in patentType"
                            :key="index"
                            :label="item.label"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <template slot="append">
                        <el-button
                            class="search-btn"
                            type="primary"
                            @click="getData"
                        >
                            智能查询
                        </el-button>
                    </template>
                </el-input>
            </div>
        </client-only>

        <div class="footer">
            <span v-if="!nuclearType" class="tip">
                共为你检索到
                <span class="info totalInfo" style="color: #f00">{{
                    total
                }}</span>
                条 信 息
            </span>
            <component
                :is="componentName"
                :list="commonData"
                :group-items="groupItems"
            ></component>
            <div v-if="total" class="result_container_main_left_pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handelChangePage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { searchPlaceholder } from "~/utils/commonText";
import searchSelect from "~/components/home/searchSelect";
import PatentBox from "~/pages/content/components/PatentBox";
import TrademarkBox from "~/pages/content/components/TrademarkBox";
import nuclearBox from "~/pages/content/components/nuclearBox";
export default {
    components: {
        searchSelect,
        PatentBox,
        TrademarkBox,
        nuclearBox,
    },

    async asyncData({ query }) {
        const { keyword, type } = query;
        const active = parseInt(type);
        return {
            query,
            keyword,
            type: active ? active : 1,
            commonData: active === 3 || active === 5 ? {} : [],
        };
    },

    data() {
        return {
            selectPatentType: "title",
            patentType: [
                {
                    id: "title",
                    label: "专利名称",
                },
                {
                    id: "applicationnumber",
                    label: "申请号",
                },
                {
                    id: "publicationnumber",
                    label: "公开号",
                },
                {
                    id: "assigneelist",
                    label: "申请人",
                },
                {
                    id: "inventorlist",
                    label: "发明/设计人",
                },
            ],
            curryNum: 1,
            groupItems: [],
            paging: {},
        };
    },

    computed: {
        title({ type }) {
            if (type === 1) return "商标查询";
            if (type === 2) return "查专利";
            if (type === 3) return "免费核名";
            return "免费起名";
        },

        total({ paging }) {
            return paging?.totalRecords || 0;
        },

        searchPlaceholder({ type }) {
            let placeholder = undefined;
            switch (type) {
                case 1:
                    placeholder = searchPlaceholder.TRADEMARK;
                    break;
                case 2:
                    placeholder = searchPlaceholder.TRADE_PATENT;
                    break;
                case 3:
                    // placeholder = "请输入核名名称";
                    break;
            }
            return placeholder;
        },

        componentName({ type }) {
            if (type === 1) {
                return TrademarkBox;
            }

            return type === 2 ? PatentBox : nuclearBox;
        },
        nuclearType({ type }) {
            return type === 3 || type === 5;
        },
    },

    created() {
        if (process.client) {
            if (!this.keyword) return;
            this.getData();
        }
    },

    methods: {
        ...mapActions(["GET_TRADEMARK", "GET_TRADE_PATENT", "GET_NUCLEAR"]),
        getData: _.debounce(async function () {
            try {
                const { type, keyword, selectPatentType, curryNum } = this;
                if (!keyword) {
                    this.$message.warning("请输入查询内容");
                    return;
                }
                const methodName = new Map([
                    [
                        // 查商标
                        1,
                        {
                            name: "GET_TRADEMARK",
                            params: {
                                keyword,
                            },
                        },
                    ],
                    [
                        // 查专利
                        2,
                        {
                            name: "GET_TRADE_PATENT",
                            params: {
                                searchKey: keyword,
                                searchType: selectPatentType,
                            },
                        },
                    ],
                    [
                        // 免费核名
                        3,
                        {
                            name: "GET_NUCLEAR",
                            params: {
                                keyword,
                            },
                        },
                    ],
                    [
                        // 免费起名
                        5,
                        {
                            name: "GET_NUCLEAR",
                            params: {
                                keyword,
                            },
                        },
                    ],
                ]);
                const qdata = methodName.get(type);
                const res = await this[qdata.name]({
                    ...qdata.params,
                    pageIndex: curryNum,
                });
                if (res.code === 200) {
                    this.commonData =
                        res?.data?.result || (type == 3 || type == 5 ? {} : []);
                    this.groupItems = res?.data?.groupItems || {};
                    this.paging = res?.data?.paging || {};
                    let ele = document.querySelector(".search");
                    this.scrollIntoView(ele);
                }
            } catch (error) {
                console.error(error);
            }
        }, 500),

        // 页面更新
        handelChangePage(num) {
            this.curryNum = num;
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.search-main {
    margin-top: 60px;

    .header {
        display: block;
        width: 1200px;
        height: auto;
        margin: 0 auto;

        span {
            display: inline-block;
            width: auto;
            height: 17px;
            margin-top: 20px;
            color: #6b6b6b;
            font-weight: 400;
            font-size: 12px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 17px;

            label {
                display: inline-block;
                color: #333;
                font-weight: 600;
                font-size: 12px;
                font-family: PingFangSC-Regular, "PingFang SC";
                line-height: 17px;
            }
        }
    }

    .search {
        display: block;
        width: 1200px;
        height: 50px;
        margin: 20px auto;
        font-size: 0;

        .input-grooup {
            width: 976px;
            border-collapse: separate;

            &.input-grooup-1 {
                width: 820px;
            }

            &.input-grooup-2 {
            }

            &.input-grooup-3 {
                // width: 1200px;
            }

            .patent-type-select {
                width: 152px;
            }

            ::v-deep {
                .el-input__inner {
                    height: 40px;
                    padding: 0 60px 0 20px;
                    text-shadow: none;
                    border-radius: 0;
                    box-shadow: none;
                }
            }
        }

        ::v-deep .el-input-group__prepend {
            color: #333;
            background: #fff;
        }

        ::v-deep .el-input-group__append {
            width: 120px;
            height: 40px;
            text-align: center;
            background: #05a4ff;
            border: none;
            border-radius: 0;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            cursor: pointer;
        }

        .search-btn {
            color: #fff;
        }
    }

    .search-nuclear {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 170px;
        background-image: url("/nuclear_bg.png");
    }

    .footer {
        display: block;
        width: 1200px;
        height: auto;
        margin: 20px auto;

        .tip {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            height: 45px;
            padding-left: 20px;
            color: #333;
            font-weight: 600;
            font-size: 14px;
            font-family: PingFangSC-Regular, "PingFang SC";
            line-height: 45px;
            border: 1px solid #eee;
        }
    }

    .result_container_main_left_pagination {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin: 20px 0 40px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
    }
}

.search-main-nuclear {
    ::v-deep .nuclear-select-item {
        &::after {
            height: 21px;
        }

        .el-input__inner {
            height: 42px;
        }
    }

    ::v-deep .nuclear-btn {
        &.el-button--primary {
            height: 42px;
        }
    }
}
</style>
