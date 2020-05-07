/**
 * created by xiehaowen 2020/04/20
 * 背景：ios端新版本的微信中，若使用vue-router push()( 任何会产生浏览历史记录的方法 )进行跳转时，会出现底部导航
 *       使用replace方式(任何不产生浏览历史记录的方法)进行跳转可以解决这个问题。
 *       但是会产生新的问题：vue-router无法记录历史路由。
 */

import Store from '../store/store';
import Router from './router';

class VueRouterHistory{
    constructor(){
        this.history = [];
    }

    /**
     * 初始化打开应用时候的第一个路由
     */
    init(){
        let current = Router.history.current;
        this.history.push(current)
    }

    /**
     * 跳转路由，并产生一条新的历史记录
     * @param url 跳转的路由信息，与vue-router的跳转一致
     */
    push(url){
        Router.replace(url);
        let current = Router.history.current;
        this.history.push(current);
    }

    /**
     * 跳转路由，不产生新的历史记录
     * @param url 跳转的路由信息，与vue-router的跳转一致
     */
    replace(url){
        Router.replace(url);
        let current = Router.history.current;
        this.history.pop();
        this.history.push(current);
    }

    /**
     * 路由回退
     * @param url 传入url解决部分有返回按钮，但是没有历史记录时的问题，强制跳转url
     */
    goBack(url){
        if(this.history.length==1){
            if(url){
                this.replace(url);
            }
            return;
        }
        this.history.pop();
        let pre = this.history[this.history.length-1];
        Router.replace(pre);
    }
}

export default new VueRouterHistory();