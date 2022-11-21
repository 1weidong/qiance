module.exports = {
    extends: ["@commitlint/config-conventional", "cz"],
    rules: {
        // Header
        "header-max-length": [2, "always", 200],
        // <type>枚举
        "type-enum": [
            2,
            "always",
            [
                "init", // 初始化
                "feat", // 增加新功能
                "fix", // 修复bug
                "docs", // 修改文档
                "ui", // 更新ui
                "style", // 样式修改不影响逻辑
                "refactor", // 代码重构
                "perf", // 提升性能
                "test", // 单元测试修改
                "build", // 编译配置
                "chore", // 无src或test的操作
                "revert", // 回滚操作
                "add", // 添加依赖
                "delete", // 删除代码/文件
                "merge", // 合并分支
            ],
        ],
        // <type> 不能为空
        "type-empty": [2, "never"],
        // <scope> 不能为空
        "scope-empty": [2, "never"],
        // <subject> 不能为空
        "subject-empty": [2, "never"],
        // <subject> 以.为结束标志
        "subject-full-stop": [2, "never", "."],
        "subject-case": [2, "never", []],
        // <body> 以空行开头
        "body-leading-blank": [1, "always"],
        // <footer> 以空行开头
        "footer-leading-blank": [1, "always"],
    },
};
