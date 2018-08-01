import $ from "jquery";
console.log(333);
$.ajax({
    url:"/api/index/test1",
    dataType:"json"
}).then(r=>{
    console.log(r);
},e=>{})

if (module.hot) {
    module.hot.accept();
}