import $ from "jquery";
import { c } from "./c.js";
export  function a(){
    $("#container").text("ddd");
    $("#container").off("click");
    $("#container").on("click",e=>{
        console.log(c());
    })
}
console.log('bbbb');
