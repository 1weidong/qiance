import utils from "@/utils/utils.js";
export default ({ app }) => {
    /**
     * @description: 导航路由守护
     * @param {object} to - 将访问的路径
     * @param {object} from - 代表从那个路径跳转而来
     * @param {function} next - 强制跳转
     */
    app.router.beforeEach((to, from, next) => {
        const isToken = utils.getCookiesInClient("Authorization");
        const isLogin = to?.meta?.isLogin || false;
        // 确定用户是否已登录
        if (isToken) {
            if (to.path === "/users/login") {
                // 如果已登录，则重定向到主页
                next({ path: "/" });
                return;
            }
        } else {
            // 没有访问权限的页面需要登录
            if (isLogin) {
                next(`/users/login?redirect=${to.fullPath}`);
                return;
            }
        }
        next();
    });
};
