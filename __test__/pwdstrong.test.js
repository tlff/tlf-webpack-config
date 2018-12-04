import App from "../src/js/component/pwdstrong.vue";
import { mount } from "vue-test-utils";
import Vue from "VUE";

describe("reset.test.js", () => {
    let cmp, vm;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="reset_form"></div>
        `;
        jsdom.reconfigure({
            url: "http://localhost/index.php?/reset&token=asdf"
        });
    });

    it('测试密码 a82820070 是中等密码', () => {
        cmp = mount(App, {
            propsData: {
                value: "a82820070"
            }
        })
        expect(cmp.vm.value).toBe("a82820070");
        expect(cmp.vm.color).toEqual({
            Lcolor:"#ffd8b4",
            Mcolor:"#ffaf56",
            Hcolor:"#eeeeee"
        });
        expect(cmp.vm.$el).toMatchSnapshot();
    });
    test("测试 12$#afiojgSF 是复杂密码", () => {
        cmp = mount(App, {
            propsData: {
                value: "12$#afiojgSF"
            }
        });
        expect(cmp.vm.color).toEqual({
            Lcolor:"#ffd8b4",
            Mcolor:"#ffaf56",
            Hcolor:"#e85959"
        });
        expect(cmp.vm.value).toBe("12$#afiojgSF");
        expect(cmp.vm.$el).toMatchSnapshot();
    });
    test("测试 1234123 是弱密码", () => {
        cmp = mount(App, {
            propsData: {
                value: "1234123"
            }
        })
        expect(cmp.vm.value).toBe("1234123");
        expect(cmp.vm.$el).toMatchSnapshot();
    })
    test("测试 '123' 是弱密码", () => {
        cmp = mount(App, {
            propsData: {
                value: "123"
            }
        })
        expect(cmp.vm.value).toBe("123");
        expect(cmp.vm.$el).toMatchSnapshot();
    })
});