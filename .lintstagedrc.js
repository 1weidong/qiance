module.exports = {
    "*.{js,ts,jsx,tsx}": ["prettier --write", "eslint --fix"],
    "*.vue": ["stylelint --fix", "prettier --write", "eslint --fix"],
    "*.{scss,css}": ["stylelint --fix --allow-empty-input", "prettier --write"],
};
