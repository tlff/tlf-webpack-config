import $ from "jquery";
import { c } from "./c.js";
export  function a(){
    $("#container").text("adsa");
    $("#container").off("click");
    $("#container").on("click",e=>{
        console.log(c());
    })
}
console.log('bbbb1');
