<template>
  <ul class="pass_set">
    <li
      class="strength_L"
      :style="{'background-color':color.Lcolor}"
    >
      弱
    </li>
    <li
      class="strength_M"
      :style="{'background-color':color.Mcolor}"
    >
      中
    </li>
    <li
      class="strength_H"
      :style="{'background-color':color.Hcolor}"
    >
      强
    </li>
  </ul>
</template>
<script>
export default {
    name: "PwdStrong",
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {};
    },
    mounted() {},
    computed: {
        color() {
            return this.pwStrength(this.value);
        }
    },
    methods: {
    //判断输入密码的类型
        CharMode(iN) {
            if (iN >= 48 && iN <= 57)
            //数字
                return 1;
            if (iN >= 65 && iN <= 90)
            //大写
                return 2;
            if (iN >= 97 && iN <= 122)
            //小写
                return 4;
            else return 8;
        },
        //bitTotal函数
        //计算密码模式
        bitTotal(num) {
            let modes = 0;
            for (let i = 0; i < 4; i++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        },
        checkStrong(sPW) {
            if (sPW.length <= 6) return 0; //密码太短
            let Modes = 0;
            for (let i = 0; i < sPW.length; i++) {
                //密码模式
                Modes |= this.CharMode(sPW.charCodeAt(i));
            }
            return this.bitTotal(Modes);
        },
        pwStrength(pwd) {
            let O_color = "#eeeeee";
            let L_color = "#ffd8b4";
            let M_color = "#ffaf56";
            let H_color = "#e85959";
            let Lcolor, Mcolor, Hcolor;
            if (pwd == null || pwd == "") {
                Lcolor = Mcolor = Hcolor = O_color;
            } else {
                let S_level = this.checkStrong(pwd);
                switch (S_level) {
                case 0:
                    Lcolor = Mcolor = Hcolor = O_color;
                    break;
                case 1:
                    Lcolor = L_color;
                    Mcolor = Hcolor = O_color;
                    break;
                case 2:
                    Lcolor = L_color;
                    Mcolor = M_color;
                    Hcolor = O_color;
                    break;
                default:
                    Lcolor = L_color;
                    Mcolor = M_color;
                    Hcolor = H_color;
                }
            }
            return {
                Lcolor,
                Mcolor,
                Hcolor
            };
        }
    }
};
</script>
<style>
ul.pass_set {
  clear: both;
  margin-top: 7px;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  width: 156px;
  overflow: hidden;
  margin-left: 0px;
  padding-left: 0px;
}

ul.pass_set li {
  float: left;
  text-align: center;
  width: 50px;
  border-right: 2px solid #fff;
  background: #ffd8b4;
  color: #fff;
  list-style-type: none;
}
</style>


