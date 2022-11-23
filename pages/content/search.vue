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

        <div class="search">
            <el-input
                v-model="keyword"
                :placeholder="searchPlaceholder"
                class="input-grooup"
            >
                <el-select
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

        <div class="footer">
            <span class="tip">
                共为你检索到
                <span class="info totalInfo" style="color: #f00">{{
                    total
                }}</span>
                条 信 息
            </span>
            <PatentBox :list="commonData" />
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
import PatentBox from "~/pages/content/components/PatentBox";
export default {
    components: {
        PatentBox,
    },

    asyncData({ store, query }, callback) {
        const { keyword, type } = query;
        const qdata = {
            searchKey: keyword,
            searchType: "title",
        };
        console.log(query);
        if (!type) {
            const result = {
                query,
                commonData: [],
                paging: {},
                keyword: "",
            };
            callback(null, result);
            return;
        }

        const methodName = new Map([
            ["1", "GET_TRADEMARK"], // 查商标
            ["2", "GET_TRADE_PATENT"], // 查专利
            ["3", "GET_NUCLEAR"], // 免费核名
        ]);

        const promises = [store.dispatch(methodName.get(type), qdata)];

        Promise.allSettled(promises).then((values) => {
            const [commonRes] = values;
            const commonData = commonRes?.value?.data?.result || [];
            const paging = commonRes?.value?.data?.paging || {};

            console.log(commonRes);
            const result = {
                query,
                commonData,
                paging,
                keyword,
            };
            callback(null, result);
        });
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
            searchPlaceholder: "",
            curryNum: 1,
        };
    },

    computed: {
        title({ query }) {
            console.log(query);
            const { type } = query;
            if (type === "1") return "查商标";
            if (type === "2") return "查专利";
            return "免费核名";
        },

        total({ paging }) {
            return paging?.totalRecords || 0;
        },
    },

    methods: {
        ...mapActions(["GET_TRADE_PATENT"]),
        async getData() {
            try {
                const params = {
                    searchKey: this.keyword,
                    searchType: this.selectPatentType,
                    pageIndex: this.curryNum,
                };
                const res = await this.GET_TRADE_PATENT(params);
                console.log(res);
                if (res.code === 200) {
                    this.commonData = res?.data?.result || [];
                    this.paging = res?.data?.paging || {};
                    let ele = document.querySelector(".search");
                    this.scrollIntoView(ele);
                }
            } catch (error) {
                console.error(error);
            }
        },

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
</style>
