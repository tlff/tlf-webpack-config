;
var $=window.$=jQuery=window.jQuery=require('jquery');
// require("bootstrap");
// import $ from "jquery";
(function (root, factory) {
    var win = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('win', function () {
            return win;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = win;
    } else {
        // Browser 
        var _win = root.win;
        win.noConflict = function () {
            if (root.win === win) {
                root.win = _win;
            }
            return win;
        };
        root.win = win;
    }
}(this, function (root) {
    var o = {
        "confirm_title": "提示框", //confirm 弹出框title中的文本
        "confirm_btn_cancel": "取消", //confirm 中取消按钮的文本
        "confirm_btn_ok": "确定", //confirm 中确定按钮的文本
        "confirm_append": "body", //confirm 模态框添加到哪里
        "alert_title": "提示",
        "alert_btn": "确定",
        "alert_append": "body"
    };
    var slice = [].slice;
    var one = {}; //函数内部缓存
    var gc = {};


    function extend() {
        var target = arguments[0] || {};
        var arrs = slice.call(arguments, 1);
        var len = arrs.length;
        for (var i = 0; i < len; i++) {
            var arr = arrs[i];
            for (var name in arr) {
                target[name] = arr[name];
            }
        }
        return target;
    }

    function isFn(fn) {
        return typeof (fn) === "function";
    }

    function isObject(obj) {
        return typeof (obj) === "object";
    }
    //alert 模板
    function alertTemplate() {
        var a = "<div class=\"modal fade\" id=\"win_alert\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"win_alert_title\">" + "   <div class=\"modal-dialog modal-sm\" role=\"document\">" + "       <div class=\"modal-content\">" + "           <div class=\"modal-header\">" + "               <h4 class=\"modal-title\" id=\"win_alert_title\">" + o.alert_title + "</h4>" + "           </div>" + "           <div class=\"modal-body\" id=\"win_alert_msg\">" + "           </div>" + "           <div class=\"modal-footer\">" + "               <button type=\"button\" class=\"btn btn-primary win_alert_btn\">" + o.alert_btn + "</button>" + "           </div>" + "       </div>" + "   </div>" + "</div>";
        return a;
    }
    //confirm 模板
    function confirmTemplate() {
        var a = "<div class=\"modal fade\" id=\"win_confirm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"win_confirm_title\">" + "   <div class=\"modal-dialog modal-sm\" role=\"document\">" + "        <div class=\"modal-content\">" + "          <div class=\"modal-header\">" +
            // "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"+
            "               <h4 class=\"modal-title\" id=\"win_confirm_title\">" + o.confirm_title + "</h4>" + "            </div>" + "         <div class=\"modal-body\" id=\"win_confirm_msg\">" + "          确定删除？" + "          </div>" + "         <div class=\"modal-footer\">" + "               <button type=\"button\" class=\"btn btn-default win_confirm_cancel\" data-dismiss=\"modal\">" + o.confirm_btn_cancel + "</button>" + "              <button type=\"button\" class=\"btn btn-primary win_confirm_ok\">" + o.confirm_btn_ok + "</button>" + "         </div>" + "     </div>" + " </div>" + "</div>";
        return a;
    }
    //将alert添加到dom中
    function appendAlert(msg) {
        if (one.alert) {
            return false;
        }
        var templ = $(alertTemplate());
        templ.find("#win_alert_msg").text(msg);
        templ.appendTo($(o.alert_append));
        one.alert = templ;
        templ.modal("show");
        return templ;
    }

    function removeAlert() {
        one.alert.modal('hide');
    }

    function drawGritter(msg) {
        var box = $("<div id=\"win_gritter\"></div>");
        var title = $("<div class=\"win_gritter_title clear_float\"></div>");
        var x = $("<a class=\"win_close\" href=\"javascript:void(0);\"> <i class=\"fa fa-times\"></i></a>");
        var body = $("<div class=\"win_gritter_body\"></div>");
        var clear = $("<div></div>");
        box.css({
            'background-color': 'rgba(0, 0, 0, 0.97)',
            'position': 'fixed',
            'top': '10px',
            'right': '30px',
            'width': '150px',
            'padding': '5px',
            'border': '1px solid rgba(51, 51, 51, 0.16)',
            'background': 'rgba(0,0,0,0.6)',
            "z-index": 1000
        });
        title.css({
            'display': 'block',
            'width': '100%',
        });
        body.css({
            "display": "block",
            "width": "100%",
            "text-align": "left",
            "color": "rgb(245, 245, 245)",
            "overflow": "hidden",

        })
        x.css({
            "float": 'right',
            "color": '#DE431C',
        });
        body.html(msg);
        clear.css('clear', 'both');
        x.appendTo(title);
        clear.appendTo(title);
        title.appendTo(box);
        body.appendTo(box);
        return box;
    }

    function gritter_animate(box) {
        box.css('opacity', '0');
        box.appendTo($("body"));
        box.animate({
            "opacity": 1,
        }, 1000)
        return box;
    }

    function gritter_event(box) {
        box.on('click', '.win_close', function (event) {
            event.preventDefault();
            box.remove();
        });
        setTimeout(function () {
            box.animate({
                "opacity": 0,
            }, 1000, function () {
                box.remove();
            })
            // box.remove();
        }, "1000")
        return box;
    }
    //将模板添加到dom中
    function appendConfirm(msg, options) {
        // if (one.confirm) {
        //     return false;
        // }
        var templ = $(confirmTemplate());
        templ.find("#win_confirm_msg").html(msg);
        templ.appendTo($(o.confirm_append));
        resize(templ, options);
        one.confirm = templ;
        templ.modal("show");
        return templ;
    }

    function showMsgNotification(title, msg) {
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        if (Notification) { //支持桌面通知  
            if (Notification.permission == "granted") { //已经允许通知 

                var instance = new Notification(title, {
                    body: msg,
                    icon: "images/reload.png",
                });
                console.log(instance);
                instance.onclick = function () {
                    // $('body').css({
                    //     'background': 'red'
                    // });
                    // console.log('onclick');
                    instance.close();
                };
                instance.onerror = function () {
                    console.log('onerror');
                };
                instance.onshow = function () {
                    console.log('onshow');
                };
                instance.onclose = function () {
                    console.log('onclose');
                };
            } else { //第一次询问或已经禁止通知(如果用户之前已经禁止显示通知，那么浏览器不会再次询问用户的意见，Notification.requestPermission()方法无效)  
                Notification.requestPermission(function (status) {
                    if (status === "granted") { //用户允许  
                        var instance = new Notification(title, {
                            body: msg,
                            // icon: "images/reload.png"
                        });
                        instance.onclick = function () {
                            // Something to do  
                        };
                        instance.onerror = function () {
                            // Something to do  
                        };
                        instance.onshow = function () {
                            // Something to do  
                        };
                        instance.onclose = function () {
                            // Something to do  
                        };
                    } else { //用户禁止  
                        return false
                    }
                });
            }
        } else { //不支持(IE等)  
            var index = 0;
            clearInterval(timer);
            timer = setInterval(function () {
                if (index % 2) {
                    $('title').text('【　　　】' + title); //这里是中文全角空格，其他不行  
                } else {
                    $('title').text('【新消息】' + title);
                }
                index++;
                if (index > 20) {
                    clearInterval(timer);
                }
            }, 500);
        }
    }

    function removeConfirm() {
        one.confirm.modal('hide');
    }
    //重新调整提示框的大小
    function resize($templ, options) {
        switch (options.size) {
            case "small":
                $templ.find('.modal-dialog').removeClass('modal-lg').addClass('modal-sm');
                break;
            case "big":
                $templ.find('.modal-dialog').removeClass('modal-sm').addClass('modal-lg');
                break;
            case "normal":
                $templ.find('.modal-dialog').removeClass('modal-sm').removeClass('modal-lg');
                break;
        }
    }
    var win = function () { };
    win.alert = function (msg, callback, option) {
        var modal=appendAlert(msg);
        var f = false;
        // modal.off("hidden.bs.modal");
        modal.on("hidden.bs.modal", function (e) {
            modal.remove();   
        })
        // modal.off("click", '.win_alert_btn');
        modal.on('click', '.win_alert_btn', function (event) {
            event.preventDefault();
            f = true;
            modal.modal('hide');
            one.alert = null;
            if (isFn(callback)) {
                callback(this, f);
            }
            // removeAlert();
        });
        return modal;
    }
    win.confirm = function (msg, callback, option) {
        //big small normal  
        var options = {
            "size": "small",
        }
        options = $.extend({}, options, option);
        var modal=appendConfirm(msg, options);
        var f = false; //返回的data属性
        var iscall = true; //是否需要出发回调函数
        // modal.off("click", '.win_confirm_cancel');
        // modal.off("click", '.win_confirm_ok');
        // one.confirm.off("hidden.bs.modal");
        modal.on('click', '.win_confirm_cancel', function (event) {
            event.preventDefault();
            f = false;
            if (isFn(callback) && iscall) {
                iscall = false;
                var ret = callback(modal, f);
                if (ret || ret == "undefind") {   //返回真 或者不返回函数就关掉模态框
                    removeConfirm();
                } else {
                    iscall = true;
                }
            }
        });
        modal.on('click', '.win_confirm_ok', function (event) {
            event.preventDefault();
            f = true;
            if (isFn(callback) && iscall) {
                iscall = false;
                var ret = callback(modal, f);
                if (ret) {   //返回true的时候关掉模态框
                    removeConfirm();
                } else {
                    iscall = true;
                }
            }
            return false;
        });
        modal.on("hidden.bs.modal", function (e) {
            // removeConfirm();
            modal.remove();
            one.confirm = null;
            if (isFn(callback) && iscall) {
                callback(modal, f);
            }
            f = false;
        })
    }
    win.gritter = function (msg, callback) {
        var box = drawGritter(msg);
        box = gritter_animate(box);
        box = gritter_event(box);
    }
    win.notice = function (title, msg, callback) {
        showMsgNotification(title, msg);
    }
    win.config = function (option) {
        if (isObject(option)) {
            o = extend(o, option);
        }
        return;
    }
    return win;
}))