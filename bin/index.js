#!/usr/bin/env node

process.title = "twc";

const com = require("commander");
com.version("1.0.0", "-v, --version")
    .usage("<command> [options]")
    .command("create", "创建项目<name>")
    .parse(process.argv);

require("./index-create");