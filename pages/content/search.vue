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
                    <el-button class="search-btn" type="primary">
                        智能查询
                    </el-button>
                </template>
            </el-input>
        </div>

        <div class="footer">
            <span class="tip">
                共为你检索到
                <span class="info totalInfo" style="color: #f00">106552</span>
                条 信 息
            </span>
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ query }) {
        return {
            query,
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
            keyword: "",
            searchPlaceholder: "",
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
}
</style>
