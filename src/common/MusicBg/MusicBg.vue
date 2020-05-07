<template>
    <div ref="test" class="footerMusic" @click="toggleUserForbid();setIsPlay();">
        <span class="musicIcon run" v-if="isPlay"></span>
        <span class="musicIcon stop" v-if="!isPlay"></span>
    </div>
</template>
<style>
    .footerMusic {
        margin-top: 0%;
        position: fixed;
        height: 5%;
        right: 3%;
        bottom: 2%;
        z-index: 999;
    }
    .footerMusic .run{
        width: 28px;
        height: 28px;
        border-radius: 14px;
        position: absolute;
        right: 6px;
        bottom: 2px;
        background: url("./img/music-running.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        animation: musicRun 2s linear infinite;
        -webkit-animation: musicRun 2s linear infinite;

    }
    .footerMusic .stop{
        width: 28px;
        height: 28px;
        border-radius: 14px;
        position: absolute;
        right: 6px;
        bottom: 2px;
        background: url("./img/music-stop.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;

    }
    @keyframes musicRun {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>
<script>
    import audioSrc from './audio/music_bg.mp3';
    export default {
        data(){
            return {
                isPlay: false,
                audio:'',
                userForbidPlay:false,
            }
        },
        mounted(){
            this.stopMusicWhenHidden();
            if(this.isWeiXin()){
                document.addEventListener("WeixinJSBridgeReady",() => {
                    this.audio = new Audio()
                    // this.audio.loop = true
                    this.audio.oncanplay = ()=>{
                        this.setIsPlay()
                    }
                    this.audio.onended = ()=>{
                        this.setIsPlay();
                        this.audio.currentTime = 0;
                        // this.setIsPlay();
                    }
                    this.audio.onplaying = ()=>{
                        this.isPlay = true;
                    }
                    this.audio.onpause = ()=>{
                        this.isPlay = false;
                    }
                    this.audio.src = audioSrc
                    this.audio.load()
                })
            }else {
                this.audio = new Audio()
                this.audio.oncanplay = ()=>{
                    this.setIsPlay()
                }
                this.audio.onended = ()=>{
                    this.setIsPlay();
                    this.audio.currentTime = 0;
                    this.setIsPlay();
                }
                this.audio.onplaying = ()=>{
                    this.isPlay = true;
                }
                this.audio.onpause = ()=>{
                    this.isPlay = false;
                }
                this.audio.src = audioSrc
                this.audio.load()
            }
        },
        methods:{
            stopMusicWhenHidden(){
                document.addEventListener("visibilitychange",()=>{
                    if(document.hidden){
                        // 暂停背景音乐的播放
                        this.stop();
                    }else{
                        // 根据隐藏时的音乐播放状态决定是否重新播放背景音乐
                        this.fallBackPlay();
                    }
                });
            },
            // 设置禁用背景音乐，设置之后调用play()方法背景音乐不再自动播放
            toggleUserForbid(){
                this.userForbidPlay = !this.userForbidPlay;
            },
            // 停止背景音乐播放
            stop(){
                if(!this.isPlay){
                    return;
                }
                this.isPlay = false;
                this.audio.pause();
            },
            // 背景音乐回退播放，如果是用户点击关闭了背景音乐，则背景不会播放
            fallBackPlay(){
                if(this.isPlay){
                    return;
                }
                if(this.userForbidPlay){
                    return;
                }
                this.isPlay = true;
                this.audio.play();
            },
            setIsPlay:function () {
                // this.isPlay = !this.isPlay
                if(this.isPlay){
                    this.audio.pause()
                }else {
                    this.audio.play()
                }
            },
            isWeiXin(){
                //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
                var ua = window.navigator.userAgent.toLowerCase();
                //通过正则表达式匹配ua中是否含有MicroMessenger字符串
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
</script>