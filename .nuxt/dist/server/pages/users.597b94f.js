exports.ids=[1],exports.modules={101:function(t,e,r){"use strict";r.r(e);var o={components:{loginHead:r(65).a},data(){return{curPath:this.$route.name}},computed:{pageType(){return"users-login"===this.$route.name?1:2}}},n=r(6);var component=Object(n.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login"},[this._ssrNode('<div class="login-shadow"></div> '),e("loginHead",{attrs:{"page-type":this.pageType}}),this._ssrNode(" "),e("nuxt-child")],2)}),[],!1,(function(t){var e=r(79);e.__inject__&&e.__inject__(t)}),null,"d33d41e0");e.default=component.exports},56:function(t,e,r){var content=r(59);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=r(4).default;t.exports.__inject__=function(t){o("6e81361b",content,!0,t)}},58:function(t,e,r){"use strict";r.r(e);var o=r(56);for(var n in o)["default"].indexOf(n)<0&&function(t){r.d(e,t,(function(){return o[t]}))}(n)},59:function(t,e,r){(e=r(3)(!1)).push([t.i,'.login-top[data-v-032a5b5e]{position:fixed;top:0;z-index:2;width:100%;height:60px;color:#fff;background-color:rgba(6,16,36,0.6)}.login-wapper[data-v-032a5b5e]{float:left;width:200px;height:60px;margin-left:15px}.login-wapper .company-title[data-v-032a5b5e]{position:relative;float:left;margin-top:19px}.logo-wapper[data-v-032a5b5e]{float:left;width:200px;height:60px;margin-left:15px;font-size:20px;line-height:60px}.reg-wapper ul[data-v-032a5b5e]{height:60px;margin:0;padding:23px 0;font-size:0;list-style-type:none}.reg-wapper ul .bor[data-v-032a5b5e]{position:relative}.reg-wapper ul .bor[data-v-032a5b5e]::after{position:absolute;top:2px;right:0;bottom:2px;border-right:1px solid rgba(255,255,255,0.3);content:""}.reg-wapper ul .pr[data-v-032a5b5e]{padding-right:14px}.reg-wapper ul .pl[data-v-032a5b5e]{padding-left:14px}.reg-wapper ul li[data-v-032a5b5e]{display:inline;font-size:14px}\n',""]),t.exports=e},65:function(t,e,r){"use strict";var o={props:{pageType:{type:Number,default:void 0}}},n=r(6);var component=Object(n.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"login-top"},[this._ssrNode('<div class="logo-wapper fl" data-v-032a5b5e><p class="company-title" data-v-032a5b5e>千策官网</p></div> <div class="reg-wapper fr" data-v-032a5b5e><ul data-v-032a5b5e><li class="pr bor" data-v-032a5b5e><a'+this._ssrAttr("href",1===this.pageType?"javascript:;":"/users/login")+' data-v-032a5b5e>\n                    登录\n                </a></li> <li class="pl" style="margin-right: 40px" data-v-032a5b5e><a'+this._ssrAttr("href",2===this.pageType?"javascript:;":"/users/register")+" data-v-032a5b5e>\n                    注册\n                </a></li></ul></div>")])}),[],!1,(function(t){var e=r(58);e.__inject__&&e.__inject__(t)}),"032a5b5e","c80ad1de");e.a=component.exports},68:function(t,e,r){var content=r(80);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=r(4).default;t.exports.__inject__=function(t){o("43861be7",content,!0,t)}},79:function(t,e,r){"use strict";r.r(e);var o=r(68);for(var n in o)["default"].indexOf(n)<0&&function(t){r.d(e,t,(function(){return o[t]}))}(n)},80:function(t,e,r){(e=r(3)(!1)).push([t.i,'.login{display:flex;align-items:center;height:100%;min-height:610px;background-color:#000;background-image:url("/login.jpg");background-size:cover}.login-shadow{position:fixed;top:0;right:0;bottom:50px;left:0;background-color:rgba(0,0,0,0.15)}\n',""]),t.exports=e}};