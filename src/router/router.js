import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Index from '../components/Index/Index.vue';
import Game from '../components/Game/Game';

const routes = [
    { path:'/', component:Index },
    { path:'/game', component:Game },
]

const router = new VueRouter({
    mode : 'hash',
    routes, // (缩写) 相当于 routes: routes
})

export default router;