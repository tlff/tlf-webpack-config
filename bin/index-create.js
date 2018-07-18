#!/usr/bin/env node
const program = require("commander");
const fs = require('fs');
const PATH = require("path");
function run(name) {
    copy1(PATH.resolve(__dirname, "../"), name);
}
const arr = [
    "webpack.common.js",
    "webpack.dev.js",
    "webpack.prod.js",
    "webpack.watch.js",
    "src",
    "package.json",
    ".babelrc",
    ".gitignore"
]

function copy1(src, dst) {
    dst = PATH.resolve(dst);
    if(fs.existsSync(dst)){
        console.log(dst+"  已经存在!");
        return;
    }
    if (!fs.existsSync(dst)) {
        fs.mkdirSync(dst, "0777");
    }
    arr.forEach(ar => {
        let _src = PATH.resolve(src, ar);
        let _dst = PATH.resolve(dst, ar);
        if (ar == "package.json") {
            let data = fs.readFileSync(ar, { encoding: "utf-8" });
            data = JSON.parse(data);
            let { scripts, devDependencies } = data;
            let a = { scripts, devDependencies }; 
            fs.writeFileSync(_dst, JSON.stringify(a), { encoding: "utf-8" });
            return;
        } else {
            copy2(_src, _dst);
        }
    })
    console.log(dst+"  创建完成");
}
function copy2(src, dst) {
    dst = PATH.resolve(dst);
    src = PATH.resolve(src);
    if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dst);
    } else if (fs.statSync(src).isDirectory()) {
        let dirs = fs.readdirSync(src);
        if (!fs.existsSync(dst)) {
            fs.mkdirSync(dst, "0777");
        }
        dirs.forEach(dir => {
            let _dst = PATH.resolve(dst, dir);
            let _src = PATH.resolve(src, dir);
            copy2(_src, _dst);
        })
    }
    // console.log("生成:   " + dst);
}
program
    .command('create')
    .description('创建一个项目')
    .alias('c')
    .action(function (name) {
        run(name);
    });
program.parse(process.argv);