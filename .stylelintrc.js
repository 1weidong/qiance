module.exports = {
    root: true,
    extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-config-prettier",
        "stylelint-config-html/vue",
    ],
    defaultSeverity: "warning",
    plugins: ["stylelint-order", "stylelint-scss"],
    customSyntax: "postcss-scss",
    overrides: [
        {
            files: "**/*.scss",
            customSyntax: "postcss-scss",
        },
        {
            files: ["*.vue", "**/*.vue"],
            customSyntax: "postcss-html",
            rules: {
                "selector-pseudo-class-no-unknown": [
                    true,
                    {
                        ignorePseudoClasses: ["deep", "global"],
                    },
                ],
                "selector-pseudo-element-no-unknown": [
                    true,
                    {
                        ignorePseudoElements: [
                            "v-deep",
                            "v-global",
                            "v-slotted",
                        ],
                    },
                ],
            },
        },
    ],
    rules: {
        "color-function-notation": "legacy",
        "no-missing-end-of-source-newline": null,
        "max-nesting-depth": 4,
        "selector-max-compound-selectors": 4,
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,
        "alpha-value-notation": "number",
    },
};
