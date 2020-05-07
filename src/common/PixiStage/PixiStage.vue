/*
* @Author: xhw
* @create: 2019-6-21
* @Description:
*/
<template>
    <div>
        <div class="PixiStage" ref="PixiStage"></div>
    </div>
</template>
<script>
import PixiStage from "./js/PixiStage";
export default{
    data:function(){
        return {
            PixiStage:{}
        }
    },
    mounted() {
        this.PixiStage = new PixiStage(this,this.$refs["PixiStage"]);
    },
    methods:{

    }
}
</script>
<style>
    .PixiStage canvas{
        display:block;
        height:100vh;
        width:100vw;
    }
</style>