<template>
  <div id="app">
      <router-view></router-view>
    <!--<Test></Test>-->
    <!--<PixiStage></PixiStage>-->
    <!--<index v-if="this.$store.getters.getIsLoaded"></index>-->
    <!--<loading v-if="!this.$store.getters.getIsLoaded"></loading>-->
    <!--<music-bg></music-bg>-->
  </div>
</template>
<script>
import Index from './components/Index/Index.vue'
import MusicBg from './common/MusicBg/MusicBg.vue'
import Loading from './common/Loading/Loading.vue'
export default {
    name: 'app',
    components: {
        Index,
        MusicBg,
        Loading
    },
    mounted(){

    },
    methods:{
        touchMove(e){
            if(!this.$store.getters.getCanScroll){
                e.preventDefault()
            }
        },
    }
}
</script>

<style lang="scss">

html,body{padding: 0;margin: 0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%!important;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
