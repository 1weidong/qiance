import { searchPlaceholder } from "~/utils/commonText";
import searchSelect from "~/components/home/searchSelect";
export default {
    components: {
        searchSelect,
    },

    data() {
        return {
            active: 4,
            searchType: [
                {
                    id: 4,
                    title: "查服务",
                },
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
                {
                    id: 5,
                    title: "免费起名",
                },
            ],
            keyword: undefined,
            searchPlaceholder: undefined,
            methodName: undefined,
            searchName: "查服务",
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
                        placeholder = searchPlaceholder.TRADEMARK;
                        name = "GET_TRADEMARK";
                        this.searchName = "查商标";
                        break;
                    case 2:
                        placeholder = searchPlaceholder.TRADE_PATENT;
                        name = "GET_TRADE_PATENT";
                        this.searchName = "查专利";
                        break;
                    case 3:
                        placeholder = "请输入核名名称";
                        name = "GET_NUCLEAR";
                        break;
                    case 4:
                        placeholder = "请输入服务名称，如“商标注册”";
                        name = "GET_NUCLEAR";
                        this.searchName = "查服务";
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
