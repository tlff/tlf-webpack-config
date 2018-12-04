import $ from "jquery";
// require("bootstrap");
// import * as BOOTSTRAP from "bootstrap/js/src/index";
import "bootstrap";
import UTILS from "../src/js/utils";
// var $ = window.$ = jQuery = window.jQuery = require('jquery');
test("测试utils中isNumber", () => {
    expect(UTILS.isNumber(123)).toBeTruthy();
    expect(UTILS.isNumber(1233.2)).toBeTruthy();
    expect(UTILS.isNumber(-1233.2)).toBeTruthy();
    expect(UTILS.isNumber("123")).toBeFalsy();
    expect(UTILS.isNumber({})).toBeFalsy();
});
describe("测试$_Get", () => {

    test("有参数", () => {
        jsdom.reconfigure({
            url: "http://localhost/index.php?/index/index&a=1&b=2&c=abc"
        });
        expect(UTILS.$_GET('a')).toBe("1");
        expect(UTILS.$_GET('b')).toBe("2");
        expect(UTILS.$_GET('c')).toBe("abc");
        expect(UTILS.$_GET('index/index')).toBe(undefined);
    });
    test("没有参数", () => {
        jsdom.reconfigure({
            url: "http://localhost/index.php"
        });
        expect(UTILS.$_GET('a')).toBe("");
        expect(UTILS.$_GET('b')).toBe("");
    });
})
test("邮箱格式", () => {
    expect(UTILS.validEmail('96')).toBeFalsy();
    expect(UTILS.validEmail('961017514@qq.com')).toBeTruthy();
    expect(UTILS.validEmail('asasdasd@asdfa')).toBeFalsy();
    expect(UTILS.validEmail('asasdasd@asdfa.')).toBeFalsy();
    expect(UTILS.validEmail('a@sasdasd@asdfa.')).toBeFalsy();
    expect(UTILS.validEmail('a@sasd.asd@asdfa')).toBeFalsy();
})
describe("测试弹出框", () => {
    beforeEach(() => {
        document.body.innerHTML = ``;
    })
    test("测试弹出框1", () => {
        document.body.innerHTML = ``;
        //TODO 避免用settimeout,之所以用settimeout是因为直接触发单击会在html添加之前,click不会触发
        UTILS.alert("测试")
        expect($("body").children().get(0)).toMatchSnapshot();
        // process.nextTick(() => {
        //     $(".win_alert_btn").click();
        //     process.nextTick(() => {
        //         expect($("body").children().get(0)).toMatchSnapshot();
        //         done();
        //     })
        // })
        // setTimeout(() => {
        // $(".win_alert_btn").click();
        //     setTimeout(() => {
        //         expect($("body").children().get(0)).toMatchSnapshot();
        //         done();
        //     }, 1000);
        // }, 1000);
    })
})
describe("测试confirm", () => {
    test("测试confirm并确定", () => {
        expect.assertions(2);
        document.body.innerHTML = ``;
        let p = UTILS.confirm("测试");
        expect($("body").children().get(0)).toMatchSnapshot();
        $("body").children().find(".win_confirm_ok").click();
        return p.then(re => {
            expect(re).toBeTruthy();
        })
    })
    test("测试confirm并取消", () => {
        expect.assertions(2);
        document.body.innerHTML = ``;
        let p = UTILS.confirm("测试");
        expect($("body").children().get(0)).toMatchSnapshot();
        $("body").children().find(".win_confirm_cancel").click();
        return p.catch(re => {
            expect(re).toBeFalsy();
        })
    })
})
describe("测试crtTime", () => {
    test("1543307019436 应该是2018-11-27", () => {
        expect(UTILS.crtTime(1543307019436)).toBe("2018-11-27");
    });
    test("对于null返回空", () => {
        expect(UTILS.crtTime(null)).toBe("");
        expect(UTILS.crtTime("")).toBe("");
        expect(UTILS.crtTime("asd")).toBe("");
    });
})
test("测试newid", () => {
    let a = UTILS.newid();
    let b = UTILS.newid();
    expect(a).not.toBe(b);
})
test("测试密码强度", () => {
    expect(UTILS.checkStrong("1234")).toBe(0);
    expect(UTILS.checkStrong("a1234")).toBe(2);
    expect(UTILS.checkStrong("a1234@")).toBe(3);
    expect(UTILS.checkStrong("a1A234@")).toBe(4);
})
test("密码最少六位最多18位",() => {
    expect(UTILS.validPwd('adfgw87^')).toBeTruthy();
    expect(UTILS.validPwd('ads^')).toBeFalsy();
})
test("生成标签",() => {
    expect(UTILS.label("success","测试")).toMatchSnapshot();
})

