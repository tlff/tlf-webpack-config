import baseClass from "./event";
export default class pagination extends baseClass {
    constructor(containerId, page, count, ppc, options) {
        super();
        if (typeof containerId == 'object') {
            this.container = containerId;
        } else {
            this.container = $("#" + containerId);
        }
        this.page = parseInt(page);
        this.count = parseInt(count);
        this.ppc = parseInt(ppc);

        let defaultOpt = {
            countLi: 5,
            leftCount: 2,
            rightCount: 2
        }
        this.opt = Object.assign(defaultOpt, options);
        this.init();
    }
    init() {
        this.maxPage = Math.ceil(this.count / this.ppc);
        if (this.page > this.maxPage) {
            this.page = this.maxPage;
        }
        this.ul = this.tmpl();
        this.container.empty();
        this.container.append(this.ul);
        this.bindEvent();
    }
    bindEvent() {
        let self = this;
        this.ul.on("click", "li", function (e) {
            e.preventDefault();
            self.ul.find("li").each((i, el) => {
                $(el).removeClass("active")
            });
            $(this).addClass("active");
            let page = $(this).find("a").data("p");
            if ($(this).find('a').hasClass("p_pre")) {
                page = Math.max(self.page - 1, 1);
            }
            if ($(this).find('a').hasClass("p_next")) {
                page = Math.min(self.page + 1, self.maxPage);
            }
            self.update(page);
            self.trigger("change", page);
        })
    }
    update(page, count, ppc) {
        this.page = parseInt(page ? page : this.page);
        this.count = parseInt(count ? count : this.count);
        this.ppc = parseInt(ppc ? ppc : this.ppc);
        this.init();
    }
    tmpl() {
        let min = Math.min(this.maxPage, this.opt.countLi);
        let ul = $(`<ul class="pagination"></ul>`);
        ul.append(this.li("<<", 'pre'));
        ul.append(this.li("1", 'page'));
        // if(this.page>this.opt.leftCount+1){
        //     ul.append(this.li("...", 'page'));
        // }
        if (this.page > this.opt.leftCount + 1) {
            let right = 0, left = 0;
            if (this.maxPage > this.page + this.opt.rightCount) {
                right = this.opt.rightCount;
            } else {
                right = this.maxPage - this.page;
            }
            left = min - right;

            if ((this.page - left) > 1) {
                ul.append(this.li("...", "page"));
            }
            if(this.page == left){
                left--;
            }
            for (let i = this.page - left + 1; i <= this.page + right; i++) {
                ul.append(this.li(i, "page"));
            }
        } else {
            for (let i = 2; i <= min; i++) {
                ul.append(this.li(i, "page"));
            }
        }
        if (this.opt.countLi < this.maxPage && this.page + this.opt.rightCount + 1 < this.maxPage) {
            ul.append(this.li("...", 'page'));
        }
        if (this.opt.countLi < this.maxPage && this.page + this.opt.rightCount < this.maxPage) {
            ul.append(this.li(this.maxPage, 'page'));
        }

        ul.append(this.li(">>", 'next'));
        return ul;
    }
    li(page, type) {
        let pClass = {
            "pre": "p_pre",
            'next': "p_next",
            "page": "p"
        }
        let li = $(`<li>
                    <a herf="#" class="${pClass[type]}" data-p="${parseInt(page)}">${page}</a>
                </li>`);
        if (page == this.page) {
            li.addClass("active");
        }
        return li;
    }
}