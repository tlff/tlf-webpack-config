import baseClass from "../lib/event";
import utils from "../utils";
import "icheck";
import "icheck/skins/flat/red.css";
import $ from 'jquery';
import datatable from "datatables";
$.fn.DataTable =datatable(window,$);
export default class countList extends baseClass {
    constructor(id) {
        super();
        if (typeof id == "object") {
            this.container = id;
        } else {
            this.container = $("#" + id);
        }
        this.init();
    }
    init() {
        this.el = this.tmpl();
        this.container.append(this.el);
        this.bindEvent();
    }
    tmpl() {
        let tm = `<div>
                    <div class="clearfix">
                        <div class="btn-group">
                            <a id="" class="btn btn-primary" href="./index.php?/index/countadd">
                                新建
                                <i class="fa fa-plus"></i>
                            </a>
                            <button style="margin-left:10px;"  class="allDel btn btn-danger">
                                批量删除
                            </button>
                        </div>
                    </div>
                    <table class="display table table-bordered dataTable no-footer" aria-describedby="hidden-table-info_info" role="grid">
                    <thead>
                        <tr role="row">
                            <th>
                                <div class="">
                                    <div style="display: block;
                                        ">
                                        <input type="checkbox" class="allcheck">
                                    </div>
                                </div>
                            </th>
                            <th>ID</th>
                            <th>标题</th>
                            <th>描述</th>
                            <th>时长(单位:秒)</th>
                            <th >创建时间</th>
                            <th>编辑</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                    </tbody>
                </table>
                </div>` ;
        return $(tm);
    }
    uncheckall() {
        this.el.find(".list_checkbox").each(function () {
            let input = $(this);
            input.iCheck("uncheck");
        })
    }
    bindEvent() {
        let self = this;
        let dom = this.el;
        this.table = this.el.find('table').DataTable({
            order: [
                ["5", 'desc']
            ], //按照发布时间降序排序
            page: false,
            searchDelay: 350,
            info: true,
            autoWidth: false,
            searching: true,
            ajax: {
                "url": "./index.php?/countdown/datatable",
            },
            columns: [{
                data: "null",
                sortable: false
            }, {
                data: "id",
                sortable: false
            }, {
                data: "title",
                sortable: false
            }, {
                data: "description",
                sortable: false
            }, {
                data: "duration",
                sortable: false
            }, {
                data: "create_time",
            }, {
                data: "null",
                sortable: false
            }],
            columnDefs: [{
                targets: 0,
                data: null,
                defaultContent: "",
                render: function (e) {
                    let tmp = `<div class="flat-red single-row">
                                    <div style="display: block;
                                        ">
                                        <input type="checkbox" class="list_checkbox">
                                    </div>
                                </div>`;
                    return tmp;
                }
            }, {
                targets: -2,
                data: null,
                defaultContent: "",
                render: function (e) {
                    return utils.crtTime(e * 1000);
                }
            },
            {
                targets: -1,
                data: null,
                defaultContent: "",
                render: function (e) {
                    return `<button class="btn btn-info btn-xs editBtn">编辑</button>
                    <button class="btn btn-danger btn-xs delBtn">删除</button>`;
                }
            }],
            createdRow: function (row, data, index) {
                $(row).data("id", data.id);
                $(row).data("data", data);
                $(row).addClass("countdown_tr");
            },
            "drawCallback": function (set) {
                this.find('.flat-red input').iCheck({
                    checkboxClass: 'icheckbox_flat-red',
                    radioClass: 'iradio_flat-red'
                });
                this.find(".allcheck").iCheck("uncheck");
                self.trigger("draw");
            },
        });
        this.table.on("click", ".editBtn", function (e) {
            let id = $(this).closest("tr").data("id");
            if (!id) return;
            location.href = "./index.php?/index/countedit&id=" + id;
        })
        this.table.on("click", ".delBtn", function (e) {
            let id = $(this).closest("tr").data("id");
            if (!id) return;
            utils.confirm("确定删除?").then(re => {
                $(this).text("删除中...");
                $.ajax({
                    type: "POST",
                    url: "./index.php?/countdown/del",
                    data: { 'id': id },
                    dataType: "jsonp",
                    timeout: "2000"
                }).then(re => {
                    if (re.status == "ok") {
                        self.table.draw(false);
                    } else {
                        utils.alert("网络错误.");
                    }
                }, er => {
                    utils.alert("网络错误.");
                })
            }, er => {

            })
        })
        dom.find(".allcheck").iCheck({
            checkboxClass: 'icheckbox_flat-red',
            radioClass: 'iradio_flat-red'
        })
        let checkflag = true;
        dom.find(".allcheck").on("ifChecked", function (e) {
            checkflag = true;
            dom.find(".list_checkbox").iCheck("check");
        })
        dom.find(".allcheck").on("ifUnchecked", function (e) {
            if (checkflag) {
                dom.find(".list_checkbox").iCheck("uncheck");
            }
        })
        dom.on("ifUnchecked", ".list_checkbox", function () {
            checkflag = false;
            dom.find(".allcheck").iCheck("uncheck");
            let tr = $(this).closest("tr");
            let data = tr.data("data");
            self.trigger("unchecked", data);
        })
        dom.on("ifChecked", ".list_checkbox", function () {
            let tr = $(this).closest("tr");
            let data = tr.data("data");
            self.trigger("checked", data);
        })
        this.el.on('click', ".allDel", function (e) {
            utils.confirm("确定删除?").then(re => {
                let id = [];
                dom.find(".list_checkbox:checked").each((index, val) => {
                    let tr = $(val).closest("tr");
                    let d = tr.data("id");
                    if (d) {
                        id.push(d);
                    }
                })
                let ajaxs = id.map(val => {
                    return $.ajax({
                        type: "post",
                        url: "./index.php?/countdown/del",
                        data: { "id": val },
                        dataType: "jsonp"
                    })
                })
                Promise.all(ajaxs).then(re => {
                    self.table.draw(false);
                }).catch(e => {
                    self.table.draw(false);
                });
            }, er => {

            });
        })
    }
}