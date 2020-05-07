import Vue from 'vue';
import App from '@/App.vue';
import "resetcss.css";
import Elementui from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Elementui);
new Vue({
    render: h => h(App),
    el: "#app"
})