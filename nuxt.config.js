const webpack = require("webpack");
const path = require("path");
// 挂载配置文件
const env = process.env._ENV;
const config = require(`./config/config.js`);
let envs = config[env] || config.prod;
envs._ENV = env;
console.table(envs);

require("events").EventEmitter.defaultMaxListeners = 50;

module.exports = {
    mode: "universal",

    server: {
        host: "0.0.0.0",
    },

    env: envs,

    head: {
        title: "千策企业查询_商标查询_专利查询_服务平台",
        meta: [
            {
                charset: "UTF-8",
            },
            {
                name: "renderer",
                content: "webkit",
            },
            {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge,chrome=1",
            },
            {
                name: "viewport",
                content: "initial-scale=1.0, maximum-scale=1.0",
            },
            {
                name: "description",
                content:
                    "千策为企业、商标查询工具、专利查询工具、商标起名工具、等企业商事多场景工具。",
            },
            {
                name: "keywords",
                content: "企业查询,商标查询,专利查询",
            },
        ],
        // link: [
        //     {
        //         rel: "shortcut icon",
        //         type: "image/x-icon",
        //         href: "/favicon.ico",
        //     },
        // ],
        script: [
            {
                src: "/flexiblle.js",
                type: "text/javascript",
                charset: "utf-8",
            },
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: false,

    /*
     ** Global CSS
     */
    css: [
        {
            src: "~assets/common.scss",
            lang: "scss",
        },
        {
            src: "~assets/reset.scss",
            lang: "scss",
        },
        {
            src: "element-ui/lib/theme-chalk/index.css",
        },
        {
            src: "~assets/element-variables.scss",
        },
        {
            src: "swiper/dist/css/swiper.css",
        },
    ],
    buildModules: ["@nuxtjs/style-resources"],
    styleResources: {
        scss: ["~assets/mixins.scss", "~assets/variables.scss"],
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {
            src: "@plugins/axios.js",
            ssr: true,
        },
        {
            src: "@plugins/global.js",
            ssr: true,
        },
        {
            src: "@plugins/vee_validate.js",
            ssr: true,
        },
        {
            src: "@/plugins/route",
            ssr: false,
        },
        {
            src: "@/plugins/element-ui",
            ssr: false,
        },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/axios",
    ],

    /*
     ** Axios module configuration
     */
    axios: {
        proxy: true,
    },
    proxy: {
        "/auth": {
            target: envs.APP_URL,
        },
    },
    generate: {
        dir: "docs",
    },
    /*
     ** Build configuration
     */
    // buildDir: `dist/${env}`,
    build: {
        analyze: env === "local",
        extractCSS: env === "prod",
        postcss: {
            preset: {
                browsers: ["last 2 versions", "ie >= 9"],
            },
        },
        filenames: {
            vendor: ({ isDev }) => (isDev ? "[name].js" : "[name].[hash:7].js"),
            app: ({ isDev }) =>
                isDev ? "[name].js" : "[name].[chunkhash:7].js",
            chunk: ({ isDev }) =>
                isDev ? "[name].js" : "[name].[chunkhash:7].js",
            css: ({ isDev }) =>
                isDev ? "[name].css" : "[name].[contenthash:7].css",
            img: ({ isDev }) =>
                isDev ? "[path][name].[ext]" : "img/[name].[hash:7].[ext]",
            font: ({ isDev }) =>
                isDev ? "[path][name].[ext]" : "fonts/[name].[hash:7].[ext]",
            video: ({ isDev }) =>
                isDev ? "[path][name].[ext]" : "videos/[name].[hash:7].[ext]",
        },
        publicPath: envs.PUBLIC_PATH || "",
        /*
         ** You can extend webpack config here
         */
        extend(config) {
            if (env === "prod") {
                config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            }
            // 添加svg loader
            const svgRule = config.module.rules.find((rule) =>
                rule.test.test(".svg")
            );
            svgRule.exclude = [path.resolve(__dirname, "assets/svg")];
            // Includes /icons/svg for svg-sprite-loader
            config.module.rules.push({
                test: /\.svg$/,
                include: [path.resolve(__dirname, "assets/svg")],
                loader: "svg-sprite-loader",
                options: {
                    symbolId: "icon-[name]",
                },
            });
        },
        // webpack插件扩展
        plugins: [
            new webpack.ProvidePlugin({
                mapState: ["vuex", "mapState"],
                mapActions: ["vuex", "mapActions"],
                mapGetters: ["vuex", "mapGetters"],
                mapMutations: ["vuex", "mapMutations"],
                _: ["lodash"],
            }),
        ],
        babel: {
            plugins: [
                ["@babel/plugin-proposal-private-methods", { loose: true }],
                [
                    "@babel/plugin-proposal-private-property-in-object",
                    { loose: true },
                ],
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
            ],
        },
    },
    render: {
        resourceHints: false,
    },
    babel: {
        plugins: [
            [
                "component",
                [
                    {
                        libraryName: "element-ui",
                        styleLibraryName: "theme-default",
                    },
                    "transform-async-to-generator",
                    "transform-runtime",
                ],
            ],
            ["@babel/plugin-proposal-private-methods", { loose: true }],
            [
                "@babel/plugin-proposal-private-property-in-object",
                { loose: true },
            ],
        ],
    },
    router: {
        base: "/qiance",
        middleware: "terminal",
        extendRoutes(routes) {
            routes.push(
                // 首页多语言
                {
                    name: "home",
                    path: "/",
                    component: path.resolve(__dirname, "pages/index.vue"),
                },
                // 登录注册流程
                {
                    path: "/users",
                    component: "~/pages/users.vue",
                    name: "usersCenter",
                    children: [
                        // 注册页面
                        {
                            path: "register",
                            component: "~/pages/users/login.vue",
                            name: "regMobile",
                        },
                        {
                            path: "login",
                            component: "~/pages/users/login.vue",
                            name: "userLogin",
                        },
                    ],
                },
                // 忘记密码
                {
                    path: "/retrieve",
                    component: "~/pages/users/resetPassword.vue",
                    name: "resetPassword",
                },
                // 查商标、查专利、免费核名页面
                {
                    path: "/search",
                    component: "~/pages/content/search.vue",
                    name: "searchContent",
                    meta: {
                        isLogin: true,
                    },
                },
                // 404页面
                {
                    name: "notFound",
                    path: "/404",
                    component: path.resolve(__dirname, "pages/404.vue"),
                },
                // 页面不存在的情况下会跳到404页面
                {
                    path: "/*",
                    redirect: "/404",
                }
            );
            routes.forEach((item) => {
                let path = item.path;
                if (!(item.name === "Index" || item.name === "index")) {
                    item.path = "/:lang([a-z-]{3})?" + path.substr(1);
                }
            });
        },
    },
};
