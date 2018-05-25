#!/usr/bin/env node
const program = require("commander");
const fs = require('fs');
const PATH = require("path");
function run(name) {
    copy(PATH.resolve(__dirname, "../public"), name);
}
function copy(src, dst) {
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
                                fs.readFile(_src, 'utf-8', function (err, data) {
                                    if (err) {
                                        throw err;
                                    }

                                    fs.writeFile(_dst, data, 'utf-8', function (err) {
                                        if (err) {
                                            throw err;
                                        }
                                        // console.log("%s 写入完毕", _dst);
                                    });
                                })
                            } else {
                                copy(_src, _dst);
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