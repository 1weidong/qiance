<template>
    <div class="query-tabs">
        <ul>
            <li
                v-for="(item, index) in searchType"
                :key="index"
                :class="['fl', { active: active === item.id, ml: index !== 0 }]"
                @click="handelType(item.id)"
            >
                <i class="iconfont icon-tabbag"></i>
                <p>{{ item.title }}</p>
            </li>
        </ul>
        <div class="contents">
            <template v-if="active === 3 || active === 5">
                <searchSelect :search-type="active" @goListPage="goListPage" />
            </template>
            <template v-else>
                <client-only>
                    <el-input
                        v-model="keyword"
                        :placeholder="searchPlaceholder"
                        class="input-grooup"
                    >
                        <template slot="append">
                            <el-button
                                class="search-btn"
                                type="primary"
                                @click="goListPage"
                            >
                                {{ searchName }}
                            </el-button>
                        </template>
                    </el-input>
                </client-only>
            </template>
            <p v-if="active === 4" class="hot-search-tip">
                热门搜索：公司注册、商标注册、代理记账、专利申请、资质代办
            </p>
        </div>
    </div>
</template>

<script>
import searchMixins from "~/mixins/serch/index";
export default {
    mixins: [searchMixins],

    methods: {
        goListPage: _.debounce(function (data) {
            if (this.active === 4) {
                location.href = `http://8.142.4.227:39002/index.php?m=search&c=index&a=init&typeid=1&siteid=1&q=${this.keyword}`;
                return;
            }
            this.$router.push({
                path: "/search",
                query: { keyword: this.keyword, type: this.active, ...data },
            });
        }, 500),
    },
};
</script>

<style lang="scss" scoped>
.query-tabs {
    position: relative;
    z-index: 2;
    width: 1000px;
    margin: -242px auto 0;

    li {
        position: relative;
        width: 68px;
        height: 31px;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        cursor: pointer;

        > p {
            z-index: 5;
            width: 100%;
            color: #fff;
        }

        &.active {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 2px;

            &::before {
                position: absolute;
                bottom: -6px;
                left: calc(50% - 6px);
                font-size: 0;
                line-height: 0;
                border-color: #fff;
                border-style: dashed;
                border-width: 6px;
                border-top-style: solid;
                border-right-color: transparent;
                border-bottom-width: 0;
                border-left-color: transparent;
                content: "";
            }

            > p {
                color: #333;
            }
        }
    }

    .ml {
        margin-left: 5px;
    }

    .contents {
        padding-top: 43px;
        padding-bottom: 100px;

        .hot-search-tip {
            margin-top: 15px;
            color: #fff;
        }
    }

    .input-grooup {
        width: 100%;
        border-collapse: separate;

        ::v-deep {
            .el-input__inner {
                height: 60px;
                padding: 0 60px 0 20px;
                text-shadow: none;
                border: none;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                box-shadow: none;
            }
        }
    }

    ::v-deep .el-input-group__append {
        width: 180px;
        height: 60px;
        text-align: center;
        background-color: #118ee9;
        border: none;
        border-radius: 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        cursor: pointer;
    }

    .search-btn {
        color: #fff;
        font-size: 24px;
    }
}
</style>
