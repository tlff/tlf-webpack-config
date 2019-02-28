// import $ from "jquery";
import "../css/index.css";
import Vue from "vue";
import colorpicker from "./component/colorpicker.vue";
new Vue({
    el:"#app",
    data:{
        color:"",
    },
    components:{colorpicker}
    
});
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