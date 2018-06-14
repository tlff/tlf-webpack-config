#!/usr/bin/env node
const program = require("commander");
const fs = require('fs');
const PATH = require("path");
function run(name) {
    copy(PATH.resolve(__dirname, "../"), name);
}
const arr=[
    "webpack.common.js",
    "webpack.dev.js",
    "webpack.prod.js",
    "webpack.watch.js",
    "src",
    "package.json",
    ".babelrc"
]
function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(PATH.dirname(dirpath), mode, function () {
                console.log(PATH.dirname(dirpath));
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};
// let i=0;
// let con=true;
// function show(length,bo){
//     con=con&&bo;
//     i++;  
//     if(length==i){
//         console.log("初始化成功");
//     } 
// }
function copy(src,dst){
    dst=PATH.resolve(dst);
    fs.exists(dst,function(exist){
        if(!exist){
            mkdirs(dst,"0777",function(){
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
                console.log("初始化成功");
            })
        }else{
            console.log("目录已存在");
            return;
        }
    })    
}
function copyFile(_src,_dst){
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