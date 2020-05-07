<template>
  <!--<div id="loading" v-if="isShow" @touchmove.prevent>-->
  <div id="loading" @touchmove.prevent>
    <div class="loading-icon"></div>
    <div class="progress-parent">
      <div class="progress" :style="'width:'+progress+'%'"></div>
    </div>
    <div class="progress-text">{{progress}}%</div>
  </div>
</template>
<script>
  export default {
    props:{
      imgList:{
        type: Array,
        default: function () {
          return []
        }
      },audioList:{
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data(){
      return {
        // isShow:!this.$store.getters.getIsLoaded,
        interProgress:0,
        imgProgress:0,
        audioProgress:0,
        maxInterProgress:0,
        progress:0,
        inter:''
      }
    },
    mounted:function () {
      this.init()
    },
    methods:{
      init(){
        let that = this
        that.maxInterProgress = 100-that.imgList.length-that.audioList.length
        that.loadImg() //加载图片
        that.loadAudio()//加载音频
        that.isFinish()//判断是否加载完成
      },
      isWeiXin:function () {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
          return true;
        } else {
          return false;
        }
      },
      loadImg:function () {
        let that = this
        that.imgList.map(function (item) {
          let img = new Image()
          img.onload = function () {
            that.imgProgress++
          }
          img.onerror = (e)=>{
              window.console.error("图片资源加载失败：",e.target.src);
          }
          img.src = item
        })
      },
      loadAudio:function () {
        let that = this
        let is_weixin = that .isWeiXin() //判断是否是在微信浏览器打开
        if(is_weixin){
          document.addEventListener("WeixinJSBridgeReady", function () {
            that.$emit('playBgMusic')
            that.audioList.map(function (item) {
              let audio = new Audio()
              audio.oncanplay = function () {
                that.audioProgress++
              }
              audio.onerror = (e)=>{
                  window.console.error("音频资源加载失败:",e.target.src);
              }
              audio.src = item
              audio.load()
            })
          }, false);
        }else {
          that.audioList.map(function (item) {
            let audio = new Audio()
            audio.oncanplay = function () {
              that.audioProgress++
            }
              audio.onerror = (e)=>{
                  window.console.error("音频资源加载失败:",e.target.src);
              }
            audio.src = item
            audio.load()
          })
        }
      },
      isFinish:function () {
        let that = this
        if(that.inter){
          clearInterval(that.inter)
        }
        that.inter=setInterval(function () {
          if(that.interProgress<that.maxInterProgress){
            that.interProgress++
          }
          that.progress = that.interProgress+that.imgProgress+that.audioProgress

          // if(that.progress<100 && that.interProgress+that.imgProgress+that.audioProgress<=100){
          //     that.progress++;
          // }

          if(that.progress>=100){
            // that.isShow = false
            // that.$emit('Finish')
            // clearInterval(that.inter)


            // if(that.$route.path !== "/" && that.$route.path !== "/index"){
            //     that.$router.replace('/');
            // }

            // that.$store.commit("setIsLoaded");
            clearInterval(that.inter)
          }
        },15)
      }
    }
  }
</script>
<style>
  #loading{
    width: 100vw;
    height: 100vh;
    background: #f8c564;
    z-index: 10000000000;
    position: absolute;
    top: 0;
    left: 0;
  }
  .loading-icon{
    width: 60vw;
    height: 30vw;
    background: url("./img/loading_icon.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 50%;
    margin-top:-15vw;
    left: 20vw;
    transform-origin: 12.5vw 15vw;
    animation: fly 0.5s infinite ease-out;
  }
  @keyframes fly {
    0%{transform: translateY(0%);}
    50%{transform: translateY(10%);}
    100%{transform: translateY(0%);}
  }
  @keyframes loadingAnim {
    0%{transform: rotate(0deg)}
    40%{transform: rotate(-90deg)}
    60%{transform: rotate(-90deg)}
    100%{transform: rotate(0deg)}
  }
  .text{
    width: 100vw;
    position: absolute;
    top: 42%;
    margin-top:15vw;
    left: 0vw;
    color: #be9172;
    font-family: 微软雅黑;
    text-align: center;
  }
  .progress-parent{
    width: 40%;
    height: 10px;
    position: absolute;
    border: #1d2088 1px solid;
    bottom: 40%;
    left: 30%;
    border-radius: 5px;
    overflow: hidden;
  }
  .progress{
    width: 10%;
    height: 100%;
    background-color: #08c1e9;
  }
  .progress-text{
    width: 100%;
    text-align: center;
    color: #ffffff;
    position: absolute;
    bottom: 35%;
    left: 0%;
  }
</style>
