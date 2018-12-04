import win from "./win";
import { resolve } from "path";
export default class utils {
    constructor() {
    }
    static alert(msg) {
        return win.alert(msg);
    }
    static confirm(msg) {
        return new Promise((res, reject) => {
            win.confirm(msg, function (ele, d) {
                if (d) {
                    res(d, ele);
                } else {
                    reject(d, ele);
                }
                return true;
            })
        })

    }
    static crtTime(val) {
        val=parseInt(val);
        if (val) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        return "";
    }
    static label(cl, text) {
        return `<span class= "label label-mini ${cl}" >${text}</span>`;
    }
    static getData(url, page, search, ppc, orderby, order, param) {
        let data = {
            page: page,
            search: search,
            ppc: ppc,
            orderby,
            order,
            param
        }
        return $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "jsonp",
        });
    }
    static newid() {
        return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
    }
    static isNumber(val) {
        return "number" == typeof val;
    }
    static $_GET(key) {
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            var get = {};
            for (var i in u) {
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get[key];
        } else {
            return "";
        }
    }
    static validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    static validPwd(pwd) {
        //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        // var re = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        let re = /^.{6,18}$/;
        return re.test(pwd);
    }

    //返回强度级别  
    static checkStrong(sPW) {
        //判断输入密码的类型  
        function CharMode(iN) {
            if (iN >= 48 && iN <= 57) //数字  
                return 1;
            if (iN >= 65 && iN <= 90) //大写  
                return 2;
            if (iN >= 97 && iN <= 122) //小写  
                return 4;
            else return 8;
        }
        //bitTotal函数  
        //计算密码模式  
        function bitTotal(num) {
            let modes = 0;
            for (let i = 0; i < 4; i++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        }
        if (sPW.length <= 4) return 0; //密码太短  
        let Modes = 0;
        for (let i = 0; i < sPW.length; i++) {
            //密码模式  
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        return bitTotal(Modes);
    }

}