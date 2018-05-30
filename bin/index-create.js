#!/usr/bin/env node
const program = require("commander");
const fs = require('fs');
const PATH = require("path");
function run(name) {
    copy2(PATH.resolve(__dirname, "../"), name);
}
let arr=[
    "webpack.common.js",
    "webpack.dev.js",
    "webpack.prod.js",
    "src",
    ".gitignore"
]
function copy2(src,dst){
    fs.exists(dst,function(exist){
        if(!exist){
            fs.mkdir(dst,function(){
                
                arr.map(function(index){
                    let _src = PATH.resolve(src, index);
                    let _dst = PATH.resolve(dst, index);
                    fs.stat(_src,function(err,stat){
                        if(err){
                            throw err;
                        }
                        if(stat.isFile()){
                            copyFile(_src, _dst);
                        }else{
                            copyDir(_src, _dst);
                        }
                    })
                })
            })
        }
    })    
}
function copyFile(_src,_dst){
    // console.log(_src);
    // console.log(_dst);
    fs.readFile(_src, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }

        fs.writeFile(_dst, data, 'utf-8', function (err) {
            if (err) {
                throw err;
            }
        });
    })   
}
function copyDir(src, dst) {
    fs.exists(dst, function (exist) {
        if (!exist) {
            fs.mkdir(dst, function () {
                fs.readdir(src, function (err, paths) {
                    if (err) {
                        throw err;
                    }
                    paths.forEach(function (path) {
                        var _src = PATH.resolve(src, path),
                            _dst = PATH.resolve(dst, path);
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                                throw err;
                            }
                            
                            if (stat.isFile()) {
                                copyFile(_src, _dst);
                            } else {
                                copyDir(_src, _dst);
                            }
                        });
                    })
                })
            });
        } else {
            console.log("%s 已经存在", dst);
            return false;
        }
    })

}
program
    .command('create')
    .description('创建一个项目')
    .alias('c')
    .action(function (name) {
        run(name);
    });
program.parse(process.argv);