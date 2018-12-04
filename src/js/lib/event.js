/**
 * 事件监听对象
 */
class Target {
    /**
     * 构造函数
     * 事件管理器
     * @memberof Target
     */
    constructor() {
        this.__list = {};
        this.__listone = {};
    }
    /**
     * 有没有指定类型的事件正在监听
     * @param {string} type 事件类型
     */
    hasType(type) {
        if (this.__list.hasOwnProperty(type) && this.__list[type].length > 0) {
            return true;
        }
        return false;
    }
    /**
     * 绑定事件
     *
     * @param {string} type 事件类型
     * @param {function} fn 回调函数
     * @memberof EventTarget
     */
    on(type, fn) {
        if (!this.__list.hasOwnProperty(type)) {
            this.__list[type] = [];
        }
        this.__list[type].push(fn);
    }
    one(type,fn){
        if (!this.__listone.hasOwnProperty(type)) {
            this.__listone[type] = [];
        }
        this.__listone[type].push(fn);  
    }
    /**
     *触发指定的事件
     *
     * @param {string} type 事件类型
     * @param {function} event 回调的参数
     * @memberof EventTarget
     */
    trigger(type, ...arg) {
        if (this.__list.hasOwnProperty(type)) {
            this.__list[type].map(val => {
                val.call(this, ...arg);
            })
        }
        if (this.__listone.hasOwnProperty(type)) {
            while (this.__listone[type].length) {
                this.__listone[type].shift().call(this, ...arg);   
            }
        }
    }
    /**
     * 清除指定的事件
     *
     * @param {string} type 事件类型
     * @param {function} fn 回调函数
     * @memberof EventTarget
     */
    clear(type, fn) {
        if (!fn) {
            if (this.__list.hasOwnProperty(type)) {
                this.__list[type] = [];
            }
        } else {
            if (this.__list.hasOwnProperty(type)) {
                this.__list[type] = this.__list[type].filter(val => {
                    return val !== fn;
                })
            }
        }
    }
}
export default Target;
