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
console.log(_.join(['a','c'],""));
if (module.hot) {
    module.hot.accept();
}