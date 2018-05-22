import "./style.css";
import {a} from "./b.js";
a();
if (module.hot) {
    module.hot.accept();
    // module.hot.accept("./b.js",e=>{
    //     console.log(e);
    //     a();
    // })
}