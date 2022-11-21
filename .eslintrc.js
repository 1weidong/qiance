const { defineConfig } = require("eslint-define-config");
module.exports = defineConfig({
    env: {
        browser: true,
        node: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        /**
         * 继承 eslint-plugin-vue 插件的规则
         * @link https://eslint.vuejs.org/user-guide/#installation
         */
        "plugin:vue/recommended",
        /**
         * 继承 eslint-plugin-prettier 插件的规则
         * @link https://github.com/prettier/eslint-plugin-prettier
         */
        "plugin:prettier/recommended",
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        "no-fallthrough": [
            "error",
            { commentPattern: "break[\\s\\w]*omitted" },
        ],
        // 关闭vue标签不能出现v-html属性
        "vue/no-v-html": 0,
        // 关闭vue组件名称必须是多词
        "vue/multi-word-component-names": 0,
        // vue2.x选项无用
        "vue/no-lone-template": 0,
        // 关闭正则转义
        "no-useless-escape": 0,
        "vue/html-indent": 0,
        "vue/html-self-closing": 0,
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: {
                    max: 4,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        "vue/singleline-html-element-content-newline": 0,
        "no-case-declarations": 0,
    },
    globals: {
        _: true,
        mapActions: true,
        mapGetters: true,
        mapState: true,
        mapMutations: true,
        _MEIQIA: true,
        mapboxgl: true,
        $nuxt: true,
        regExp: true,
        dataLayer: true,
    },
});
