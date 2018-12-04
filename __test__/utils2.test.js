import $ from "jquery";
jest.mock('jquery');
$.ajax = jest.fn((option) => {
    return new Promise((resolve, reject) => {
        let reg = /user/;
        if (reg.test(option.url)) {
            resolve({ "no": "ok" });
        } else {
            reject({ "no": "error" });
        }
    })
})
import UTILS from "../src/js/utils";
beforeEach(() => jest.resetModules());
describe("测试getData", () => {
    test("请求成功", () => {
        expect.assertions(1);
        let pro = UTILS.getData("http://192.168.1.200/question/user", "", "", "", "", "", "");
        return pro.then(re => {
            expect(re).toEqual({ "no": "ok" });
        })
    })
    test("请求失败", () => {
        expect.assertions(1);
        let pro = UTILS.getData("http://192.168.1.200/question", "", "", "", "", "", "");
        return pro.catch(re => {
            expect(re).toEqual({ "no": "error" });
        })
    })
})