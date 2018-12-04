// import $ from "jquery";
import "../css/index.css";
console.log(333);
$.ajax({
    url:"/api/index/test1",
    dataType:"json"
}).then(re=>{
    console.log(re);
}).catch(er=>{
    console.log(er);
});
if (module.hot) {
    module.hot.accept();
}