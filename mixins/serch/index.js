export default {
    data() {
        return {
            active: 1,
            searchType: [
                {
                    id: 1,
                    title: "查商标",
                },
                {
                    id: 2,
                    title: "查专利",
                },
                {
                    id: 3,
                    title: "免费核名",
                },
            ],
            keyword: undefined,
            searchPlaceholder: undefined,
            methodName: undefined,
        };
    },

    watch: {
        active: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal === oldVal) return;
                let name = undefined;
                let placeholder = undefined;
                switch (newVal) {
                    case 1:
                        placeholder = "请输入商标名称";
                        name = "GET_TRADEMARK";
                        break;
                    case 2:
                        placeholder = "请输入专利名称";
                        name = "GET_TRADE_PATENT";
                        break;
                    case 3:
                        placeholder = "请输入核名名称";
                        name = "GET_NUCLEAR";
                        break;
                }
                this.searchPlaceholder = placeholder;
                this.methodName = name;
            },
        },
    },

    methods: {
        ...mapActions(["GET_TRADEMARK", "GET_TRADE_PATENT", "GET_NUCLEAR"]),
        // 搜索标签切换
        handelType(type) {
            this.active = type;
        },
        // 关键词搜索
        handlerSearch() {
            const { keyword, methodName } = this;
            this[methodName]({ keyword });
        },
    },
};
