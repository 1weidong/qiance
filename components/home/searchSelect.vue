<template>
    <div class="nuclear-select">
        <el-cascader
            v-model="city"
            placeholder="注册城市"
            :options="cityData"
            class="nuclear-select-item nuclear-city"
            @change="handleChange(0)"
        ></el-cascader>
        <el-input
            v-model="name"
            class="nuclear-select-item nuclear-name"
            placeholder="请输入字号"
            @blur="handleChange(1)"
        ></el-input>
        <el-cascader
            v-model="kind"
            placeholder="行业"
            class="nuclear-select-item nuclear-kind"
            :options="kindData"
            @change="handleChange(2)"
        ></el-cascader>
        <el-select
            v-model="type"
            placeholder="有限公司"
            class="nuclear-select-item nuclear-type"
            @change="handleChange(3)"
        >
            <el-option
                v-for="item in typeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <el-button class="nuclear-btn" type="primary" @click="goListPage">
            立即核名
        </el-button>
    </div>
</template>

<script>
import { cascadeData } from "~/utils/commonText";
export default {
    data() {
        return {
            city: [],
            cityData: [],
            name: "",
            kind: [],
            kindData: [],
            type: "",
            typeData: [],
            keyword: [],
        };
    },

    mounted() {
        this.cityData = cascadeData.get("city");
        this.kindData = cascadeData.get("kind");
        this.typeData = cascadeData.get("type");
        console.log(this.kindData);
    },

    methods: {
        handleChange(index) {
            switch (index) {
                case 0:
                    this.getTxtValue(this.city, this.cityData, index);
                    break;
                case 1:
                    this.keyword[index] = this.name;
                    break;
                case 2:
                    this.getTxtValue(this.kind, this.kindData, index);
                    break;
                case 3:
                    this.getTxtValue(this.type, this.typeData, index);
                    break;
            }
        },

        goListPage() {
            this.$emit("goListPage", { keyword: this.keyword.join("") });
        },

        getTxtValue(value, data, index) {
            let children = data;
            let childrenVal = value;
            let childrenTxt = undefined;
            if (Array.isArray(value)) {
                children = _.find(
                    data,
                    (item) => item.value === value[0]
                )?.children;
                childrenVal = value[1];
            }
            childrenTxt = _.find(
                children,
                (item) => item.value === childrenVal
            )?.label;
            this.keyword[index] = childrenTxt;
        },
    },
};
</script>

<style lang="scss" scoped>
.nuclear-select {
    display: flex;
    align-items: center;
}

.nuclear-select-item {
    position: relative;

    &::after {
        position: absolute;
        right: 0;
        width: 1px;
        height: 30px;
        background: #f5f5f5;
        transform: translateY(50%);
        content: "";
    }

    &.nuclear-type {
        &::after {
            display: none;
        }
    }

    ::v-deep .el-input__inner {
        width: 193px;
        height: 60px;
        border: 0;
        border-radius: 0;
    }
}

.nuclear-name {
    width: 193px;
}

.nuclear-btn {
    ::v-deep &.el-button--primary {
        width: 110px;
        height: 60px;
        border-radius: 0;
    }
}
</style>
