module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true,
        "jest": true,
        "amd": true
    },
    "extends": [
        'eslint:recommended',
        //主要在这里,下面这两个可以二选一
        "plugin:vue/strongly-recommended"
        // 'plugin:vue/recommended'
    ],
    "parserOptions": {
        // "parser": 'babel-eslint',
        "ecmaVersion": 2015,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "no-console": [
            0
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
};