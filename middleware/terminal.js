export default function ({ route, app }) {
    // 以750设计图为基数的rem
    const remPage = ["rental_manager"];
    // 当前路由名称
    const routeName = route?.name?.toLowerCase();
    const isRem = remPage.includes(routeName);
    const scriptArr = app.head.script;
    if (isRem) return;
    const index = _.findIndex(scriptArr, (script) =>
        script?.src?.includes("flexiblle")
    );
    scriptArr.splice(index, 1);
}
