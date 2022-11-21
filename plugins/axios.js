import qs from "qs";
import utils from "~/utils/utils";
import apiMap from "~/service/api_map";
import LRUCache from "lru-cache";
import {
    cacheAdapterEnhancer,
    throttleAdapterEnhancer,
} from "axios-extensions";
let service = null;
// api数据缓存存储对象
const cacheCfg = new LRUCache({
    // 有效期24小时
    ttl: 1000 * 60 * 60 * 24,
    // 最大缓存数量
    max: 1000,
});
export default ({ route, query, redirect, $axios }) => {
    let authorization = undefined;
    if (process.client) {
        authorization = utils.getCookiesInClient("Authorization");
    }

    let config = {
        baseURL: "",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-Request-Timestamp": Date.now().toString(),
            Authorization: authorization,
        },
        // 超时设置
        timeout: 30000,
        // 跨域是否带Token
        withCredentials: true,
        // 响应的数据格式 json / blob /document /arraybuffer / text / stream
        responseType: "json",
        rejectUnauthorized: false,
        // 配置适配器，如果 options 中带有 useCache 字段，并且值为 true，则该请求会被缓存
        adapter: throttleAdapterEnhancer(
            cacheAdapterEnhancer($axios.defaults.adapter, {
                enabledByDefault: false, //
                cacheFlag: "useCache",
                defaultCache: cacheCfg,
            })
        ),
    };
    service = $axios.create(config);

    service.interceptors.request.use(
        (config) => {
            if (process.client) {
                if (config && config["headers"]) {
                    if (!config["headers"]["Authorization"]) {
                        config["headers"]["Authorization"] =
                            utils.getCookiesInClient("Authorization");
                    }
                }
            }

            // 替换_api
            for (let key in apiMap) {
                let item = apiMap[key];
                let reg = new RegExp(`^\/${key}\/`);

                config.url = config.url.replace(reg, item.target + item.path);
            }

            // 打印接口
            if (Number(query.apidebug)) {
                if (config.method === "post") {
                    console.log(
                        config.url + (config.data ? "&" + config.data : "")
                    );
                } else if (config.method === "get") {
                    console.log(
                        config.url +
                            (config.params
                                ? "&" + qs.stringify(config.params)
                                : "")
                    );
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 返回状态判断
    service.interceptors.response.use(
        (res) => {
            let reqData = qs.parse(res.config.data || res.config.params);
            let data = res.data;
            let errCode = data.code || res.code;
            // 服务端错误处理
            if (process.server) {
                if (errCode === 500) {
                    utils.toast(data.msg);
                    return Promise.reject();
                } else if (errCode == 403) {
                    utils.removeToken();
                    redirect({
                        path: `/users/login?redirect=${route?.fullPath}`,
                    });
                    return Promise.reject();
                } else if (errCode == 404) {
                    redirect({
                        path: "/404",
                    });
                    console.log(
                        res.config.url + "&" + qs.stringify(reqData),
                        JSON.stringify(data)
                    );
                    return Promise.reject();
                }
            }

            // 客户端错误
            if (process.client) {
                if (errCode != 200) {
                    // 统一处理错误提示
                    errCode !== 401 ? utils.toast(data.msg) : null;
                    return Promise.reject(data);
                }
            }
            return Promise.resolve(data);
        },
        (error) => {
            console.error(error);
        }
    );

    $axios.globalApi = transfer;
};

function transfer(method, url, datas = {}, options = {}) {
    let params = {};
    if (method === "get" || method === "delete") {
        params = { params: datas };
    }
    if (method === "post") {
        params = { data: datas };
    }
    // 参数带clientToastHide = 1,不执行utils.toast
    let toastKey = "clientToastHide";
    if (params && params.data && params.data[toastKey]) {
        service[toastKey] = params["data"][toastKey];
        delete params.data[toastKey];
    }
    return service({
        ...options,
        method,
        url,
        ...params,
    });
}
